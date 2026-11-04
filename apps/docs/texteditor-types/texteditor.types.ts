import { TemplateRef } from '@angular/core';

/**
 * Editing mode of the TextEditor.
 * - `classic`: a toolbar editor whose value is a single HTML string.
 * - `block`: a Notion-like block editor whose value is an array of block HTML strings.
 * @group Types
 */
export type TextEditorMode = 'classic' | 'block';

/**
 * Caret coordinates (viewport-relative) used to anchor floating surfaces such as the context toolbar.
 * @group Interfaces
 */
export interface CaretPosition {
    /**
     * Top coordinate in pixels.
     */
    top: number;
    /**
     * Left coordinate in pixels.
     */
    left: number;
    /**
     * Bottom coordinate in pixels.
     */
    bottom: number;
}

/**
 * Options passed to an upload handler.
 * @group Interfaces
 */
export interface TextEditorUploadOptions {
    /**
     * Reports upload progress as a percentage between 0 and 100.
     */
    onProgress: (percent: number) => void;
    /**
     * Aborted when the upload is cancelled or dismissed; forward it to fetch/XMLHttpRequest.
     */
    signal: AbortSignal;
}

/**
 * Upload transport contract. Resolves with the uploaded asset URL.
 * Declared as a callable interface so tools can reflect its signature.
 * @group Interfaces
 */
export interface TextEditorUploadHandler {
    (file: File, options: TextEditorUploadOptions): Promise<string>;
}

/**
 * Reason a file was rejected by upload validation.
 * @group Types
 */
export type TextEditorRejectReason = 'max-file-count' | 'max-file-size' | 'file-type';

/**
 * Payload emitted when files fail upload validation.
 * @group Interfaces
 */
export interface TextEditorFileRejectEvent {
    /**
     * The rejected files.
     */
    files: File[];
    /**
     * Why the files were rejected.
     */
    reason: TextEditorRejectReason;
}

/**
 * Payload emitted when an upload handler rejects.
 * @group Interfaces
 */
export interface TextEditorUploadErrorEvent {
    /**
     * The file being uploaded.
     */
    file: File;
    /**
     * The error thrown by the handler.
     */
    error: unknown;
}

/**
 * A single upload progress entry.
 * @group Interfaces
 */
export interface UploadSlotEntry {
    /**
     * Unique entry id.
     */
    id: string;
    /**
     * File name being uploaded.
     */
    fileName: string;
    /**
     * Progress percentage between 0 and 100.
     */
    progress: number;
}

/**
 * Named file-size constants (in bytes) used with the `maxFileSize` inputs.
 * @group Interfaces
 */
export interface TextEditorFileSize {
    /**
     * One megabyte.
     */
    ONE_MB: number;
    /**
     * Five megabytes.
     */
    FIVE_MB: number;
    /**
     * Ten megabytes.
     */
    TEN_MB: number;
    /**
     * Twenty five megabytes.
     */
    TWENTY_FIVE_MB: number;
    /**
     * Fifty megabytes.
     */
    FIFTY_MB: number;
}

/**
 * Snapshot of the active formatting at the current selection. Value inputs such as
 * `fontFamily` or `foregroundColor` report `null` when the selection mixes more than one value.
 * @group Interfaces
 */
export interface TextEditorFormatState {
    /**
     * Whether undo is available.
     */
    canUndo: boolean;
    /**
     * Whether redo is available.
     */
    canRedo: boolean;
    /**
     * Whether the current selection is non-empty.
     */
    hasSelection: boolean;
    /**
     * Active heading level, or null when the block is not a heading.
     */
    heading: number | null;
    /**
     * Whether the active block is a blockquote.
     */
    blockquote: boolean;
    /**
     * Whether the active block is a code block.
     */
    codeBlock: boolean;
    /**
     * Whether the selection is inside a bullet list.
     */
    bulletList: boolean;
    /**
     * Whether the selection is inside an ordered list.
     */
    orderedList: boolean;
    /**
     * Whether the selection is inside a checklist.
     */
    checkList: boolean;
    /**
     * Whether the bold mark is active.
     */
    bold: boolean;
    /**
     * Whether the italic mark is active.
     */
    italic: boolean;
    /**
     * Whether the underline mark is active.
     */
    underline: boolean;
    /**
     * Whether the strikethrough mark is active.
     */
    strikethrough: boolean;
    /**
     * Whether the subscript mark is active.
     */
    subscript: boolean;
    /**
     * Whether the superscript mark is active.
     */
    superscript: boolean;
    /**
     * Whether the inline code mark is active.
     */
    code: boolean;
    /**
     * Whether the selection is inside a link.
     */
    link: boolean;
    /**
     * URL of the link around the cursor, when any.
     */
    linkUrl: string | null;
    /**
     * Active text align of the block, or null when mixed.
     */
    textAlign: string | null;
    /**
     * Active font family, or null when mixed.
     */
    fontFamily: string | null;
    /**
     * Active font size, or null when mixed.
     */
    fontSize: string | null;
    /**
     * Active text color, or null when mixed.
     */
    foregroundColor: string | null;
    /**
     * Active background color, or null when mixed.
     */
    backgroundColor: string | null;
    /**
     * Whether the selection is inside a table.
     */
    inTable: boolean;
    /**
     * Whether the selection is inside a checklist item.
     */
    inCheckList: boolean;
}

