const fs = require('fs');

function patch(path, replacements) {
    let s = fs.readFileSync(path, 'utf8');
    for (const [from, to] of replacements) {
        if (!s.includes(from)) {
            console.error(`ANCHOR NOT FOUND in ${path}:\n${from.slice(0, 120)}`);
            process.exit(1);
        }
        s = s.split(from).join(to);
    }
    fs.writeFileSync(path, s);
    console.log(`patched ${path}`);
}

/* ---------------- menus.ts ---------------- */
patch('components/texteditor-menus.ts', [
    [
        'this.editor.registerTypeahead({ onArrow: (dir) => this.moveFocus(dir), onEnter: () => this.selectFocused(), onEscape: () => this.dismiss() });',
        'this.editor.registerTypeahead({ onArrow: (dir) => this.moveFocus(dir), onEnter: () => this.selectFocused(), onEscape: () => { this.dismiss(); return true; } });'
    ],
    ['readonly request = computed(() => this.editor.mentionMenuRequest());', 'readonly request = computed(() => this.editor.mentionRequest());']
]);

/* ---------------- root.ts ---------------- */
patch('components/texteditor-root.ts', [
    ['this.onNavigatorHeadingsChange.emit(entries);', 'this.navigatorHeadingsChange.emit(entries);'],
    ['this.onBlockHoverChange.emit({ element: null, index: -1 });', 'this.blockHoverChange.emit({ element: null, index: -1 });'],
    ['this.onBlockHoverChange.emit({ element, index });', 'this.blockHoverChange.emit({ element, index });'],
    [
        '        const tableDom = view.nodeDOM(table.pos) as HTMLElement | null;\n        if (!tableDom) return null;\n        const rowEl = tableDom.rows[Math.min(row, tableDom.rows.length - 1)];',
        '        const tableDom = view.nodeDOM(table.pos) as HTMLTableElement | null;\n        if (!tableDom) return null;\n        const rowEl = tableDom.rows[Math.min(row, tableDom.rows.length - 1)];'
    ],
    ['map.position(', 'map.positionAt(']
]);

/* ---------------- commands.ts ---------------- */
patch('engine/texteditor-commands.ts', [
    ['    const { empty, $from, to, from, storedMarks } = state.selection;', '    const sel: any = state.selection;\n    const { empty, $from, to, from, storedMarks } = sel;'],
    [
        '    const { $from, from, to } = state.selection;\n    const block = $from.parent;\n    if (!block.type.attrs.align) return false;',
        "    const { $from, from, to } = state.selection;\n    const block = $from.parent;\n    if (!('align' in (block.type.spec.attrs ?? {}))) return false;"
    ],
    [
        "            if (node.isBlock && node.type.attrs.align && (node.type === block.type || node.type.name === 'paragraph' || node.type.name === 'heading')) {",
        "            if (node.isBlock && 'align' in (node.type.spec.attrs ?? {}) && (node.type === block.type || node.type.name === 'paragraph' || node.type.name === 'heading')) {"
    ],
    ['    const tableRows = [];', '    const tableRows: any[] = [];'],
    ['        const cells = [];', '        const cells: any[] = [];']
]);

/* ---------------- format-state.ts ---------------- */
patch('engine/texteditor-format-state.ts', [
    ['    if (parent.type.attrs.align) {', "    if ('align' in (parent.type.spec.attrs ?? {})) {"],
    ['                if (node.isBlock && node.type.attrs.align && node.attrs.align !== align) mixed = true;', "                if (node.isBlock && 'align' in (node.type.spec.attrs ?? {}) && node.attrs.align !== align) mixed = true;"]
]);

/* ---------------- plugins.ts ---------------- */
patch('engine/texteditor-plugins.ts', [
    ["import { goToNextCell, goToPreviousCell } from 'prosemirror-tables';", "import { goToNextCell } from 'prosemirror-tables';"],
    [
        "        Tab: chainCommands(goToNextCell, sinkListItem(nodes.list_item), sinkListItem(nodes.check_item)),\n        'Shift-Tab': chainCommands(goToPreviousCell, liftListItem(nodes.list_item), liftListItem(nodes.check_item))",
        "        Tab: chainCommands(() => goToNextCell(1), sinkListItem(nodes.list_item), sinkListItem(nodes.check_item)),\n        'Shift-Tab': chainCommands(liftListItem(nodes.list_item), liftListItem(nodes.check_item))"
    ]
]);

/* ---------------- serializers.ts ---------------- */
patch('engine/texteditor-serializers.ts', [
    [
        "function blockToMarkdown(node: PMNode, indent = ''): string {",
        "function childrenOf(node: PMNode): PMNode[] {\n    const children: PMNode[] = [];\n    node.content.forEach((child) => children.push(child));\n    return children;\n}\n\nfunction blockToMarkdown(node: PMNode, indent = ''): string {"
    ],
    [
        "            return node.content\n                .toArray()\n                .map((child) => `${indent}> ${blockToMarkdown(child, indent)}`)\n                .join('\\n');",
        "            return childrenOf(node)\n                .map((child) => `${indent}> ${blockToMarkdown(child, indent)}`)\n                .join('\\n');"
    ],
    [
        "                const content = item.content\n                    .toArray()\n                    .map((child) => blockToMarkdown(child, `${indent}  `))\n                    .join('\\n');",
        "                const content = childrenOf(item)\n                    .map((child) => blockToMarkdown(child, `${indent}  `))\n                    .join('\\n');"
    ]
]);

/* ---------------- schema.ts (serializeNode returns DOMNode; wrap to string) ---------------- */
patch('engine/texteditor-schema.ts', [
    [
        'export function docToHtml(schema: Schema, doc: PMNode): string {\n    return DOMSerializer.fromSchema(schema).serializeNode(doc);\n}',
        "export function docToHtml(schema: Schema, doc: PMNode): string {\n    const node = DOMSerializer.fromSchema(schema).serializeNode(doc);\n    return node.nodeType === 1 ? (node as HTMLElement).outerHTML : node.textContent ?? ''; \n}"
    ],
    ['                const cells = [];', '                const cells: any[] = [];']
]);

console.log('all patched');
