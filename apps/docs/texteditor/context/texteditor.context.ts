/**
 * @file
 * Context tokens exposed by the TextEditor compound parts.
 */

import { InjectionToken } from '@angular/core';
import type {
    BlockControlsContextValue,
    BlockMenuContextValue,
    ContextToolbarContextValue,
    MentionMenuContextValue,
    NavigatorContextValue,
    SlashMenuContextValue,
    TableColumnMenuContextValue,
    TableRowMenuContextValue,
    TableControlsContextValue,
    TableCellMenuContextValue,
    TextEditorTableCellCommands,
    TextEditorTableColumnCommands,
    TextEditorTableRowCommands,
    TextEditorBlockMenuCommands,
    TextEditorSlashMenuCommands,
    TextEditorMentionCommands,
    TableActiveState,
    TableOverlayRect,
    TextEditorCommands,
    TextEditorContextValue,
    TextEditorHeadingEntry,
    TextEditorRejectReason,
    TextEditorUploadHandler,
    UploadSlotEntry,
    UploadContextValue
} from '@bdspark/sparkng/types/texteditor';

/**
 * Internal API parts use to register themselves and reach command factories.
 * Not part of the public documentation surface; carried on the same token as
 * the public context for parts shipped with the library.
 * @group Interfaces
 */