/**
 * Format state exposed to toolbar slots. Identical in shape to {@link TextEditorFormatState}.
 * @group Interfaces
 */
export interface TextEditorToolbarState extends TextEditorFormatState {}

/**
 * Text alignment values accepted by `commands.textAlign`.
 * @group Types
 */
export type TextEditorTextAlign = 'left' | 'center' | 'right' | 'justify';

/**
 * Optional image attributes accepted by `commands.insertImage`.
 * @group Interfaces
 */
export interface TextEditorImageAttrs {
    /**
     * Alternative text.
     */
    alt?: string;
    /**
     * Image title.
     */
    title?: string;
    /**
     * Image width in pixels.
     */
    width?: number;
    /**
     * Image height in pixels.
     */
    height?: number;
}

/**
 * The imperative editing command surface consumed by toolbars and menus.
 * @group Interfaces
 */
export interface TextEditorCommands {
    /**
     * Toggles bold; a collapsed selection sets the typing mark.
     */
    bold(): void;
    /**
     * Toggles italic.
     */
    italic(): void;
    /**
     * Toggles underline.
     */
    underline(): void;
    /**
     * Toggles strikethrough.
     */
    strikethrough(): void;
    /**
     * Toggles subscript; clears an active superscript since the two are mutually exclusive.
     */
    subscript(): void;
    /**
     * Toggles superscript; clears an active subscript since the two are mutually exclusive.
     */
    superscript(): void;
    /**
     * Toggles the inline code mark.
     */
    code(): void;
    /**
     * Applies a font family such as `'Georgia'`.
     */
    fontFamily(value: string): void;
    /**
     * Applies a font size such as `'18px'`.
     */
    fontSize(value: string): void;
    /**
     * Applies a text color such as `'#e11d48'`.
     */
    foregroundColor(color: string): void;
    /**
     * Applies a background color such as `'#fef08a'`.
     */
    backgroundColor(color: string): void;
    /**
     * Removes every text style mark (colors, fonts) from the selection.
     */
    clearFormatting(): void;
    /**
     * Converts the block to a heading of `level` 1-6; calling it with the active level turns it back into a paragraph.
     */
    heading(level: number): void;
    /**
     * Converts the active block to a paragraph.
     */
    paragraph(): void;
    /**
     * Toggles blockquote wrapping.
     */
    blockquote(): void;
    /**
     * Toggles the active block into a fenced code block.
     */
    codeBlock(): void;
    /**
     * Toggles a bullet list.
     */
    bulletList(): void;
    /**
     * Toggles an ordered list.
     */
    orderedList(): void;
    /**
     * Toggles a checklist.
     */
    checkList(): void;
    /**
     * Sets the text alignment of the active block.
     */
    textAlign(alignment: TextEditorTextAlign): void;
    /**
     * Indents the list item around the cursor one level deeper.
     */
    indent(): void;
    /**
     * Outdents the list item around the cursor one level; promotes it out of the list at the top level.
     */
    outdent(): void;
    /**
     * Inserts a horizontal rule at the cursor.
     */
    insertHorizontalRule(): void;
    /**
     * Inserts a hyperlink. `text` is used when the selection is collapsed.
     */
    insertLink(url: string, text?: string): void;
    /**
     * Changes the href of the link around the cursor.
     */
    updateLink(url: string): void;
    /**
     * Removes the link around the cursor.
     */
    removeLink(): void;
    /**
     * Inserts an image directly from a URL.
     */
    insertImage(src: string, attrs?: TextEditorImageAttrs): void;
    /**
     * Opens the image upload surface when an image upload part is mounted.
     */
    uploadImages(): void;
    /**
     * Opens the document upload surface when a document upload part is mounted.
     */
    uploadDocuments(): void;
    /**
     * Inserts a table with the given dimensions (defaults 3x3).
     */
    table(rows?: number, cols?: number): void;
    /**
     * Moves the caret focus back into the editor.
     */
    focus(): void;
    /**
     * Removes focus from the editor.
     */
    blur(): void;
    /**
     * Steps back in history.
     */
    undo(): void;
    /**
     * Steps forward in history.
     */
    redo(): void;
    /**
     * Prints the sanitized document content.
     */
    print(): void;
}

