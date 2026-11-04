import { AppCode } from '@/components/doc/app.code';
import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
    selector: 'texteditor-api-doc',
    standalone: true,
    imports: [AppCode],
    template: `
        <!-- Import -->
        <h3 class="doc-section-label !mt-6">Import<a class="cursor-pointer" id="api.import" (click)="onAnchor($event, 'api.import')">#</a></h3>
        <app-code [code]="importCode" [hideToggleCode]="true"></app-code>

        <!-- API -->
        <h3 class="doc-section-label !mt-6">API<a class="cursor-pointer" id="api.api" (click)="onAnchor($event, 'api.api')">#</a></h3>
        <p>Every part is a standalone component; mounting a part enables its feature in the runtime. <code>TextEditorModule</code> ships the full <code>TEXTEDITOR_PARTS</code> set.</p>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Part</th>
                        <th>Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    @for (part of parts; track part.selector) {
                        <tr>
                            <td>
                                <code>{{ part.selector }}</code>
                            </td>
                            <td>{{ part.purpose }}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>

        <!-- Context Tokens -->
        <h3 class="doc-section-label !mt-6">Context Tokens ({{ tokens.length }})<a class="cursor-pointer" id="api.context-tokens" (click)="onAnchor($event, 'api.context-tokens')">#</a></h3>
        <p>Injection tokens published by the compound parts. Projected widgets inject a token with <code>inject(...)</code> to reach the live editor signals — commands, state, menu commands and part actions — without template plumbing.</p>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Token</th>
                        <th>Context Type</th>
                        <th>Provided By / Surface</th>
                    </tr>
                </thead>
                <tbody>
                    @for (token of tokens; track token.name) {
                        <tr>
                            <td>
                                <span class="doc-prop-name font-semibold text-primary">{{ token.name }}</span>
                            </td>
                            <td>
                                <code>{{ token.type }}</code>
                            </td>
                            <td>{{ token.surface }}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>

        <!-- Inputs -->
        <h3 class="doc-section-label !mt-6">Inputs ({{ inputs.length }})<a class="cursor-pointer" id="api.inputs" (click)="onAnchor($event, 'api.inputs')">#</a></h3>
        <p>Defines the input properties of <code>p-texteditor-root</code>.</p>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    @for (prop of inputs; track prop.name) {
                        <tr>
                            <td>
                                <span class="doc-prop-name font-semibold text-primary">{{ prop.name }}</span>
                            </td>
                            <td>
                                <code class="doc-type">{{ prop.type }}</code>
                            </td>
                            <td>
                                <code>{{ prop.default }}</code>
                            </td>
                            <td>{{ prop.description }}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>

        <!-- Outputs -->
        <h3 class="doc-section-label !mt-6">Outputs ({{ emits.length }})<a class="cursor-pointer" id="api.outputs" (click)="onAnchor($event, 'api.outputs')">#</a></h3>
        <p>Defines event emitters of <code>p-texteditor-root</code>.</p>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Parameters</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    @for (emit of emits; track emit.name) {
                        <tr>
                            <td>
                                <span class="doc-prop-name font-semibold text-primary">{{ emit.name }}</span>
                            </td>
                            <td>
                                <code>{{ emit.parameters }}</code>
                            </td>
                            <td>{{ emit.description }}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>

        <!-- Methods -->
        <h3 class="doc-section-label !mt-6">Methods ({{ methods.length }})<a class="cursor-pointer" id="api.methods" (click)="onAnchor($event, 'api.methods')">#</a></h3>
        <p>Defines public methods callable on the root component reference.</p>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Parameters</th>
                        <th>Return</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    @for (m of methods; track m.name) {
                        <tr>
                            <td>
                                <span class="doc-prop-name font-semibold text-primary">{{ m.name }}</span>
                            </td>
                            <td>
                                <code>{{ m.parameters || '-' }}</code>
                            </td>
                            <td>
                                <code>{{ m.return }}</code>
                            </td>
                            <td>{{ m.description }}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>

        <!-- Interfaces -->
        <h3 class="doc-section-label !mt-6">Interfaces ({{ interfaces.length }})<a class="cursor-pointer" id="api.interfaces" (click)="onAnchor($event, 'api.interfaces')">#</a></h3>
        <p>Defines the custom interfaces used by the module; all are re-exported from <code>@bdspark/sparkng/types/texteditor</code>.</p>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Interface</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    @for (iface of interfaces; track iface.name) {
                        <tr>
                            <td>
                                <span class="doc-prop-name font-semibold text-primary">{{ iface.name }}</span>
                            </td>
                            <td>{{ iface.description }}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>

        <!-- Types -->
        <h3 class="doc-section-label !mt-6">Types &amp; Constants<a class="cursor-pointer" id="api.types" (click)="onAnchor($event, 'api.types')">#</a></h3>
        <p>Type aliases, callable contracts and constants exported by the module.</p>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Type / Constant</th>
                        <th>Value</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    @for (t of types; track t.name) {
                        <tr>
                            <td>
                                <span class="doc-prop-name font-semibold text-primary">{{ t.name }}</span>
                            </td>
                            <td>
                                <code>{{ t.value }}</code>
                            </td>
                            <td>{{ t.description }}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>

        <!-- Style Classes -->
        <h3 class="doc-section-label !mt-6">Style Classes ({{ styleClasses.length }})<a class="cursor-pointer" id="api.style-classes" (click)="onAnchor($event, 'api.style-classes')">#</a></h3>
        <p>
            Structural classes applied by the parts. Each part root also carries <code>data-scope="texteditor"</code> and a <code>data-part</code> attribute for targeted CSS; visual theming goes through the <code>--p-texteditor-*</code> design tokens
            which fall back to the global <code>--p-*</code> theme variables.
        </p>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Class</th>
                        <th>Element</th>
                    </tr>
                </thead>
                <tbody>
                    @for (cls of styleClasses; track cls.name) {
                        <tr>
                            <td>
                                <code>{{ cls.name }}</code>
                            </td>
                            <td>{{ cls.element }}</td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    `
})
export class ApiDoc {
    private readonly location = inject(Location);

