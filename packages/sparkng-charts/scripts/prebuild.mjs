import fs from 'fs-extra';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { codemodDeclareFields } from './codemod-declare-fields.mjs';

const require = createRequire(import.meta.url);

// The root workspace package.json is the single version bump point; keep this
// package in sync with it before every build.
const rootPackagePath = fileURLToPath(new URL('../../../package.json', import.meta.url));
const localPackagePath = fileURLToPath(new URL('../package.json', import.meta.url));
const { version } = fs.readJsonSync(rootPackagePath);
const pkg = fs.readJsonSync(localPackagePath);
pkg.version = version;
fs.writeFileSync(localPackagePath, JSON.stringify(pkg, null, 4) + '\n', { encoding: 'utf-8' });

// The engine source imports zrender through its TypeScript source tree
// ('zrender/src/...'), but the published zrender package only exposes the
// precompiled './lib/*' and '.' entries in its exports map. Bundling would
// then mix the compiled and source trees into two incompatible copies of the
// rendering core. Unify every zrender resolution on the source tree.
const zrenderPackagePath = require.resolve('zrender/package.json');
const zrenderPackage = fs.readJsonSync(zrenderPackagePath);
const exportsMap = zrenderPackage.exports || {};
let patched = false;

if (exportsMap['.']?.import !== './src/all.ts') {
    exportsMap['.'] = {
        types: './index.d.ts',
        import: './src/all.ts',
        require: './dist/zrender.js'
    };
    patched = true;
}
if (exportsMap['./src/*'] !== './src/*') {
    exportsMap['./src/*'] = './src/*';
    patched = true;
}
if (patched) {
    zrenderPackage.exports = exportsMap;
    fs.writeJsonSync(zrenderPackagePath, zrenderPackage, { spaces: 2 });
    console.log(`patched zrender exports map at ${path.dirname(zrenderPackagePath)}`);
}

// Neutralize `useDefineForClassFields` semantics in both the engine source
// and the zrender source tree (see codemod script for the rationale).
const packageRoot = fileURLToPath(new URL('..', import.meta.url));
const engineChanged = codemodDeclareFields(path.join(packageRoot, 'src'));
const zrenderChanged = codemodDeclareFields(path.join(path.dirname(zrenderPackagePath), 'src'));
console.log(`declare codemod: ${engineChanged} engine files, ${zrenderChanged} zrender files`);