/**
 * Column menu commands provided by the table column menu part.
 * @group Interfaces
 */
export interface TextEditorTableColumnCommands {
    /**
     * Inserts a column to the left of the active one.
     */
    insertBefore(): void;
    /**
     * Inserts a column to the right of the active one.
     */
    insertAfter(): void;
    /**
     * Deletes the active column.
     */
    delete(): void;
    /**
     * Aligns the cells of the active column.
     */
    align(alignment: TextEditorTextAlign): void;
}

/**
 * Row menu commands provided by the table row menu part.
 * @group Interfaces
 */
export interface TextEditorTableRowCommands {
    /**
     * Inserts a row above the active one.
     */
    insertBefore(): void;
    /**
     * Inserts a row below the active one.
     */
    insertAfter(): void;
    /**
     * Deletes the active row.
     */
    delete(): void;
}

/**
 * Cell menu commands provided by the table cell menu part.
 * @group Interfaces
 */
export interface TextEditorTableCellCommands {
    /**
     * Merges the selected cells.
     */
    merge(): void;
    /**
     * Splits the active merged cell.
     */
    split(): void;
    /**
     * Clears the contents of the selected cells.
     */
    clear(): void;
    /**
     * Deletes the whole table.
     */
    deleteTable(): void;
}

/**
 * Block menu commands (duplicate, copy, delete, turn into).
 * @group Interfaces
 */
export interface TextEditorBlockMenuCommands {
    /**
     * Duplicates the block and inserts the copy below it.
     */
    duplicate(): void;
    /**
     * Copies the block HTML to the clipboard.
     */
    copyToClipboard(): void;
    /**
     * Deletes the block.
     */
    deleteBlock(): void;
    /**
     * Converts the block into a heading level (1-6) or paragraph (level 0).
     */
    turnInto(level: number): void;
}

/**
 * Slash menu commands surfaced while the `/` palette is open.
 * @group Interfaces
 */
export interface TextEditorSlashMenuCommands {
    /**
     * Converts the block into a heading.
     */
    heading(level: number): void;
    /**
     * Converts the block into a paragraph.
     */
    paragraph(): void;
    /**
     * Toggles a bullet list.
     */
    bulletList(): void;
    /**
     * Toggles an ordered list.
     */
    orderedList(): void;
    /**
     * Toggles a checklist.
     */
    checkList(): void;
    /**
     * Toggles a blockquote.
     */
    blockquote(): void;
    /**
     * Toggles a code block.
     */
    codeBlock(): void;
    /**
     * Inserts a horizontal rule.
     */
    horizontalRule(): void;
    /**
     * Inserts a table.
     */
    table(rows?: number, cols?: number): void;
    /**
     * Opens the image upload surface.
     */
    uploadImages(): void;
}

/**
 * Mention menu commands surfaced while the `@` menu is open.
 * @group Interfaces
 */
export interface TextEditorMentionCommands {
    /**
     * Accepts a candidate and inserts the mention.
     */
    select(item: unknown): void;
}

/**
 * Shared submenu controller handed to menu parts and their submenus.
 * @group Interfaces
 */
export interface TextEditorSubmenu {
    /**
     * Currently open submenu key, or null.
     */
    active(): string | null;
    /**
     * Opens the submenu registered under `key`.
     */
    open(key: string): void;
    /**
     * Closes the open submenu.
     */
    close(): void;
}

/**
 * A document heading entry used by the navigator minimap.
 * @group Interfaces
 */