    onAnchor(event: Event, id: string): void {
        this.location.go(this.location.path().split('#')[0] + '#' + id);
        (event.currentTarget as HTMLElement).parentElement?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }

    importCode = {
        basic: `// NgModule setup
import { TextEditorModule } from '@bdspark/sparkng/texteditor';

// Standalone parts (pick what you mount)
import { TextEditorRoot, TextEditorContent, TextEditorToolbar, TextEditorToolbarDef } from '@bdspark/sparkng/texteditor';

// Types & context tokens
import type { TextEditorCommands, TextEditorFormatState, TextEditorMode } from '@bdspark/sparkng/types/texteditor';
import { TEXTEDITOR_CONTEXT } from '@bdspark/sparkng/texteditor';

// Styles (when not importing the global stylesheet)
import '@bdspark/sparkng-styles/texteditor';`
    };

    readonly parts: any[] = [
        { selector: 'p-texteditor-root', purpose: 'Document state, commands, history, value binding and config.' },
        { selector: 'p-texteditor-toolbar', purpose: 'Persistent formatting surface above the content.' },
        { selector: 'p-texteditor-content', purpose: 'The editable region; mounts the ProseMirror view.' },
        { selector: 'p-texteditor-context-toolbar', purpose: 'Floating toolbar anchored to the selection.' },
        { selector: 'p-texteditor-context-toolbar-more', purpose: 'Overflow panel of the context toolbar.' },
        { selector: 'p-texteditor-block-controls', purpose: 'Block-mode hover bar with add/drag handles.' },
        { selector: 'p-texteditor-block-menu / -submenu', purpose: 'Per-block options popover and its submenu.' },
        { selector: 'p-texteditor-slash-menu', purpose: 'Slash-command palette opened by "/".' },
        { selector: 'p-texteditor-mention-menu', purpose: '"@"-mention popover backed by a handler.' },
        { selector: 'p-texteditor-image-upload (+dropzone/progress)', purpose: 'Image upload overlay and sub-parts.' },
        { selector: 'p-texteditor-document-upload (+dropzone/progress)', purpose: 'Document upload overlay; inserts links.' },
        { selector: 'p-texteditor-table-controls', purpose: 'Floating add row/column controls and trigger dots.' },
        { selector: 'p-texteditor-table-column/row/cell-menu (+submenu)', purpose: 'Table action popovers with submenus.' },
        { selector: 'p-texteditor-navigator (+trigger/menu)', purpose: 'Heading-outline minimap triple.' }
    ];