export interface TextEditorInternalApi {
    /**
     * Registers the presence of a mounted part; enables the matching runtime feature.
     */
    registerPart(name: string): void;
    /**
     * Root-relative caret position for the pending context toolbar request, or null.
     */
    contextToolbarRequest: () => CaretRect | null;
    /**
     * Dismisses a pending context toolbar request.
     */
    dismissContextToolbar(): void;
    /**
     * Whether the context toolbar overflow panel is open.
     */
    contextToolbarMoreActive: () => boolean;
    /**
     * Toggles the context toolbar overflow panel.
     */
    toggleContextToolbarMore(event?: Event): void;
    /**
     * Root-relative state of the open slash menu, or null.
     */
    slashMenuRequest: () => TypeaheadRect | null;
    /**
     * Dismisses the slash menu (removing nothing from the document).
     */
    dismissSlashMenu(): void;
    /**
     * Slash menu commands; each command removes the `/query` trigger first.
     */
    slashCommands(): TextEditorSlashMenuCommands;
    /**
     * Root-relative state of the open mention menu, or null.
     */
    mentionRequest: () => (TypeaheadRect & { items: unknown[] }) | null;
    /**
     * Dismisses the mention menu.
     */
    dismissMentionMenu(): void;
    /**
     * Mention commands including `select(item)`.
     */
    mentionCommands(): TextEditorMentionCommands;
    /**
     * Registers mention configuration provided by the mention menu part; takes
     * precedence over the root inputs.
     */
    registerMentionConfig(config: { handler?: ((query: string) => unknown[] | Promise<unknown[]>) | null; filterField?: string | null; template?: ((data: any) => string) | null }): void;
    /**
     * Registers keyboard handling for the active type-ahead surface (slash/mention menus).
     */
    registerTypeahead(controller: { onArrow(dir: 1 | -1): boolean; onEnter(): boolean; onEscape(): boolean }): void;
    /**
     * Registers upload configuration provided by an upload part.
     */
    registerUploadConfig(kind: 'image' | 'document', config: { handler?: TextEditorUploadHandler; maxFileCount?: number | null; maxFileSize?: number | null; allowedTypes?: string }): void;
    /**
     * Live upload entries per kind, for the upload parts to render.
     */
    uploadEntries: (kind: 'image' | 'document') => UploadSlotEntry[];
    /**
     * Opens the file picker of the mounted upload part.
     */
    openUploadPicker(kind: 'image' | 'document'): void;
    /**
     * Validates and starts uploads for the given files.
     */
    startUploads(kind: 'image' | 'document', files: File[]): void;
    /**
     * Cancels in-progress uploads of the given kind.
     */
    dismissUpload(kind: 'image' | 'document'): void;
    /**
     * Root-relative geometry of the active table, or null.
     */
    tableOverlayRect: () => TableOverlayRect | null;
    /**
     * Active table state, or null when the cursor is outside any table.
     */
    tableActiveState: () => TableActiveState | null;
    /**
     * Opens the table column menu for `colIndex`.
     */
    requestTableColumnMenu(colIndex: number): void;
    /**
     * Root-relative anchor for the open table column menu, or null.
     */
    tableColumnMenuRequest: () => { colIndex: number; top: number; left: number } | null;
    /**
     * Opens the table row menu for `rowIndex`.
     */
    requestTableRowMenu(rowIndex: number): void;
    /**
     * Root-relative anchor for the open table row menu, or null.
     */
    tableRowMenuRequest: () => { rowIndex: number; top: number; left: number } | null;
    /**
     * Opens the table cell menu.
     */
    requestTableCellMenu(): void;
    /**
     * Root-relative anchor for the open table cell menu, or null.
     */
    tableCellMenuRequest: () => { top: number; left: number } | null;
    /**
     * Dismisses every open table menu.
     */
    dismissTableMenus(except?: 'column' | 'row' | 'cell'): void;
    /**
     * Column menu commands bound to the open column index.
     */
    tableColumnCommands(colIndex: number): TextEditorTableColumnCommands;
    /**
     * Row menu commands bound to the open row index.
     */
    tableRowCommands(rowIndex: number): TextEditorTableRowCommands;
    /**
     * Cell menu commands for the current selection.
     */
    tableCellCommands(): TextEditorTableCellCommands;
    /**
     * Adds a row/column to the active table (floating controls).
     */
    addTableRows(count: number, position: 'start' | 'end' | 'near'): void;
    addTableColumns(count: number, position: 'start' | 'end' | 'near'): void;
    /**
     * Hovered block in block mode, or null.
     */
    blockHover: () => { element: HTMLElement | null; index: number } | null;
    /**
     * Inserts an empty block after `index` (block mode).
     */
    addBlockAfter(index: number): void;
    /**
     * Moves a block (block mode).
     */
    moveBlock(from: number, to: number): void;
    /**
     * Starts a block drag (block mode).
     */
    startBlockDrag(index: number, event: DragEvent): void;
    /**
     * Ends a block drag (block mode).
     */
    endBlockDrag(): void;
    /**
     * Block drag hover index for the drop indicator, or null.
     */
    blockDropIndex: () => number | null;
    /**
     * Handles a drop on the editor body (block mode and file drops).
     */
    onBodyDrop(event: DragEvent): void;
    /**
     * Opens the block menu for `index` (block mode).
     */
    requestBlockMenu(index: number, anchor: { top: number; left: number }): void;
    /**
     * Root-relative anchor for the open block menu, or null.
     */
    blockMenuRequest: () => { index: number; top: number; left: number } | null;
    /**
     * Dismisses the block menu.
     */
    dismissBlockMenu(): void;
    /**
     * Block menu commands bound to the open block index.
     */
    blockCommands(index: number): TextEditorBlockMenuCommands;
    /**
     * Whether the editor runs in block mode.
     */
    isBlockMode: () => boolean;
    /**
     * Block type name of the top-level block at `index`, e.g. `'paragraph'`.
     */
    getBlockType(index: number): string;
    /**
     * The root host element; used by parts to convert viewport coordinates.
     */
    rootElement(): HTMLElement;
    /**
     * Whether more than one table cell is selected.
     */
    getIsMultiCellSelected(): boolean;
    /**
     * Whether the active cell is a merged cell.
     */
    getIsCellMerged(): boolean;
    /**
     * Scrolls the document so the position is in view (navigator).
     */
    scrollToPos(pos: number): void;
    /**
     * The element the editor is mounted into (ProseMirror root DOM).
     */
    getEditorElement(): HTMLElement | null;
    /**
     * Headings extracted from the document.
     */
    headingsSignal: () => TextEditorHeadingEntry[];
    /**
     * Emits a file rejection produced by upload validation.
     */
    emitUploadReject(kind: 'image' | 'document', files: File[], reason: TextEditorRejectReason): void;
    /**
     * Runs an arbitrary ProseMirror command against the live view.
     */
    runCommand(command: (state: any, dispatch?: any, view?: any) => boolean): boolean;
    /**
     * Index of the heading currently in view (navigator).
     */
    navigatorActiveIndex(): number;
    /**
     * Whether the navigator popover menu is open.
     */
    navigatorMenuOpen(): boolean;
    /**
     * Opens or closes the navigator popover menu.
     */
    navigatorSetMenuOpen(open: boolean): void;
    /**
     * Registers a part-level reject forwarder for upload validation results.
     */
    registerUploadRejectHandler(kind: 'image' | 'document', handler: (event: { files: File[]; reason: TextEditorRejectReason }) => void): void;
}