export interface TextEditorHeadingEntry {
    /**
     * Heading level 1-6.
     */
    level: number;
    /**
     * Concatenated heading text.
     */
    text: string;
    /**
     * Document position of the heading.
     */
    pos: number;
}

/**
 * Geometry of the active table, relative to the editor body.
 * @group Interfaces
 */
export interface TableOverlayRect {
    /**
     * Top offset in pixels.
     */
    top: number;
    /**
     * Left offset in pixels.
     */
    left: number;
    /**
     * Width in pixels.
     */
    width: number;
    /**
     * Height in pixels.
     */
    height: number;
}

/**
 * Active table state when the cursor is inside a table.
 * @group Interfaces
 */
export interface TableActiveState {
    /**
     * Active row index.
     */
    rowIndex: number;
    /**
     * Active column index.
     */
    colIndex: number;
    /**
     * Total rows.
     */
    rowCount: number;
    /**
     * Total columns.
     */
    colCount: number;
}

/**
 * Update payload emitted while the slash menu is active.
 * @group Interfaces
 */
export interface TextEditorSlashMenuUpdate {
    /**
     * Whether the menu is active.
     */
    active: boolean;
    /**
     * Filter text typed after the `/`.
     */
    text: string;
    /**
     * Caret position to anchor the popover, or null.
     */
    position: CaretPosition | null;
}

/**
 * Update payload emitted while the mention menu is active.
 * @group Interfaces
 */
export interface TextEditorMentionUpdate {
    /**
     * Whether the menu is active.
     */
    active: boolean;
    /**
     * Suggestion items resolved by the mention handler.
     */
    items: unknown[];
    /**
     * Filter text typed after the `@`.
     */
    text: string;
    /**
     * Caret position to anchor the popover, or null.
     */
    position: CaretPosition | null;
}

/**
 * Hovered block payload emitted in block mode for floating controls positioning.
 * @group Interfaces
 */
export interface TextEditorBlockHover {
    /**
     * The hovered block's DOM element.
     */
    element: HTMLElement | null;
    /**
     * Index of the hovered top-level block.
     */
    index: number;
}

/**
 * Live document statistics contributed by a character-count plugin.
 * @group Interfaces
 */
export interface CharacterCountStats {
    /**
     * Character count (whitespace excluded).
     */
    characters: number;
    /**
     * Word count.
     */
    words: number;
    /**
     * Whether the optional soft limit is exceeded (never enforced).
     */
    overLimit: boolean;
}

/**
 * A registered text editor plugin.
 * @group Interfaces
 */
export interface TextEditorPluginDefinition<Options = any, Commands = Record<string, (...args: any[]) => any>> {
    /**
     * Plugin namespace; contributed commands surface under `pluginCommands[name]`.
     */
    name: string;
    /**
     * Runs once on mount; returns contributed commands.
     */
    install: (ctx: TextEditorPluginContext<Options>) => { commands?: Commands } | void;
    /**
     * Static contributions assembled before the editor state is created.
     */
    options?: {
        /**
         * Extra nodes contributed to the schema.
         */
        schema?: { nodes?: Record<string, unknown>; marks?: Record<string, unknown> };
        /**
         * ProseMirror plugins created with the assembled schema.
         */
        prosemirrorPlugins?: (schema: unknown, options: Options | undefined) => unknown[];
    };
}

/**
 * Context passed to a plugin's install function.
 * @group Interfaces
 */
export interface TextEditorPluginContext<Options = any> {
    /**
     * The plugin's own options (from the `[plugin, options]` tuple).
     */
    options: Options | undefined;
    /**
     * Currently selected plain text.
     */
    getSelectedText(): string;
    /**
     * Replaces the selection with content, optionally interpreted as HTML.
     */
    replaceSelection(content: string, asHtml?: boolean): void;
    /**
     * The editor's root DOM element.
     */
    getEditorElement(): HTMLElement | null;
    /**
     * The live ProseMirror EditorView.
     */
    getView(): unknown | null;
    /**
     * The current ProseMirror EditorState.
     */
    getState(): unknown | null;
    /**
     * Attaches a ProseMirror plugin at runtime; returns a remover.
     */
    registerProseMirrorPlugin(plugin: unknown): () => void;
    /**
     * Runs a raw ProseMirror command.
     */
    runCommand(command: (state: unknown, dispatch?: any, view?: any) => boolean): boolean;
    /**
     * Registers a cleanup callback run on unmount.
     */
    onUnmounted(fn: () => void): void;
}