    readonly tokens: any[] = [
        {
            name: 'TEXTEDITOR_CONTEXT',
            type: 'TextEditorRootContext',
            surface: 'p-texteditor-root — commands(), state(), pluginCommands(), headings(), registerPart(), rootElement(), upload/mention/navigator signals. Every other part and projected widget re-uses it.'
        },
        { name: 'CONTEXTTOOLBAR_CONTEXT', type: 'ContextToolbarContextValue', surface: 'p-texteditor-context-toolbar — request position, moreActive, toggleMore(), dismiss().' },
        { name: 'BLOCKCONTROLS_CONTEXT', type: 'BlockControlsContextValue', surface: 'p-texteditor-block-controls — hovered block, drag lifecycle, add-block and menu triggers (block mode).' },
        { name: 'BLOCKMENU_CONTEXT', type: 'BlockMenuContextValue', surface: 'p-texteditor-block-menu — open request, submenu anchors, commands() (duplicate, turn-into, delete, move).' },
        { name: 'SLASHMENU_CONTEXT', type: 'SlashMenuContextValue', surface: 'p-texteditor-slash-menu — filter text, request position, commands(), moveFocus(), select(), dismiss().' },
        { name: 'MENTIONMENU_CONTEXT', type: 'MentionMenuContextValue<T>', surface: 'p-texteditor-mention-menu — query text, resolved items, commands(), dismiss().' },
        { name: 'UPLOAD_CONTEXT', type: 'UploadContextValue', surface: 'p-texteditor-image-upload / -document-upload — entries(), kind, open state, accept config, startUploads(), dismiss().' },
        { name: 'TABLECONTROLS_CONTEXT', type: 'TableControlsContextValue', surface: 'p-texteditor-table-controls — overlay rect, add row/column triggers, menu open state.' },
        { name: 'TABLECOLUMNMENU_CONTEXT', type: 'TableColumnMenuContextValue', surface: 'p-texteditor-table-column-menu — columnIndex, commands() (insert, delete, align, width).' },
        { name: 'TABLEROWMENU_CONTEXT', type: 'TableRowMenuContextValue', surface: 'p-texteditor-table-row-menu — rowIndex, commands() (insert above/below, delete, merge).' },
        { name: 'TABLECELLMENU_CONTEXT', type: 'TableCellMenuContextValue', surface: 'p-texteditor-table-cell-menu — commands() (merge, split, background, align, header toggle).' },
        { name: 'NAVIGATOR_CONTEXT', type: 'NavigatorContextValue', surface: 'p-texteditor-navigator — headings(), activeIndex(), scrollTo(), menu open state.' }
    ];

