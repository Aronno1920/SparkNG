import fs from 'fs-extra';
import path from 'node:path';
import ts from 'typescript';

/**
 * Adds the `declare` modifier to class property declarations that have no
 * initializer. Without it, bundlers using `useDefineForClassFields` semantics
 * emit `defineProperty(this, 'prop', undefined)` AFTER super(), which wipes
 * the values the base constructors assign (e.g. zrender's Element/Path
 * `style` handling) and breaks the engine at runtime. With `declare`, the
 * declaration is type-only and emits nothing - matching the semantics the
 * engine sources are written for. Idempotent.
 */
export function codemodDeclareFields(directory) {
    let changedFiles = 0;

    const visit = (node, sourceFile, edits) => {
        if ((ts.isClassDeclaration(node) || ts.isClassExpression(node)) && node.name) {
            for (const member of node.members) {
                if (ts.isPropertyDeclaration(member) && member.initializer === undefined && !memberModifiersHasDeclare(member) && member.name.getText(sourceFile) !== 'constructor') {
                    edits.push(member.getStart(sourceFile));
                }
            }
        }
        ts.forEachChild(node, (child) => visit(child, sourceFile, edits));
    };

    const memberModifiersHasDeclare = (member) => {
        return !!member.modifiers?.some((m) => m.kind === ts.SyntaxKind.DeclareKeyword);
    };

    const processFile = (filePath) => {
        const source = fs.readFileSync(filePath, { encoding: 'utf-8' });
        const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true);
        const edits = [];
        visit(sourceFile, sourceFile, edits);
        if (!edits.length) return;
        // apply edits from the end so offsets stay valid
        edits.sort((a, b) => b - a);
        let output = source;
        for (const offset of edits) {
            output = output.slice(0, offset) + 'declare ' + output.slice(offset);
        }
        fs.writeFileSync(filePath, output, { encoding: 'utf-8' });
        changedFiles++;
    };

    const walk = (dir) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) walk(full);
            else if (entry.name.endsWith('.ts')) processFile(full);
        }
    };

    walk(directory);
    return changedFiles;
}