/**
 * Root context surfaced to projected widgets via the `TEXTEDITOR_CONTEXT` token.
 * Every field is a signal — call it to read the current value.
 * @group Interfaces
 */
export interface TextEditorContextValue {
    /**
     * Imperative commands, or null before the editor is created.
     */
    commands: () => TextEditorCommands | null;
    /**
     * Format state snapshot, or null before the editor is created.
     */
    state: () => TextEditorFormatState | null;
    /**
     * Commands contributed by registered plugins, keyed by plugin name.
     */
    pluginCommands: () => Record<string, Record<string, (...args: any[]) => any>>;
    /**
     * Document headings for the navigator.
     */
    headings: () => TextEditorHeadingEntry[];
    /**
     * Whether the editor is disabled.
     */
    disabled: () => boolean;
    /**
     * Whether the editor is readonly.
     */
    readonly: () => boolean;
    /**
     * Serializes the document to HTML.
     */
    getHTML(): string;
    /**
     * Serializes the document to an array of block HTML strings.
     */
    getBlocks(): string[];
    /**
     * Serializes the document to plain text.
     */
    getText(): string;
    /**
     * Serializes the document to Markdown.
     */
    getMarkdown(): string;
    /**
     * Replaces the editor content.
     */
    setValue(value: string | string[]): void;
}

/**
 * Context surfaced by the context toolbar part via `CONTEXTTOOLBAR_CONTEXT`.
 * @group Interfaces
 */
export interface ContextToolbarContextValue {
    /**
     * Imperative commands.
     */
    commands: () => TextEditorCommands | null;
    /**
     * Format state snapshot.
     */
    state: () => TextEditorFormatState | null;
    /**
     * Whether the overflow panel is open.
     */
    moreActive: () => boolean;
    /**
     * Toggles the overflow panel.
     */
    toggleMore(event?: Event): void;
    /**
     * Publishes the element the overflow panel anchors to.
     */
    setMoreTrigger(el: HTMLElement | null): void;
    /**
     * Dismisses the context toolbar.
     */
    dismiss(): void;
}

/**
 * Context surfaced by the block controls part via `BLOCKCONTROLS_CONTEXT`.
 * @group Interfaces
 */
export interface BlockControlsContextValue {
    /**
     * Index of the hovered block.
     */
    index: () => number;
    /**
     * Type name of the hovered block, e.g. `'paragraph'` or `'heading'`.
     */
    blockType: () => string;
    /**
     * Inserts a new empty block after `index`.
     */
    addBlock(index: number): void;
    /**
     * Starts a block drag.
     */
    onDragStart(index: number, event: DragEvent): void;
    /**
     * Ends a block drag.
     */
    onDragEnd(): void;
    /**
     * Opens the block menu anchored to the handle.
     */
    onDragHandleClick(index: number, event: MouseEvent): void;
}

/**
 * Context surfaced by the block menu part via `BLOCKMENU_CONTEXT`.
 * @group Interfaces
 */
export interface BlockMenuContextValue {
    /**
     * Index of the block the menu was opened for.
     */
    blockIndex: () => number;
    /**
     * Type name of the target block.
     */
    blockType: () => string;
    /**
     * Block menu commands.
     */
    commands: () => TextEditorBlockMenuCommands;
    /**
     * Shared submenu controller.
     */
    submenu: TextEditorSubmenu;
    /**
     * Dismisses the menu.
     */
    dismiss(): void;
}

/**
 * Context surfaced by the slash menu part via `SLASHMENU_CONTEXT`.
 * @group Interfaces
 */
export interface SlashMenuContextValue {
    /**
     * Slash menu commands.
     */
    commands: () => TextEditorSlashMenuCommands;
    /**
     * Current filter text.
     */
    filterText: () => string;
    /**
     * Caret position to anchor to, or null.
     */
    position: () => CaretPosition | null;
    /**
     * Dismisses the menu.
     */
    dismiss(): void;
}

/**
 * Context surfaced by the mention menu part via `MENTIONMENU_CONTEXT`.
 * @group Interfaces
 */