    readonly inputs: any[] = [
        { name: 'value', type: 'string | string[] | null', default: 'null', description: 'Editor value: HTML string (classic) or array of block HTML strings (block mode). Two-way bindable.' },
        { name: 'mode', type: 'TextEditorMode', default: "'classic'", description: "Editing mode: 'classic' or 'block'." },
        { name: 'plugins', type: 'TextEditorPluginEntry[]', default: 'undefined', description: 'Registered plugins or [plugin, options] tuples; frozen once the editor is created.' },
        { name: 'placeholder', type: 'string | null', default: 'null', description: 'Placeholder rendered inside an empty editor.' },
        { name: 'markdown', type: 'boolean', default: 'false', description: 'Enables markdown input rules (#, **, -, >, ==, ```).' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables editing and toolbar interactions while rendering content.' },
        { name: 'readonly', type: 'boolean', default: 'false', description: 'Keeps content selectable/copyable but blocks edits.' },
        { name: 'navigator', type: 'boolean', default: 'false', description: 'Enables heading tracking for the navigator minimap.' },
        { name: 'allowedImageTypes', type: 'string', default: "'image/*'", description: 'Accepted file types for image uploads.' },
        { name: 'allowedDocumentTypes', type: 'string', default: "'.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip'", description: 'Accepted file types for document uploads.' },
        { name: 'imageMaxFileCount / documentMaxFileCount', type: 'number | null', default: 'null', description: 'Maximum files per upload selection.' },
        { name: 'imageMaxFileSize / documentMaxFileSize', type: 'number | null', default: 'null', description: 'Maximum file size in bytes; see TEXTEDITOR_FILE_SIZE.' },
        {
            name: 'imageUploadHandler / documentUploadHandler / uploadHandler',
            type: 'TextEditorUploadHandler',
            default: 'null',
            description: 'Upload transports (file, { onProgress, signal }) => Promise<url>; kind-specific handlers take precedence.'
        },
        { name: 'mentionHandler', type: '(query: string) => unknown[] | Promise<unknown[]>', default: 'null', description: 'Resolves mention suggestions for the current query.' },
        { name: 'mentionFilterField', type: 'string | null', default: 'null', description: 'Field name used to filter mention items.' },
        { name: 'mentionTemplate', type: '(data: any) => string', default: 'null', description: 'Renders the inserted mention chip text.' },
        { name: 'defaultHighlightColor', type: 'string', default: "'#fef08a'", description: 'Color for the one-click highlight and == rule.' },
        { name: 'defaultTableColumnWidth', type: 'number', default: '120', description: 'Default column width in px for new tables/columns.' },
        { name: 'minTableColumnWidth', type: 'number', default: '40', description: 'Minimum column width in px.' },
        { name: 'checklistPlaceholder', type: 'string | null', default: 'null', description: 'Placeholder inside empty checklist items.' },
        { name: 'slashPlaceholder', type: 'string | null', default: 'null', description: 'Placeholder after "/" while slash commands are active.' },
        { name: 'ariaLabel / ariaLabelledby', type: 'string | null', default: 'null', description: 'Accessible name for the editor region (WCAG 4.1.2).' },
        { name: 'valueChangeDebounce', type: 'number', default: '0', description: 'Debounce (ms) for valueChange; 0 emits immediately.' },
        { name: 'name / required', type: 'string / boolean', default: 'null / false', description: 'Mirrors the value into a hidden input for native form submission.' }
    ];

    readonly emits: any[] = [
        { name: 'valueChange', parameters: 'value: string | string[]', description: 'Editor content value changes.' },
        { name: 'editorCreate', parameters: '—', description: 'Once, when the editor view is created and ready.' },
        { name: 'editorFocus / editorBlur', parameters: '—', description: 'Focus gained / lost.' },
        { name: 'selectionUpdate', parameters: '—', description: 'Selection changes without a document edit.' },
        { name: 'formatStateChange', parameters: 'value: TextEditorFormatState', description: 'Format state changes.' },
        { name: 'parseError', parameters: 'data: { error: unknown }', description: 'Incoming value cannot be parsed; falls back to an empty document.' },
        { name: 'onContextToolbarRequest', parameters: 'position: CaretPosition', description: 'Context toolbar should show (double-click / selection).' },
        { name: 'onSlashMenuRequest', parameters: 'update: { active, position, text }', description: 'Per-transaction while the slash menu is active.' },
        { name: 'onMentionRequest', parameters: 'update: { active, items, position, text }', description: 'Per-transaction while the mention menu is active.' },
        { name: 'blockDragStart / blockDragEnd', parameters: 'index: number / —', description: 'Block drag lifecycle (block mode).' },
        { name: 'blockHoverChange', parameters: 'data: { element, index }', description: 'Hovered block changes (block mode).' },
        { name: 'navigatorHeadingsChange', parameters: 'headings: TextEditorHeadingEntry[]', description: 'Document headings change.' },
        { name: 'navigatorActiveIndexChange', parameters: 'index: number', description: 'Active heading changes during scrolling.' },
        { name: 'tableActiveStateChange', parameters: 'state: TableActiveState | null', description: 'Active table state changes.' },
        { name: 'tableOverlayRectChange', parameters: 'rect: TableOverlayRect | null', description: 'Table overlay geometry changes.' },
        { name: 'onTableColumnMenuRequest / onTableRowMenuRequest / onTableCellMenuRequest', parameters: 'index / index / —', description: 'Table trigger dots activated.' },
        { name: 'onImageUploadRequest / onDocumentUploadRequest', parameters: '—', description: 'Upload placeholder inserted; upload UI should show.' },
        { name: 'onImageUploadStateChange / onDocumentUploadStateChange', parameters: 'entries: UploadSlotEntry[]', description: 'Upload entries change (progress, status).' },
        { name: 'onImageUploadComplete / onDocumentUploadComplete', parameters: '—', description: 'All uploads complete (entries cleared).' },
        { name: 'onImageUploadError / onDocumentUploadError', parameters: 'data: { error, file }', description: 'Upload handler rejects.' },
        { name: 'onImageReject / onDocumentReject', parameters: 'data: { files, reason }', description: "Files rejected by validation; reason is 'max-file-count' | 'max-file-size' | 'file-type'." }
    ];

    readonly methods: any[] = [
        { name: 'getHTML', parameters: '—', return: 'string', description: 'Serializes the document to sanitized HTML.' },
        { name: 'getBlocks', parameters: '—', return: 'string[]', description: 'Serializes one HTML string per top-level block.' },
        { name: 'getJSON', parameters: '—', return: 'unknown', description: 'ProseMirror document as JSON (loss-less).' },
        { name: 'getText', parameters: '—', return: 'string', description: 'Plain-text projection.' },
        { name: 'getMarkdown', parameters: '—', return: 'string', description: 'Markdown projection.' },
        { name: 'setValue', parameters: 'value: string | string[]', return: 'void', description: 'Replaces the editor content.' },
        { name: 'getCommands', parameters: '—', return: 'TextEditorCommands', description: 'The full imperative command set.' },
        { name: 'getState / getView', parameters: '—', return: 'EditorState / EditorView', description: 'Live ProseMirror state/view, or null before mount.' },
        { name: 'getSelectedText', parameters: '—', return: 'string', description: 'Plain text of the current selection.' },
        { name: 'replaceSelection', parameters: 'content: string, asHtml?: boolean', return: 'void', description: 'Replaces the selection, optionally as HTML.' },
        { name: 'getDocumentHeadings', parameters: '—', return: 'TextEditorHeadingEntry[]', description: 'All headings, for the navigator minimap.' },
        { name: 'getTableActiveState / getTableOverlayRect', parameters: '—', return: 'TableActiveState / TableOverlayRect', description: 'Active table state and geometry.' },
        { name: 'getIsMultiCellSelected / getIsCellMerged', parameters: '—', return: 'boolean', description: 'Table selection facts.' },
        { name: 'getBlockMenuCommands', parameters: 'blockIndex: number', return: 'TextEditorBlockMenuCommands', description: 'Block handle menu command set.' },
        { name: 'getFilteredMentionItems', parameters: 'items, filterField, filterText', return: 'unknown[]', description: 'Filters mention items.' },
        { name: 'startImageUploads / startDocumentUploads', parameters: 'files: File[]', return: 'void', description: 'Starts uploads with placeholder insertion.' },
        { name: 'dismissImageUpload / dismissDocumentUpload', parameters: '—', return: 'void', description: 'Cancels uploads and clears the UI.' },
        { name: 'validateImageFiles / validateDocumentFiles', parameters: 'files: File[]', return: 'File[]', description: 'Filters out files failing validation.' },
        { name: 'addBlockAfter / moveBlock / getBlockType', parameters: 'index / from, to / index', return: 'void / void / string', description: 'Block mode helpers.' },
        { name: 'registerProseMirrorPlugin', parameters: 'plugin: Plugin', return: '() => void', description: 'Attaches a ProseMirror plugin; returns a remover.' },
        { name: 'runCommand', parameters: 'command', return: 'boolean', description: 'Runs a raw ProseMirror command.' },
        { name: 'refreshEditable / refreshMarkdown', parameters: '—', return: 'void', description: 'Re-applies the editable predicate / markdown rules live.' },
        { name: 'getEditorElement', parameters: '—', return: 'HTMLElement | null', description: 'The editor content DOM element.' },
        { name: 'print', parameters: '—', return: 'void', description: 'Prints sanitized content through a sandboxed iframe.' }
    ];

    readonly interfaces: any[] = [
        {
            name: 'TextEditorCommands',
            description:
                'The imperative editing command surface: marks (bold…code), styles (fontFamily, fontSize, foregroundColor, backgroundColor, clearFormatting), blocks (heading 1-6, paragraph, blockquote, codeBlock), lists (bullet, ordered, check, indent, outdent), alignment (textAlign left/center/right/justify), inserts (link, image, rule, table), history (undo/redo) and print.'
        },
        { name: 'TextEditorFormatState', description: 'Snapshot of the active marks, block type, lists, alignment, colors, font family/size and history flags at the current selection; mixed selections report null for value inputs.' },
        { name: 'TextEditorToolbarState', description: 'Toolbar binding slice of the format state (heading, marks, lists, align, colors, canUndo/canRedo).' },
        { name: 'TextEditorContextValue', description: 'The TEXTEDITOR_CONTEXT surface implemented by the root: commands(), state(), pluginCommands(), headings() signals plus registration hooks.' },
        { name: 'ContextToolbarContextValue / BlockControlsContextValue / BlockMenuContextValue', description: 'Contexts of the floating toolbar and block-mode handles.' },
        { name: 'SlashMenuContextValue / MentionMenuContextValue<T>', description: 'Contexts of the typeahead menus: filter text/query, resolved items and selection helpers.' },
        { name: 'UploadContextValue', description: 'Context of the upload overlays: kind ("image" | "document"), entries signal, start/dismiss actions.' },
        { name: 'TableControlsContextValue / TableColumnMenuContextValue / TableRowMenuContextValue / TableCellMenuContextValue', description: 'Contexts of the table part family: overlay geometry plus per-axis command sets.' },
        { name: 'NavigatorContextValue', description: 'Context of the navigator minimap: headings(), activeIndex(), scrollTo().' },
        {
            name: 'TextEditor*SlotContext',
            description: 'Unwrapped slot props handed to the *Def template directives (Toolbar, Root, ContextToolbar(+More), BlockControls, BlockMenu(+Submenu), SlashMenu, MentionMenu, Table*, UploadDropzone/Progress, Navigator).'
        },
        { name: 'TextEditorPluginDefinition / TextEditorPluginContext', description: 'Plugin system contracts for defineTextEditorPlugin().' },
        { name: 'TextEditorTableColumnCommands / TableRowCommands / TableCellCommands', description: 'Per-axis table command groups (insert/delete/align/width, merge/split, header toggle, cell background).' },
        { name: 'TextEditorBlockMenuCommands / TextEditorSlashMenuCommands / TextEditorMentionCommands / TextEditorSubmenu', description: 'Command groups surfaced by the block menu, slash palette and mention menu.' },
        { name: 'CaretPosition / TableOverlayRect / TableActiveState', description: 'Overlay positioning and table geometry facts.' },
        { name: 'TextEditorHeadingEntry', description: 'Heading entry consumed by the navigator (level, text, position, element).' },
        { name: 'TextEditorImageAttrs / TextEditorUploadOptions', description: 'Image node attributes and per-call upload options ({ onProgress, signal }).' },
        { name: 'UploadSlotEntry / TextEditorFileRejectEvent / TextEditorUploadErrorEvent / TextEditorParseErrorEvent / TextEditorValueChangeEvent', description: 'Payload interfaces of the upload, parse and value events.' },
        { name: 'TextEditorTemplates / TextEditorBlockHover / TextEditorBlockHoverEvent / TextEditorSlashMenuUpdate / TextEditorMentionUpdate', description: 'Template registry and menu/toolbar update payloads.' },
        { name: 'CharacterCountStats', description: 'Plugin character/word statistics { characters, words }.' }
    ];

    readonly types: any[] = [
        { name: 'TextEditorMode', value: "'classic' | 'block'", description: 'Editing mode selector of the root.' },
        { name: 'TextEditorTextAlign', value: "'left' | 'center' | 'right' | 'justify'", description: 'Block alignment values accepted by textAlign() and reported by state.textAlign.' },
        { name: 'TextEditorRejectReason', value: "'max-file-count' | 'max-file-size' | 'file-type'", description: 'Why files were rejected by upload validation.' },
        { name: 'TextEditorUploadHandler', value: '(file: File, options?: TextEditorUploadOptions) => Promise<string>', description: 'Callable upload transport contract; resolves with the uploaded file URL.' },
        { name: 'TextEditorBlockHoverEvent', value: '(data: TextEditorBlockHover) => void', description: 'Handler signature of blockHoverChange.' },
        { name: 'TEXTEDITOR_FILE_SIZE', value: '{ KB: 1024, MB: 1024 * 1024 }', description: 'Byte-unit constants for the *MaxFileSize inputs.' },
        { name: 'TextEditorPluginEntry', value: 'TextEditorPluginDefinition | [TextEditorPluginDefinition, options]', description: 'Plugin or plugin-with-options tuple accepted by the plugins input.' }
    ];

    readonly styleClasses: any[] = [
        { name: 'p-texteditor', element: 'Root wrapper around all parts.' },
        { name: 'p-texteditor-body', element: 'Column wrapper hosting content and block mode.' },
        { name: 'p-texteditor-toolbar', element: 'Persistent toolbar surface.' },
        { name: 'p-texteditor-content', element: 'Editable ProseMirror region.' },
        { name: 'p-texteditor-context-toolbar', element: 'Floating selection toolbar.' },
        { name: 'p-texteditor-context-toolbar-more', element: 'Context toolbar overflow panel.' },
        { name: 'p-texteditor-block-controls', element: 'Block mode hover handle bar.' },
        { name: 'p-texteditor-block-drop-indicator', element: 'Drop position indicator while dragging blocks.' },
        { name: 'p-texteditor-popover-menu', element: 'Base class of the floating menus.' },
        { name: 'p-texteditor-popover-submenu', element: 'Nested submenu panel.' },
        { name: 'p-texteditor-slash-menu', element: 'Slash command palette.' },
        { name: 'p-texteditor-slash-typing', element: 'Block marked as slash-typing.' },
        { name: 'p-texteditor-mention-menu', element: 'Mention popover.' },
        { name: 'p-texteditor-mention', element: 'Inserted mention chip.' },
        { name: 'p-texteditor-mention-typing', element: 'Block marked as mention-typing.' },
        { name: 'p-texteditor-check', element: 'Checklist item wrapper.' },
        { name: 'p-texteditor-upload', element: 'Upload overlay host.' },
        { name: 'p-texteditor-upload-dropzone', element: 'Drag & drop zone of the overlay.' },
        { name: 'p-texteditor-upload-progress', element: 'Per-file progress row.' },
        { name: 'p-texteditor-upload-progress-bar', element: 'Progress bar fill of a row.' },
        { name: 'p-texteditor-table-overlay', element: 'Table interaction overlay layer.' },
        { name: 'p-texteditor-table-selection-outline', element: 'Cell selection outline.' },
        { name: 'p-texteditor-table-add', element: 'Add row/column trigger base.' },
        { name: 'p-texteditor-table-add-row', element: 'Add-row trigger.' },
        { name: 'p-texteditor-table-add-col', element: 'Add-column trigger.' },
        { name: 'p-texteditor-table-trigger', element: 'Header/first-cell menu trigger base.' },
        { name: 'p-texteditor-table-trigger-row', element: 'Row menu trigger dot.' },
        { name: 'p-texteditor-table-trigger-col', element: 'Column menu trigger dot.' },
        { name: 'p-texteditor-navigator', element: 'Navigator minimap host.' },
        { name: 'p-texteditor-navigator-bar', element: 'Navigator heading bar entry.' },
        { name: 'p-texteditor-navigator-popover', element: 'Navigator expanded popover.' },
        { name: 'p-texteditor-hidden-input', element: 'Hidden input mirroring the value for native forms.' }
    ];
}
