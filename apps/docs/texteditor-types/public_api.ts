export * from './texteditor.types';

/**
 * Runtime marker guaranteeing this entry emits a non-empty ES module.
 * Bundlers cannot classify empty type-only modules, which breaks
 * dev-server dependency interop (vite marks them CommonJS).
 */
export const TYPES_ENTRY_RUNTIME_MARKER = true;