export interface MentionMenuContextValue<T = any> {
    /**
     * Suggestion items resolved by the handler.
     */
    items: () => T[];
    /**
     * Mention commands including `select(item)`.
     */
    commands: () => TextEditorMentionCommands;
    /**
     * Current filter text.
     */
    filterText: () => string;
    /**
     * Caret position to anchor to, or null.
     */
    position: () => CaretPosition | null;
    /**
     * Dismisses the menu.
     */
    dismiss(): void;
}

/**
 * Context surfaced by the upload parts via `UPLOAD_CONTEXT`.
 * @group Interfaces
 */
export interface UploadContextValue {
    /**
     * Whether this surface handles `'image'` or `'document'` uploads.
     */
    kind: 'image' | 'document';
    /**
     * Live upload progress entries.
     */
    uploads: () => UploadSlotEntry[];
    /**
     * Opens the native file picker.
     */
    selectFiles(): void;
    /**
     * Handles a drop event carrying files.
     */
    onDrop(event: DragEvent): void;
    /**
     * Cancels in-progress uploads and hides the surface.
     */
    dismiss(): void;
}

/**
 * Context surfaced by the table controls part via `TABLECONTROLS_CONTEXT`.
 * @group Interfaces
 */
export interface TableControlsContextValue {
    /**
     * Geometry of the active table relative to the editor body, or null when inactive.
     */
    position: () => TableOverlayRect | null;
    /**
     * Floating controls commands.
     */
    commands: () => { addRow(): void; addColumn(): void };
}

/**
 * Context surfaced by the table column menu part via `TABLECOLUMNMENU_CONTEXT`.
 * @group Interfaces
 */
export interface TableColumnMenuContextValue {
    /**
     * Active column index.
     */
    colIndex: () => number;
    /**
     * Total columns.
     */
    colCount: () => number;
    /**
     * Column menu commands.
     */
    commands: () => TextEditorTableColumnCommands;
    /**
     * Shared submenu controller.
     */
    submenu: TextEditorSubmenu;
    /**
     * Dismisses the menu.
     */
    dismiss(): void;
}

/**
 * Context surfaced by the table row menu part via `TABLEROWMENU_CONTEXT`.
 * @group Interfaces
 */
export interface TableRowMenuContextValue {
    /**
     * Active row index.
     */
    rowIndex: () => number;
    /**
     * Total rows.
     */
    rowCount: () => number;
    /**
     * Row menu commands.
     */
    commands: () => TextEditorTableRowCommands;
    /**
     * Shared submenu controller.
     */
    submenu: TextEditorSubmenu;
    /**
     * Dismisses the menu.
     */
    dismiss(): void;
}

/**
 * Context surfaced by the table cell menu part via `TABLECELLMENU_CONTEXT`.
 * @group Interfaces
 */
export interface TableCellMenuContextValue {
    /**
     * Whether more than one cell is selected.
     */
    isMultiCellSelected: () => boolean;
    /**
     * Whether the active cell is merged.
     */
    isCellMerged: () => boolean;
    /**
     * Cell menu commands.
     */
    commands: () => TextEditorTableCellCommands;
    /**
     * Shared submenu controller.
     */
    submenu: TextEditorSubmenu;
    /**
     * Dismisses the menu.
     */
    dismiss(): void;
}

/**
 * Context surfaced by the navigator parts via `NAVIGATOR_CONTEXT`.
 * @group Interfaces
 */
export interface NavigatorContextValue {
    /**
     * Document headings.
     */
    headings: () => TextEditorHeadingEntry[];
    /**
     * Index of the heading currently in view.
     */
    activeIndex: () => number;
    /**
     * Whether the navigator popover menu is open.
     */
    menuOpen: () => boolean;
    /**
     * Opens the navigator popover.
     */
    openMenu(): void;
    /**
     * Closes the navigator popover.
     */
    closeMenu(): void;
    /**
     * Scrolls the given heading into view.
     */
    scrollTo(pos: number): void;
}

/**
 * Slot context handed (already unwrapped) to `pTexteditorToolbarDef` templates.
 * @group Interfaces
 */
export interface TextEditorToolbarSlotContext {
    /**
     * Imperative commands.
     */
    commands: TextEditorCommands;
    /**
     * Format state snapshot.
     */
    state: TextEditorToolbarState;
    /**
     * Plugin command map keyed by plugin name.
     */
    plugins: Record<string, Record<string, (...args: any[]) => any>>;
}

