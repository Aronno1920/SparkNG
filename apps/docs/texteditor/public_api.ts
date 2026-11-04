/**
 * @file
 * Public API Surface of @bdspark/sparkng/texteditor
 */

// Types & Models
export * from '@bdspark/sparkng/types/texteditor';

// Context Tokens & Internal Part API Types
export * from './context/texteditor.context';

// Engine helpers (schema sanitization utilities reused by plugins)
export { safeUrl, sanitizeStyle, parseInertHtml, buildTextEditorSchema } from './engine/texteditor-schema';

// Components & Compound Architecture
export * from './components/texteditor-root';
export * from './components/texteditor-content';
export * from './components/texteditor-toolbar';
export * from './components/texteditor-menus';
export * from './components/texteditor-block';
export * from './components/texteditor-tables';
export * from './components/texteditor-uploads';
export * from './components/texteditor-navigator';

// Plugin System
export * from './plugins/texteditor-plugin';

// Style
export * from './style/texteditorstyle';

// Modules
export * from './modules/texteditor.module';