/**
 * Root-relative caret rectangle.
 */
export interface CaretRect {
    top: number;
    left: number;
    bottom: number;
}

/**
 * Root-relative type-ahead anchor rectangle.
 */
export interface TypeaheadRect {
    top: number;
    left: number;
    bottom: number;
    text?: string;
}

/**
 * Full context type carried by {@link TEXTEDITOR_CONTEXT}.
 * @group Interfaces
 */
export type TextEditorRootContext = TextEditorContextValue & TextEditorInternalApi & TextEditorCommandsCarrier;

/**
 * Commands accessor on the root context.
 */
export interface TextEditorCommandsCarrier {
    /**
     * Imperative commands, or null before the editor is created.
     */
    commands: () => TextEditorCommands | null;
}

/**
 * Root context provided by `p-texteditor-root`; projected widgets inject it to reach
 * commands, state, plugin commands and value serializers. Every field is a signal.
 * @group Tokens
 */
export const TEXTEDITOR_CONTEXT = new InjectionToken<TextEditorRootContext>('TEXTEDITOR_CONTEXT');

/**
 * Context provided by `p-texteditor-context-toolbar`.
 * @group Tokens
 */
export const CONTEXTTOOLBAR_CONTEXT = new InjectionToken<ContextToolbarContextValue>('CONTEXTTOOLBAR_CONTEXT');

/**
 * Context provided by `p-texteditor-block-controls`.
 * @group Tokens
 */
export const BLOCKCONTROLS_CONTEXT = new InjectionToken<BlockControlsContextValue>('BLOCKCONTROLS_CONTEXT');

/**
 * Context provided by `p-texteditor-block-menu`.
 * @group Tokens
 */
export const BLOCKMENU_CONTEXT = new InjectionToken<BlockMenuContextValue>('BLOCKMENU_CONTEXT');

/**
 * Context provided by `p-texteditor-slash-menu`.
 * @group Tokens
 */
export const SLASHMENU_CONTEXT = new InjectionToken<SlashMenuContextValue>('SLASHMENU_CONTEXT');

/**
 * Context provided by `p-texteditor-mention-menu`. Generic over the suggestion item type.
 * @group Tokens
 */
export const MENTIONMENU_CONTEXT = new InjectionToken<MentionMenuContextValue<any>>('MENTIONMENU_CONTEXT');

/**
 * Context provided by the upload parts.
 * @group Tokens
 */
export const UPLOAD_CONTEXT = new InjectionToken<UploadContextValue>('UPLOAD_CONTEXT');

/**
 * Context provided by `p-texteditor-table-controls`.
 * @group Tokens
 */
export const TABLECONTROLS_CONTEXT = new InjectionToken<TableControlsContextValue>('TABLECONTROLS_CONTEXT');

/**
 * Context provided by `p-texteditor-table-column-menu`.
 * @group Tokens
 */
export const TABLECOLUMNMENU_CONTEXT = new InjectionToken<TableColumnMenuContextValue>('TABLECOLUMNMENU_CONTEXT');

/**
 * Context provided by `p-texteditor-table-row-menu`.
 * @group Tokens
 */
export const TABLEROWMENU_CONTEXT = new InjectionToken<TableRowMenuContextValue>('TABLEROWMENU_CONTEXT');

/**
 * Context provided by `p-texteditor-table-cell-menu`.
 * @group Tokens
 */
export const TABLECELLMENU_CONTEXT = new InjectionToken<TableCellMenuContextValue>('TABLECELLMENU_CONTEXT');

/**
 * Context provided by the navigator parts.
 * @group Tokens
 */
export const NAVIGATOR_CONTEXT = new InjectionToken<NavigatorContextValue>('NAVIGATOR_CONTEXT');