/**
 * Slot context handed to `pTexteditorRootDef` templates.
 * @group Interfaces
 */
export interface TextEditorRootSlotContext extends TextEditorContextValue {}

/**
 * Slot context handed to `pTexteditorContextToolbarDef` templates.
 * @group Interfaces
 */
export interface TextEditorContextToolbarSlotContext extends TextEditorToolbarSlotContext {
    /**
     * Toggles the overflow panel.
     */
    toggleMore: (event?: Event) => void;
    /**
     * Whether the overflow panel is open.
     */
    moreActive: boolean;
    /**
     * Dismisses the context toolbar.
     */
    dismiss: () => void;
}

/**
 * Slot context handed to `pTexteditorContextToolbarMoreDef` templates.
 * @group Interfaces
 */
export interface TextEditorContextToolbarMoreSlotContext {
    /**
     * Imperative commands.
     */
    commands: TextEditorCommands;
    /**
     * Format state snapshot.
     */
    state: TextEditorToolbarState;
    /**
     * Dismisses the context toolbar.
     */
    dismiss: () => void;
}

/**
 * Slot context handed to `pTexteditorBlockControlsDef` templates.
 * @group Interfaces
 */
export interface TextEditorBlockControlsSlotContext {
    /**
     * Index of the hovered block.
     */
    index: number;
    /**
     * Type name of the hovered block.
     */
    blockType: string;
    /**
     * Inserts a new empty block after `index`.
     */
    addBlock: (index: number) => void;
    /**
     * Starts a block drag.
     */
    onDragStart: (index: number, event: DragEvent) => void;
    /**
     * Ends a block drag.
     */
    onDragEnd: () => void;
    /**
     * Opens the block menu anchored to the handle.
     */
    onDragHandleClick: (index: number, event: MouseEvent) => void;
}

/**
 * Slot context handed to `pTexteditorBlockMenuDef` templates.
 * @group Interfaces
 */
export interface TextEditorBlockMenuSlotContext {
    /**
     * Index of the target block.
     */
    blockIndex: number;
    /**
     * Type name of the target block.
     */
    blockType: string;
    /**
     * Block menu commands.
     */
    commands: TextEditorBlockMenuCommands;
    /**
     * Shared submenu controller.
     */
    submenu: TextEditorSubmenu;
    /**
     * Dismisses the menu.
     */
    dismiss: () => void;
}

/**
 * Slot context handed to `pTexteditorBlockSubmenuDef` templates.
 * @group Interfaces
 */
export interface TextEditorBlockSubmenuSlotContext {
    /**
     * Key of the open submenu, or null.
     */
    activeSubmenu: string | null;
    /**
     * Block menu commands (turnInto lives here).
     */
    commands: TextEditorBlockMenuCommands;
    /**
     * Dismisses the menu.
     */
    dismiss: () => void;
}

/**
 * Slot context handed to `pTexteditorSlashMenuDef` templates.
 * @group Interfaces
 */
export interface TextEditorSlashMenuSlotContext {
    /**
     * Slash menu commands.
     */
    commands: TextEditorSlashMenuCommands;
    /**
     * Current filter text.
     */
    filterText: string;
    /**
     * Caret position to anchor to, or null.
     */
    position: CaretPosition | null;
    /**
     * Dismisses the menu.
     */
    dismiss: () => void;
}

/**
 * Slot context handed to `pTexteditorMentionMenuDef` templates.
 * @group Interfaces
 */
export interface TextEditorMentionMenuSlotContext {
    /**
     * Suggestion items resolved by the handler.
     */
    items: unknown[];
    /**
     * Mention commands including `select(item)`.
     */
    commands: TextEditorMentionCommands;
    /**
     * Current filter text.
     */
    filterText: string;
    /**
     * Caret position to anchor to, or null.
     */
    position: CaretPosition | null;
    /**
     * Dismisses the menu.
     */
    dismiss: () => void;
}

/**
 * Slot context handed to `pTexteditorTableControlsDef` templates.
 * @group Interfaces
 */
export interface TextEditorTableControlsSlotContext {
    /**
     * Geometry of the active table, or null when inactive.
     */
    position: TableOverlayRect | null;
    /**
     * Floating controls commands.
     */
    commands: { addRow(): void; addColumn(): void };
}

/**
 * Slot context handed to `pTexteditorTableColumnMenuDef` templates.
 * @group Interfaces
 */
export interface TextEditorTableColumnMenuSlotContext {
    /**
     * Active column index.
     */
    colIndex: number;
    /**
     * Total columns.
     */
    colCount: number;
    /**
     * Column menu commands.
     */
    commands: TextEditorTableColumnCommands;
    /**
     * Shared submenu controller.
     */
    submenu: TextEditorSubmenu;
    /**
     * Dismisses the menu.
     */
    dismiss: () => void;
}

/**
 * Slot context handed to `pTexteditorTableRowMenuDef` templates.
 * @group Interfaces
 */
export interface TextEditorTableRowMenuSlotContext {
    /**
     * Active row index.
     */
    rowIndex: number;
    /**
     * Total rows.
     */
    rowCount: number;
    /**
     * Row menu commands.
     */
    commands: TextEditorTableRowCommands;
    /**
     * Shared submenu controller.
     */
    submenu: TextEditorSubmenu;
    /**
     * Dismisses the menu.
     */
    dismiss: () => void;
}

/**
 * Slot context handed to `pTexteditorTableCellMenuDef` templates.
 * @group Interfaces
 */
export interface TextEditorTableCellMenuSlotContext {
    /**
     * Whether more than one cell is selected.
     */
    isMultiCellSelected: boolean;
    /**
     * Whether the active cell is merged.
     */
    isCellMerged: boolean;
    /**
     * Cell menu commands.
     */
    commands: TextEditorTableCellCommands;
    /**
     * Shared submenu controller.
     */
    submenu: TextEditorSubmenu;
    /**
     * Dismisses the menu.
     */
    dismiss: () => void;
}

/**
 * Slot context handed to `pTexteditorUploadDropzoneDef` templates.
 * @group Interfaces
 */
export interface TextEditorUploadDropzoneSlotContext {
    /**
     * Opens the native file picker.
     */
    selectFiles: () => void;
    /**
     * Handles a drop event carrying files.
     */
    onDrop: (event: DragEvent) => void;
}

/**
 * Slot context handed to `pTexteditorUploadProgressDef` templates.
 * @group Interfaces
 */
export interface TextEditorUploadProgressSlotContext {
    /**
     * Live upload entries.
     */
    uploads: UploadSlotEntry[];
    /**
     * Cancels uploads and dismisses the surface.
     */
    dismiss: () => void;
}

/**
 * Slot context handed to `pTexteditorNavigatorTriggerDef` and `pTexteditorNavigatorMenuDef` templates.
 * @group Interfaces
 */
export interface TextEditorNavigatorSlotContext {
    /**
     * Document headings.
     */
    headings: TextEditorHeadingEntry[];
    /**
     * Index of the heading currently in view.
     */
    activeIndex: number;
    /**
     * Scrolls a heading into view (menu slot only).
     */
    scrollTo?: (pos: number) => void;
}

/**
 * Payload of the `parseError` output.
 * @group Interfaces
 */
export interface TextEditorParseErrorEvent {
    /**
     * The underlying parse error.
     */
    error: unknown;
}

/**
 * Payload of the `blockHoverChange` output.
 * @group Interfaces
 */
export type TextEditorBlockHoverEvent = TextEditorBlockHover;

/**
 * Payload of the `tableColumnMenuRequest` output.
 * @group Interfaces
 */
export interface TextEditorTableColumnMenuEvent {
    /**
     * Index of the column whose trigger was clicked.
     */
    colIndex: number;
    /**
     * The originating mouse event.
     */
    event: MouseEvent;
}

/**
 * Payload of the `tableRowMenuRequest` output.
 * @group Interfaces
 */
export interface TextEditorTableRowMenuEvent {
    /**
     * Index of the row whose trigger was clicked.
     */
    rowIndex: number;
    /**
     * The originating mouse event.
     */
    event: MouseEvent;
}

/**
 * Defines valid templates in TextEditor.
 * @group Templates
 */
export interface TextEditorTemplates {
    /**
     * Custom toolbar template.
     */
    toolbar(): TemplateRef<any>;
}

/**
 * Custom value change event.
 * @see {@link TextEditorRoot.valueChange}
 * @group Events
 */
export interface TextEditorValueChangeEvent {
    /**
     * Editor value as HTML string (classic mode) or array of block HTML strings (block mode).
     */
    value: string | string[];
}
