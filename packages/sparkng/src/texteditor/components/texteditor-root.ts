/**
 * @file
 * Core TextEditor root component: `p-texteditor-root`.
 *
 * Owns the ProseMirror document, commands, state derivation, history, value
 * binding (model + ControlValueAccessor) and every overlay request consumed by
 * the projected parts. Parts render their own surfaces; a feature turns on
 * when its part is present in the tree.
 */

import { isPlatformServer } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    DestroyRef,
    ElementRef,
    PLATFORM_ID,
    ViewChild,
    booleanAttribute,
    computed,
    effect,
    forwardRef,
    inject,
    input,
    model,
    numberAttribute,
    output,
    signal,
    ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Fragment, Schema, Node as PMNode } from 'prosemirror-model';
import { EditorState, Plugin, Selection, TextSelection, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { CellSelection, TableMap, addColumnAfter, addColumnBefore, addRowAfter, addRowBefore, deleteColumn, deleteRow, deleteTable, mergeCells, splitCell } from 'prosemirror-tables';
import type {
    CaretPosition,
    TableActiveState,
    TableOverlayRect,
    TextEditorBlockMenuCommands,
    TextEditorCommands,
    TextEditorFileSize,
    TextEditorFormatState,
    TextEditorHeadingEntry,
    TextEditorMode,
    TextEditorMentionCommands,
    TextEditorRejectReason,
    TextEditorSlashMenuCommands,
    TextEditorTableCellCommands,
    TextEditorTableColumnCommands,
    TextEditorTableRowCommands,
    TextEditorUploadHandler,
    UploadSlotEntry
} from '@bdspark/sparkng/types/texteditor';
import { TextEditorStyle } from '../style/texteditorstyle';
import { TEXTEDITOR_CONTEXT, CaretRect, TypeaheadRect } from '../context/texteditor.context';
import { TextEditorContent } from './texteditor-content';
import { buildTextEditorSchema, htmlToDoc, parseInertHtml, safeUrl } from '../engine/texteditor-schema';
import { createTextEditorCommands } from '../engine/texteditor-commands';
import { getFormatState } from '../engine/texteditor-format-state';
import { parseBlocks, serializeBlocks, serializeHtml, serializeMarkdown, serializeText } from '../engine/texteditor-serializers';
import { TypeaheadRange, buildKeymap, historyPlugin, markdownInputRules, placeholderPlugin, typeaheadPlugin } from '../engine/texteditor-plugins';
import { resolvePluginEntry, TextEditorPluginEntry } from '../plugins/texteditor-plugin';

/**
 * Named file-size constants for the `maxFileSize` inputs.
 * @group Constants
 */
export const TEXTEDITOR_FILE_SIZE: TextEditorFileSize = {
    ONE_MB: 1_048_576,
    FIVE_MB: 5_242_880,
    TEN_MB: 10_485_760,
    TWENTY_FIVE_MB: 26_214_400,
    FIFTY_MB: 52_428_800
};

const DEFAULT_DOCUMENT_TYPES = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip';
const TRANSPARENT_PIXEL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

interface UploadConfig {
    handler?: TextEditorUploadHandler;
    maxFileCount?: number | null;
    maxFileSize?: number | null;
    allowedTypes?: string;
}

/**
 * TextEditor is a ProseMirror based rich text editor built from headless parts.
 * The root owns the document, commands and state; mount `p-texteditor-toolbar`,
 * `p-texteditor-content` and any feature part inside it.
 *
 * [Live Demo](https://sparkng.bdspark.com/texteditor)
 * @group Components
 */
@Component({
    selector: 'p-texteditor-root',
    standalone: true,
    imports: [],
    template: `
        <ng-content select="p-texteditor-toolbar, [pTexteditorToolbar]" />
        <div class="p-texteditor-body" (scroll)="onBodyScroll()" (dragover)="onBodyDragOver($event)" (drop)="onBodyDrop($event)" (dragleave)="onBodyDragLeave()">
            <ng-content select="p-texteditor-content" />
            @if (blockDropIndex() !== null) {
                <div class="p-texteditor-block-drop-indicator" [style.top.px]="blockDropIndicatorTop()"></div>
            }
        </div>
        <ng-content />
        @if (name()) {
            <input class="p-texteditor-hidden-input" type="hidden" [attr.name]="name()" [attr.required]="required() ? '' : null" [value]="serializedValue()" />
        }
        <input #imagePicker class="p-texteditor-hidden-input" type="file" [attr.accept]="effectiveAllowedTypes('image')" multiple (change)="onPickerChange('image', $event)" />
        <input #documentPicker class="p-texteditor-hidden-input" type="file" [attr.accept]="effectiveAllowedTypes('document')" multiple (change)="onPickerChange('document', $event)" />
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TextEditorStyle, { provide: TEXTEDITOR_CONTEXT, useExisting: forwardRef(() => TextEditorRoot) }, { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextEditorRoot), multi: true }],
    host: {
        class: 'p-texteditor p-component',
        '[attr.data-scope]': '"texteditor"',
        '[attr.data-part]': '"root"',
        '[attr.data-mode]': 'mode()',
        '[attr.data-disabled]': 'effectiveDisabled() ? "" : null',
        '[attr.data-readonly]': 'readonly() ? "" : null'
    },
    exportAs: 'pTextEditor'
})
export class TextEditorRoot implements AfterContentInit {
    private readonly hostEl = inject(ElementRef).nativeElement as HTMLElement;
    private readonly platformId = inject(PLATFORM_ID);
    private readonly destroyRef = inject(DestroyRef);
    readonly _componentStyle = inject(TextEditorStyle);

    constructor() {
        this._componentStyle.loadStyle();
        this.setupEffects();
        this.destroyRef.onDestroy(() => this.cleanup());
    }

    /******************** Inputs ********************/

    /**
     * Editor value: an HTML string in classic mode, or an array of block HTML strings in block mode.
     * Two-way bindable with `[(value)]`.
     * @group Props
     */
    readonly value = model<string | string[] | null>(null);
    /**
     * Editing mode: `'classic'` (toolbar editor) or `'block'` (Notion-like block editor).
     * @group Props
     */
    readonly mode = input<TextEditorMode>('classic');
    /**
     * Registered plugins or `[plugin, options]` tuples. The plugin set is frozen once the editor is created.
     * @group Props
     */
    readonly plugins = input<TextEditorPluginEntry[] | undefined>();
    /**
     * Placeholder rendered inside an empty editor.
     * @group Props
     */
    readonly placeholder = input<string | null>(null);
    /**
     * Enables markdown input rules such as `#`, `**bold**`, `- list` and `> quote`.
     * @group Props
     */
    readonly markdown = input(false, { transform: booleanAttribute });
    /**
     * Disables editing and toolbar interactions while still rendering content.
     * @group Props
     */
    readonly disabled = input(false, { transform: booleanAttribute });
    /**
     * Keeps content selectable and copyable but blocks edits.
     * @group Props
     */
    readonly readonly = input(false, { transform: booleanAttribute });
    /**
     * Enables heading tracking for the navigator even without its parts mounted.
     * @group Props
     */
    readonly navigator = input(false, { transform: booleanAttribute });
    /**
     * Accepted file types for image uploads.
     * @group Props
     */
    readonly allowedImageTypes = input<string>('image/*');
    /**
     * Accepted file types for document uploads.
     * @group Props
     */
    readonly allowedDocumentTypes = input<string>(DEFAULT_DOCUMENT_TYPES);
    /**
     * Maximum number of images per upload selection.
     * @group Props
     */
    readonly imageMaxFileCount = input<number | null>(null);
    /**
     * Maximum image file size in bytes; see {@link TEXTEDITOR_FILE_SIZE}.
     * @group Props
     */
    readonly imageMaxFileSize = input<number | null>(null);
    /**
     * Maximum number of documents per upload selection.
     * @group Props
     */
    readonly documentMaxFileCount = input<number | null>(null);
    /**
     * Maximum document file size in bytes; see {@link TEXTEDITOR_FILE_SIZE}.
     * @group Props
     */
    readonly documentMaxFileSize = input<number | null>(null);
    /**
     * Image upload handler; takes precedence over `uploadHandler`.
     * @group Props
     */
    readonly imageUploadHandler = input<TextEditorUploadHandler | null>(null);
    /**
     * Document upload handler; takes precedence over `uploadHandler`.
     * @group Props
     */
    readonly documentUploadHandler = input<TextEditorUploadHandler | null>(null);
    /**
     * Fallback upload handler when the image/document handlers are not set.
     * @group Props
     */
    readonly uploadHandler = input<TextEditorUploadHandler | null>(null);
    /**
     * Handler resolving mention suggestions for the current `@query`.
     * @group Props
     */
    readonly mentionHandler = input<((query: string) => unknown[] | Promise<unknown[]>) | null>(null);
    /**
     * Field name used to filter mention items, e.g. `'name'`.
     * @group Props
     */
    readonly mentionFilterField = input<string | null>(null);
    /**
     * Template function rendering inserted mention chips, e.g. `(data) => '@' + data.name`.
     * @group Props
     */
    readonly mentionTemplate = input<((data: any) => string) | null>(null);
    /**
     * Color applied by the one-click highlight and the `==` markdown rule.
     * @group Props
     */
    readonly defaultHighlightColor = input<string>('#fef08a');
    /**
     * Default column width in px when inserting tables or columns.
     * @group Props
     */
    readonly defaultTableColumnWidth = input<number>(120, { transform: numberAttribute });
    /**
     * Minimum column width in px for table columns.
     * @group Props
     */
    readonly minTableColumnWidth = input<number>(40, { transform: numberAttribute });
    /**
     * Placeholder rendered inside empty checklist items.
     * @group Props
     */
    readonly checklistPlaceholder = input<string | null>(null);
    /**
     * Placeholder rendered after `/` while slash commands are active.
     * @group Props
     */
    readonly slashPlaceholder = input<string | null>(null);
    /**
     * Accessible name for the editor region (WCAG 4.1.2).
     * @group Props
     */
    readonly ariaLabel = input<string | null>(null);
    /**
     * ID(s) of element(s) labelling the editor region; alternative to `ariaLabel`.
     * @group Props
     */
    readonly ariaLabelledby = input<string | null>(null);
    /**
     * Debounce in milliseconds for `valueChange`; `0` emits immediately.
     * @group Props
     */
    readonly valueChangeDebounce = input<number>(0, { transform: numberAttribute });
    /**
     * Name of a hidden input mirroring the value for native form submission.
     * @group Props
     */
    readonly name = input<string | null>(null);
    /**
     * Whether the mirrored hidden input is required.
     * @group Props
     */
    readonly required = input(false, { transform: booleanAttribute });

    /******************** Outputs ********************/

    /**
     * Emitted once when the editor view is created and ready.
     * @group Emits
     */
    readonly editorCreate = output<void>();
    /**
     * Emitted when the editor gains focus.
     * @group Emits
     */
    readonly editorFocus = output<void>();
    /**
     * Emitted when the editor loses focus.
     * @group Emits
     */
    readonly editorBlur = output<void>();
    /**
     * Emitted when the selection changes without a document edit.
     * @group Emits
     */
    readonly selectionUpdate = output<void>();
    /**
     * Emitted when the format state changes.
     * @group Emits
     */
    readonly formatStateChange = output<TextEditorFormatState>();
    /**
     * Emitted when an incoming value cannot be parsed; the editor falls back to an empty document.
     * @group Emits
     */
    readonly parseError = output<{ error: unknown }>();
    /**
     * Emitted when the context toolbar should show; carries the caret position relative to the root.
     * @group Emits
     */
    readonly onContextToolbarRequest = output<CaretPosition>();
    /**
     * Emitted on every transaction while the slash menu is active.
     * @group Emits
     */
    readonly onSlashMenuRequest = output<{ active: boolean; position: CaretPosition | null; text: string }>();
    /**
     * Emitted on every transaction while the mention menu is active.
     * @group Emits
     */
    readonly onMentionRequest = output<{ active: boolean; items: unknown[]; position: CaretPosition | null; text: string }>();
    /**
     * Emitted when a block drag starts (block mode).
     * @group Emits
     */
    readonly blockDragStart = output<number>();
    /**
     * Emitted when a block drag ends (block mode).
     * @group Emits
     */
    readonly blockDragEnd = output<void>();
    /**
     * Emitted when the hovered block changes (block mode).
     * @group Emits
     */
    readonly blockHoverChange = output<{ element: HTMLElement | null; index: number }>();
    /**
     * Emitted when the document headings change (for the navigator).
     * @group Emits
     */
    readonly navigatorHeadingsChange = output<TextEditorHeadingEntry[]>();
    /**
     * Emitted when the navigator's active heading changes during scrolling.
     * @group Emits
     */
    readonly navigatorActiveIndexChange = output<number>();
    /**
     * Emitted when the active table state changes.
     * @group Emits
     */
    readonly tableActiveStateChange = output<TableActiveState | null>();
    /**
     * Emitted when the table overlay geometry changes.
     * @group Emits
     */
    readonly tableOverlayRectChange = output<TableOverlayRect | null>();
    /**
     * Emitted when a table column trigger is activated.
     * @group Emits
     */
    readonly onTableColumnMenuRequest = output<number>();
    /**
     * Emitted when a table row trigger is activated.
     * @group Emits
     */
    readonly onTableRowMenuRequest = output<number>();
    /**
     * Emitted when a table cell trigger is activated.
     * @group Emits
     */
    readonly onTableCellMenuRequest = output<void>();
    /**
     * Emitted when the image upload surface should show.
     * @group Emits
     */
    readonly onImageUploadRequest = output<void>();
    /**
     * Emitted when image upload entries change.
     * @group Emits
     */
    readonly onImageUploadStateChange = output<UploadSlotEntry[]>();
    /**
     * Emitted when all image uploads complete.
     * @group Emits
     */
    readonly onImageUploadComplete = output<void>();
    /**
     * Emitted when the image upload handler rejects.
     * @group Emits
     */
    readonly onImageUploadError = output<{ file: File; error: unknown }>();
    /**
     * Emitted when image files fail validation.
     * @group Emits
     */
    readonly onImageReject = output<{ files: File[]; reason: TextEditorRejectReason }>();
    /**
     * Emitted when the document upload surface should show.
     * @group Emits
     */
    readonly onDocumentUploadRequest = output<void>();
    /**
     * Emitted when document upload entries change.
     * @group Emits
     */
    readonly onDocumentUploadStateChange = output<UploadSlotEntry[]>();
    /**
     * Emitted when all document uploads complete.
     * @group Emits
     */
    readonly onDocumentUploadComplete = output<void>();
    /**
     * Emitted when the document upload handler rejects.
     * @group Emits
     */
    readonly onDocumentUploadError = output<{ file: File; error: unknown }>();
    /**
     * Emitted when document files fail validation.
     * @group Emits
     */
    readonly onDocumentReject = output<{ files: File[]; reason: TextEditorRejectReason }>();

    /******************** Content children & view refs ********************/

    @ContentChild(TextEditorContent) contentPart?: TextEditorContent;
    @ViewChild('imagePicker') imagePicker?: ElementRef<HTMLInputElement>;
    @ViewChild('documentPicker') documentPicker?: ElementRef<HTMLInputElement>;

    /******************** Signals backing the context ********************/

    readonly _commands = signal<TextEditorCommands | null>(null);
    readonly _state = signal<TextEditorFormatState | null>(null);
    readonly _pluginCommands = signal<Record<string, Record<string, (...args: any[]) => any>>>({});
    readonly _headings = signal<TextEditorHeadingEntry[]>([]);
    readonly navigatorActiveIndex = signal(0);
    readonly navigatorMenuOpen = signal(false);
    readonly cvaDisabled = signal(false);

    readonly commands = this._commands.asReadonly();
    readonly state = this._state.asReadonly();
    readonly pluginCommands = this._pluginCommands.asReadonly();
    readonly headings = this._headings.asReadonly();
    readonly effectiveDisabled = computed(() => this.disabled() || this.cvaDisabled());

    readonly contextToolbarSignal = signal<CaretRect | null>(null);
    readonly contextToolbarMoreActive = signal(false);
    readonly slashSignal = signal<TypeaheadRect | null>(null);
    readonly mentionSignal = signal<(TypeaheadRect & { items: unknown[] }) | null>(null);

    readonly tableRectSignal = signal<TableOverlayRect | null>(null);
    readonly tableActiveSignal = signal<TableActiveState | null>(null);
    readonly tableColumnMenuSignal = signal<{ colIndex: number; top: number; left: number } | null>(null);
    readonly tableRowMenuSignal = signal<{ rowIndex: number; top: number; left: number } | null>(null);
    readonly tableCellMenuSignal = signal<{ top: number; left: number } | null>(null);

    readonly blockHoverSignal = signal<{ element: HTMLElement | null; index: number } | null>(null);
    readonly blockMenuSignal = signal<{ index: number; top: number; left: number } | null>(null);
    readonly blockDropIndex = signal<number | null>(null);
    readonly blockDropIndicatorTop = signal(0);

    readonly imageUploadEntries = signal<UploadSlotEntry[]>([]);
    readonly documentUploadEntries = signal<UploadSlotEntry[]>([]);

    readonly serializedValue = signal<string>('');

    /******************** Private editor state ********************/

    private schema!: Schema;
    private view: EditorView | null = null;
    private commandImpl: TextEditorCommands | null = null;
    private lastEmitted: string | string[] | null = null;
    private valueEmitTimer: any = null;
    private pluginCleanups: (() => void)[] = [];
    private installedPluginCommands: Record<string, Record<string, (...args: any[]) => any>> = {};
    private parts = new Set<string>();
    private uploadConfigs: Record<'image' | 'document', UploadConfig> = { image: {}, document: {} };
    private uploadAbortControllers = new Map<string, AbortController>();
    private typeaheadController: { onArrow(dir: 1 | -1): boolean; onEnter(): boolean; onEscape(): boolean } | null = null;
    private slashRange: TypeaheadRange | null = null;
    private mentionRange: TypeaheadRange | null = null;
    private draggingBlockIndex: number | null = null;
    private mentionConfig: { handler?: ((query: string) => unknown[] | Promise<unknown[]>) | null; filterField?: string | null; template?: ((data: any) => string) | null } = {};
    private onModelChange: ((value: any) => void) | null = null;
    private onModelTouched: (() => void) | null = null;
    private bodyScrollHandler = () => this.updateActiveHeading();
    private documentClickHandler = (event: Event) => {
        if (!this.hostEl.contains(event.target as Node)) {
            this.dismissContextToolbar();
            this.dismissTableMenus();
        }
    };

    /******************** Lifecycle ********************/

    ngAfterContentInit(): void {
        if (isPlatformServer(this.platformId)) return;
        // Content children resolve after content init; wait one CD pass so the
        // mount element exists, mirroring afterNextRender semantics.
        queueMicrotask(() => this.mountEditor());
        document.addEventListener('click', this.documentClickHandler);
    }

    private cleanup(): void {
        if (isPlatformServer(this.platformId)) return;
        document.removeEventListener('click', this.documentClickHandler);
        this.runPluginCleanups();
        this.abortAllUploads();
        this.view?.dom.removeEventListener('scroll', this.bodyScrollHandler);
        this.hostEl.querySelector('.p-texteditor-body')?.removeEventListener('scroll', this.bodyScrollHandler);
        this.view?.destroy();
        this.view = null;
    }

    private mountEditor(): void {
        if (this.view) return;
        const mountEl = this.contentPart?.hostElement;
        if (!mountEl) return;

        this.schema = buildTextEditorSchema();
        const doc = this.parseValue(this.value());

        const pmPlugins: Plugin[] = [];
        for (const entry of this.plugins() ?? []) {
            const { definition, options } = resolvePluginEntry(entry);
            const contributed = definition.options?.prosemirrorPlugins?.(this.schema, options) ?? [];
            for (const plugin of contributed) pmPlugins.push(plugin as Plugin);
        }

        const plugins: Plugin[] = [
            historyPlugin(),
            buildKeymap(this.schema),
            placeholderPlugin(
                () => this.placeholder() ?? '',
                () => this.mode() === 'block'
            ),
            typeaheadPlugin({
                slashEnabled: () => this.parts.has('slashMenu'),
                mentionEnabled: () => this.parts.has('mentionMenu') && !!this.effectiveMentionHandler(),
                onChange: ({ slash, mention }) => this.onTypeaheadChange(slash, mention)
            }),
            ...(this.markdown() ? [markdownInputRules(this.schema, this.defaultHighlightColor())] : []),
            ...pmPlugins
        ];

        this.view = new EditorView(mountEl, {
            state: EditorState.create({ doc, plugins }),
            editable: () => !this.effectiveDisabled() && !this.readonly(),
            attributes: () => this.editorAttributes(),
            handleClickOn: (view, _pos, node, nodePos) => {
                if (node.type.name === 'check_item') {
                    view.dispatch(view.state.tr.setNodeMarkup(nodePos, undefined, { ...node.attrs, checked: !node.attrs.checked }));
                    return true;
                }
                return false;
            },
            transformPastedHTML: (html) => parseInertHtml(html).innerHTML,
            handleDOMEvents: {
                focus: () => {
                    this.editorFocus.emit();
                    return false;
                },
                blur: () => {
                    this.editorBlur.emit();
                    this.onModelTouched?.();
                    return false;
                },
                mouseup: (view) => {
                    this.maybeRequestContextToolbar(view);
                    return false;
                },
                dblclick: (view) => {
                    this.maybeRequestContextToolbar(view);
                    return false;
                },
                mousemove: (view, event) => {
                    if (this.mode() === 'block') this.updateBlockHover(view, event as MouseEvent);
                    return false;
                },
                keydown: (_view, event) => this.handleKeyDown(event as KeyboardEvent)
            },
            dispatchTransaction: (tr) => this.dispatchTransaction(tr)
        });

        this.commandImpl = createTextEditorCommands({
            view: () => this.view,
            schema: () => this.schema,
            openImageUpload: () => this.openUploadPicker('image'),
            openDocumentUpload: () => this.openUploadPicker('document'),
            print: () => this.print()
        });
        this._commands.set(this.commandImpl);

        this.hostEl.querySelector('.p-texteditor-body')?.addEventListener('scroll', this.bodyScrollHandler, { passive: true });

        this.syncState(this.view.state, true);
        this.installPlugins();
        this.editorCreate.emit();
    }

    private setupEffects(): void {
        effect(() => {
            const value = this.value();
            if (this.view && value !== this.lastEmitted) this.applyValue(value);
        });
        effect(() => {
            this.effectiveDisabled();
            this.readonly();
            this.view?.setProps({ editable: () => !this.effectiveDisabled() && !this.readonly() });
        });
        effect(() => {
            const enabled = this.markdown();
            if (!this.view) return;
            const hasRules = this.view.state.plugins.some((p) => (p as any).key === 'inputRules$');
            if (enabled !== hasRules) this.refreshMarkdown();
        });
    }

    private editorAttributes(): Record<string, string> {
        const attrs: Record<string, string> = {
            role: 'textbox',
            'aria-multiline': 'true',
            'aria-label': this.ariaLabel() ?? 'Rich text editor'
        };
        if (this.ariaLabelledby()) attrs['aria-labelledby'] = this.ariaLabelledby()!;
        if (this.readonly() || this.effectiveDisabled()) attrs['aria-readonly'] = 'true';
        if (this.slashSignal() || this.mentionSignal()) attrs['aria-expanded'] = 'true';
        return attrs;
    }

    /******************** Transaction dispatch & sync ********************/

    private dispatchTransaction(tr: Transaction): void {
        const view = this.view;
        if (!view) return;
        const state = view.state.apply(tr);
        view.updateState(state);
        this.syncState(state, false, tr);
    }

    private syncState(state: EditorState, initial: boolean, tr?: Transaction): void {
        const formatState = getFormatState(state);
        this._state.set(formatState);
        if (!initial) this.formatStateChange.emit(formatState);

        if (initial || (tr && (tr.docChanged || tr.selectionSet))) {
            if (tr && tr.selectionSet && !tr.docChanged) this.selectionUpdate.emit();

            if (initial || tr!.docChanged) {
                this.scheduleValueEmit();
                this.syncHeadings(state);
            }
            this.syncTableState(state);

            if (state.selection.empty && this.contextToolbarSignal()) this.dismissContextToolbar();
        }
    }

    private scheduleValueEmit(): void {
        if (this.valueEmitTimer) clearTimeout(this.valueEmitTimer);
        const emit = () => {
            const value = this.buildValue();
            const serialized = typeof value === 'string' ? value : JSON.stringify(value);
            const last = typeof this.lastEmitted === 'string' ? this.lastEmitted : this.lastEmitted ? JSON.stringify(this.lastEmitted) : null;
            if (serialized === last) return;
            if ((serialized === '' || serialized === '[]') && !last) {
                this.lastEmitted = value;
                return;
            }
            this.lastEmitted = value;
            this.serializedValue.set(typeof value === 'string' ? value : value.join('\n'));
            this.value.set(value);
            this.onModelChange?.(value);
        };
        const debounce = this.valueChangeDebounce();
        if (debounce > 0) this.valueEmitTimer = setTimeout(emit, debounce);
        else emit();
    }

    private buildValue(): string | string[] {
        const view = this.view;
        if (!view) return this.mode() === 'block' ? [] : '';
        const doc = view.state.doc;
        const isEmpty = doc.childCount === 1 && doc.firstChild!.type.name === 'paragraph' && doc.firstChild!.content.size === 0;
        if (isEmpty) return this.mode() === 'block' ? [] : '';
        return this.mode() === 'block' ? serializeBlocks(this.schema, doc) : serializeHtml(this.schema, doc);
    }

    private parseValue(value: string | string[] | null): PMNode {
        try {
            if (typeof value === 'string' && value.trim()) return htmlToDoc(this.schema, value);
            if (Array.isArray(value) && value.length) return parseBlocks(this.schema, value);
        } catch (error) {
            this.parseError.emit({ error });
        }
        return this.schema.topNodeType.create(null, this.schema.nodes.paragraph.create());
    }

    private applyValue(value: string | string[] | null): void {
        const view = this.view;
        if (!view) return;
        const doc = this.parseValue(value);
        view.updateState(EditorState.create({ doc, plugins: view.state.plugins }));
        this.syncState(view.state, true);
    }

    /******************** Public serializers & methods ********************/

    /**
     * Serializes the document to sanitized HTML.
     */
    getHTML(): string {
        return this.view ? serializeHtml(this.schema, this.view.state.doc) : '';
    }

    /**
     * Serializes the document to one HTML string per top-level block.
     */
    getBlocks(): string[] {
        return this.view ? serializeBlocks(this.schema, this.view.state.doc) : [];
    }

    /**
     * Plain-text projection of the document.
     */
    getText(): string {
        return this.view ? serializeText(this.view.state.doc) : '';
    }

    /**
     * Markdown projection of the document.
     */
    getMarkdown(): string {
        return this.view ? serializeMarkdown(this.view.state.doc) : '';
    }

    /**
     * ProseMirror document as JSON (loss-less).
     */
    getJSON(): unknown {
        return this.view ? this.view.state.doc.toJSON() : null;
    }

    /**
     * The full imperative command set.
     */
    getCommands(): TextEditorCommands | null {
        return this.commandImpl;
    }

    /**
     * The live ProseMirror EditorState, or null before mount.
     */
    getState(): EditorState | null {
        return this.view?.state ?? null;
    }

    /**
     * The live ProseMirror EditorView, or null before mount.
     */
    getView(): EditorView | null {
        return this.view;
    }

    /**
     * Plain text of the current selection.
     */
    getSelectedText(): string {
        const state = this.view?.state;
        if (!state) return '';
        const { from, to } = state.selection;
        return state.doc.textBetween(from, to, ' ');
    }

    /**
     * Replaces the editor content.
     */
    setValue(value: string | string[]): void {
        this.applyValue(value);
        this.lastEmitted = value;
    }

    /**
     * Replaces the selection with content, optionally interpreted as HTML.
     */
    replaceSelection(content: string, asHtml = false): void {
        const view = this.view;
        if (!view) return;
        const { from, to } = view.state.selection;
        if (asHtml) {
            const parsed = htmlToDoc(this.schema, content);
            view.dispatch(view.state.tr.replaceSelection(parsed.slice(0, parsed.content.size)));
        } else {
            view.dispatch(view.state.tr.insertText(content, from, to));
        }
    }

    /**
     * The ProseMirror content DOM element, or null before mount.
     */
    getEditorElement(): HTMLElement | null {
        return this.view?.dom ?? null;
    }

    /**
     * Re-applies the editable predicate after `disabled`/`readonly` changes.
     */
    refreshEditable(): void {
        this.view?.setProps({ editable: () => !this.effectiveDisabled() && !this.readonly() });
    }

    /**
     * Adds or removes the markdown input-rules plugin live.
     */
    refreshMarkdown(): void {
        const view = this.view;
        if (!view) return;
        const withoutRules = view.state.plugins.filter((p) => (p as any).key !== 'inputRules$');
        const plugins = this.markdown() ? [...withoutRules, markdownInputRules(this.schema, this.defaultHighlightColor())] : withoutRules;
        view.updateState(view.state.reconfigure({ plugins }));
    }

    /**
     * Attaches a ProseMirror plugin at runtime; returns a remover.
     */
    registerProseMirrorPlugin(plugin: Plugin): () => void {
        const view = this.view;
        if (!view) return () => {};
        const next = [...view.state.plugins, plugin];
        view.updateState(view.state.reconfigure({ plugins: next }));
        return () => {
            if (!this.view) return;
            this.view.updateState(this.view.state.reconfigure({ plugins: this.view.state.plugins.filter((p) => p !== plugin) }));
        };
    }

    /**
     * Runs a ProseMirror command; returns whether it applied.
     */
    runCommand(command: (state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView) => boolean): boolean {
        const view = this.view;
        if (!view) return false;
        return command(view.state, view.dispatch, view);
    }

    /**
     * Prints the sanitized document content through a sandboxed iframe.
     */
    print(): void {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('sandbox', 'allow-modals allow-same-origin');
        iframe.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0';
        document.body.appendChild(iframe);
        const doc = iframe.contentDocument!;
        doc.open();
        doc.write(`<!DOCTYPE html><html><head><title>Print</title><style>
            li[data-p-checked] { display: flex; align-items: baseline; gap: 0.375rem; list-style: none; }
            li[data-p-checked] > .p-texteditor-check { flex: 0 0 auto; }
            li[data-p-checked] > .p-texteditor-check-content { flex: 1 1 auto; min-width: 0; }
            li[data-p-checked='true'] { text-decoration: line-through; opacity: 0.6; }
        </style></head><body>${this.getHTML()}</body></html>`);
        doc.close();
        iframe.onload = () => {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
            setTimeout(() => iframe.remove(), 1000);
        };
    }

    /******************** Internal API: parts & type-ahead ********************/

    registerPart(name: string): void {
        this.parts.add(name);
    }

    readonly contextToolbarRequest = () => this.contextToolbarSignal();

    dismissContextToolbar(): void {
        this.contextToolbarSignal.set(null);
        this.contextToolbarMoreActive.set(false);
    }

    toggleContextToolbarMore(event?: Event): void {
        event?.stopPropagation();
        this.contextToolbarMoreActive.update((v) => !v);
    }

    readonly slashMenuRequest = () => this.slashSignal();

    dismissSlashMenu(): void {
        this.slashSignal.set(null);
        this.slashRange = null;
    }

    removeSlashTrigger(): void {
        const range = this.slashRange;
        if (range && this.view) this.view.dispatch(this.view.state.tr.delete(range.from, range.to));
        this.dismissSlashMenu();
    }

    slashCommands(): TextEditorSlashMenuCommands {
        const run = (fn: () => void) => () => {
            this.removeSlashTrigger();
            fn();
            this.view?.focus();
        };
        const commands = this._commands();
        return {
            heading: (level) => run(() => commands?.heading(level)),
            paragraph: () => run(() => commands?.paragraph()),
            bulletList: () => run(() => commands?.bulletList()),
            orderedList: () => run(() => commands?.orderedList()),
            checkList: () => run(() => commands?.checkList()),
            blockquote: () => run(() => commands?.blockquote()),
            codeBlock: () => run(() => commands?.codeBlock()),
            horizontalRule: () => run(() => commands?.insertHorizontalRule()),
            table: (rows, cols) => run(() => commands?.table(rows, cols)),
            uploadImages: () => run(() => commands?.uploadImages())
        };
    }

    readonly mentionRequest = () => this.mentionSignal();

    dismissMentionMenu(): void {
        this.mentionSignal.set(null);
        this.mentionRange = null;
    }

    removeMentionTrigger(): void {
        const range = this.mentionRange;
        if (range && this.view) this.view.dispatch(this.view.state.tr.delete(range.from, range.to));
        this.dismissMentionMenu();
    }

    mentionCommands(): TextEditorMentionCommands {
        return {
            select: (item: unknown) => {
                const range = this.mentionRange;
                const view = this.view;
                if (!range || !view) return;
                const label = this.renderMentionLabel(item);
                let data = '';
                try {
                    data = JSON.stringify(item) ?? '';
                } catch {
                    data = '';
                }
                const mentionNode = this.schema.nodes.mention.create({ label, data });
                view.dispatch(view.state.tr.delete(range.from, range.to).replaceRangeWith(range.from, range.from, mentionNode));
                view.dispatch(view.state.tr.insertText(' ', range.from + 1));
                this.dismissMentionMenu();
                view.focus();
            }
        };
    }

    private renderMentionLabel(item: unknown): string {
        const template = this.mentionConfig.template ?? this.mentionTemplate();
        if (template) return template(item);
        const data = item as any;
        return `@${data?.name ?? data?.label ?? ''}`;
    }

    registerMentionConfig(config: { handler?: ((query: string) => unknown[] | Promise<unknown[]>) | null; filterField?: string | null; template?: ((data: any) => string) | null }): void {
        this.mentionConfig = {
            handler: config.handler ?? null,
            filterField: config.filterField ?? null,
            template: config.template ?? null
        };
    }

    private effectiveMentionHandler(): ((query: string) => unknown[] | Promise<unknown[]>) | null {
        return this.mentionConfig.handler ?? this.mentionHandler();
    }

    registerTypeahead(controller: { onArrow(dir: 1 | -1): boolean; onEnter(): boolean; onEscape(): boolean }): void {
        this.typeaheadController = controller;
    }

    private handleKeyDown(event: KeyboardEvent): boolean {
        if ((this.slashSignal() || this.mentionSignal()) && this.typeaheadController) {
            if (event.key === 'ArrowDown') return this.typeaheadController.onArrow(1);
            if (event.key === 'ArrowUp') return this.typeaheadController.onArrow(-1);
            if (event.key === 'Enter') return this.typeaheadController.onEnter();
            if (event.key === 'Escape') return this.typeaheadController.onEscape();
        }
        if (event.key === 'Escape') {
            this.dismissContextToolbar();
            this.dismissTableMenus();
            this.dismissBlockMenu();
        }
        return false;
    }

    private onTypeaheadChange(slash: TypeaheadRange | null, mention: TypeaheadRange | null): void {
        const rootRect = this.hostEl.getBoundingClientRect();
        const coordsFor = (range: TypeaheadRange | null): CaretRect | null => {
            if (!range || !this.view) return null;
            try {
                const coords = this.view.coordsAtPos(range.to);
                return { top: coords.top - rootRect.top, left: coords.left - rootRect.left, bottom: coords.bottom - rootRect.top };
            } catch {
                return null;
            }
        };

        this.slashRange = slash;
        if (slash) {
            const rect = coordsFor(slash);
            this.slashSignal.set({ ...(rect ?? { top: 0, left: 0, bottom: 0 }), text: slash.text });
            this.onSlashMenuRequest.emit({ active: true, position: rect, text: slash.text });
        } else if (this.slashSignal()) {
            this.slashSignal.set(null);
            this.onSlashMenuRequest.emit({ active: false, position: null, text: '' });
        }

        this.mentionRange = mention;
        if (mention) {
            const rect = coordsFor(mention);
            const resolve = (items: unknown[]) => {
                this.mentionSignal.set({ ...(rect ?? { top: 0, left: 0, bottom: 0 }), text: mention.text, items });
                this.onMentionRequest.emit({ active: true, items, position: rect, text: mention.text });
            };
            const result = this.effectiveMentionHandler()?.(mention.text) ?? [];
            if (Array.isArray(result)) resolve(this.filterMentionItems(result, mention.text));
            else Promise.resolve(result).then((items) => resolve(this.filterMentionItems(items, mention.text)));
        } else if (this.mentionSignal()) {
            this.mentionSignal.set(null);
            this.onMentionRequest.emit({ active: false, items: [], position: null, text: '' });
        }
    }

    /**
     * Filters mention items by the configured field and filter text.
     */
    getFilteredMentionItems(items: unknown[], filterField: string, filterText: string): unknown[] {
        return this.filterMentionItems(items, filterText, filterField);
    }

    private filterMentionItems(items: unknown[], filterText: string, filterField?: string | null): unknown[] {
        const field = filterField ?? this.mentionConfig.filterField ?? this.mentionFilterField();
        if (!filterText) return items;
        const query = filterText.toLowerCase();
        return items.filter((item) => {
            const value = field ? String((item as any)?.[field] ?? '') : String((item as any)?.name ?? (item as any)?.label ?? '');
            return value.toLowerCase().includes(query);
        });
    }

    private maybeRequestContextToolbar(view: EditorView): void {
        const state = view.state;
        if (state.selection.empty || !this.parts.has('contextToolbar')) return;
        try {
            const coords = view.coordsAtPos(state.selection.head);
            const rootRect = this.hostEl.getBoundingClientRect();
            const rect = { top: coords.top - rootRect.top, left: coords.left - rootRect.left, bottom: coords.bottom - rootRect.top };
            this.contextToolbarSignal.set(rect);
            this.onContextToolbarRequest.emit(rect);
        } catch {
            /* ignore detached coords */
        }
    }

    /******************** Headings & navigator ********************/

    private syncHeadings(state: EditorState): void {
        if (!this.parts.has('navigator') && !this.navigator()) return;
        const entries: TextEditorHeadingEntry[] = [];
        state.doc.descendants((node, pos) => {
            if (node.type.name === 'heading') entries.push({ level: node.attrs.level, text: node.textContent, pos });
            return true;
        });
        this._headings.set(entries);
        this.navigatorHeadingsChange.emit(entries);
    }

    /**
     * All document headings, for the navigator minimap.
     */
    getDocumentHeadings(): TextEditorHeadingEntry[] {
        return this._headings();
    }

    navigatorSetMenuOpen(open: boolean): void {
        this.navigatorMenuOpen.set(open);
    }

    scrollToPos(pos: number): void {
        const view = this.view;
        if (!view) return;
        view.dispatch(view.state.tr.setSelection(TextSelection.near(view.state.doc.resolve(pos), 1)).scrollIntoView());
    }

    /**
     * Moves the caret to the heading at the given position.
     */
    focusHeading(pos: number): void {
        this.scrollToPos(pos);
    }

    private onBodyScroll(): void {
        this.updateActiveHeading();
    }

    private updateActiveHeading(): void {
        const view = this.view;
        if (!view) return;
        const body = this.hostEl.querySelector<HTMLElement>('.p-texteditor-body');
        if (!body) return;
        const bodyTop = body.getBoundingClientRect().top + 72;
        let active = 0;
        this._headings().forEach((heading, index) => {
            try {
                const dom = view.domAtPos(heading.pos + 1);
                const el = dom.node.nodeType === 1 ? (dom.node as HTMLElement) : (dom.node.parentElement as HTMLElement);
                if (el && el.getBoundingClientRect().top <= bodyTop) active = index;
            } catch {
                /* heading not rendered */
            }
        });
        if (active !== this.navigatorActiveIndex()) {
            this.navigatorActiveIndex.set(active);
            this.navigatorActiveIndexChange.emit(active);
        }
    }

    /******************** Tables ********************/

    private findTable(state: EditorState): { node: PMNode; pos: number } | null {
        const { $from } = state.selection;
        for (let depth = $from.depth; depth > 0; depth--) {
            const node = $from.node(depth);
            if (node.type.name === 'table') return { node, pos: $from.before(depth) };
        }
        return null;
    }

    private syncTableState(state: EditorState): void {
        const view = this.view;
        if (!view) return;
        const table = this.findTable(state);
        if (!table) {
            if (this.tableActiveSignal()) {
                this.tableActiveSignal.set(null);
                this.tableRectSignal.set(null);
                this.tableActiveStateChange.emit(null);
                this.tableOverlayRectChange.emit(null);
            }
            return;
        }
        const { $from } = state.selection;
        let rowIndex = -1;
        let colIndex = -1;
        for (let depth = 1; depth <= $from.depth; depth++) {
            const node = $from.node(depth);
            if (node.type.name === 'table_row') rowIndex = $from.index(depth);
            if (node.type.name === 'table_cell' || node.type.name === 'table_header') colIndex = $from.index(depth);
        }
        const map = TableMap.get(table.node);
        const activeState: TableActiveState = { rowIndex, colIndex, rowCount: map.height, colCount: map.width };
        this.tableActiveSignal.set(activeState);
        this.tableActiveStateChange.emit(activeState);

        const tableDom = view.nodeDOM(table.pos) as HTMLElement | null;
        if (tableDom) {
            const rootRect = this.hostEl.getBoundingClientRect();
            const rect = tableDom.getBoundingClientRect();
            const overlay: TableOverlayRect = { top: rect.top - rootRect.top, left: rect.left - rootRect.left, width: rect.width, height: rect.height };
            this.tableRectSignal.set(overlay);
            this.tableOverlayRectChange.emit(overlay);
        }
    }

    /**
     * Active table state, or null when the cursor is outside any table.
     */
    getTableActiveState(): TableActiveState | null {
        return this.tableActiveSignal();
    }

    /**
     * Geometry of the active table relative to the root, or null.
     */
    getTableOverlayRect(): TableOverlayRect | null {
        return this.tableRectSignal();
    }

    /**
     * Whether more than one table cell is selected.
     */
    getIsMultiCellSelected(): boolean {
        return this.view?.state.selection instanceof CellSelection;
    }

    /**
     * Whether the active cell is a merged cell.
     */
    getIsCellMerged(): boolean {
        const state = this.view?.state;
        if (!state) return false;
        const { $from } = state.selection;
        for (let depth = 1; depth <= $from.depth; depth++) {
            const node = $from.node(depth);
            if (node.type.name === 'table_cell' && (node.attrs.colspan > 1 || node.attrs.rowspan > 1)) return true;
        }
        return false;
    }

    readonly tableOverlayRect = () => this.tableRectSignal();
    readonly tableActiveState = () => this.tableActiveSignal();
    readonly tableColumnMenuRequest = () => this.tableColumnMenuSignal();
    readonly tableRowMenuRequest = () => this.tableRowMenuSignal();
    readonly tableCellMenuRequest = () => this.tableCellMenuSignal();

    requestTableColumnMenu(colIndex: number): void {
        const anchor = this.columnDotPosition(colIndex);
        this.dismissTableMenus('column');
        this.tableColumnMenuSignal.set({ colIndex, top: anchor?.top ?? this.tableRectSignal()?.top ?? 0, left: anchor?.left ?? this.tableRectSignal()?.left ?? 0 });
        this.onTableColumnMenuRequest.emit(colIndex);
    }

    requestTableRowMenu(rowIndex: number): void {
        const anchor = this.rowDotPosition(rowIndex);
        this.dismissTableMenus('row');
        this.tableRowMenuSignal.set({ rowIndex, top: anchor?.top ?? this.tableRectSignal()?.top ?? 0, left: anchor?.left ?? this.tableRectSignal()?.left ?? 0 });
        this.onTableRowMenuRequest.emit(rowIndex);
    }

    requestTableCellMenu(): void {
        const rect = this.tableRectSignal();
        this.dismissTableMenus('cell');
        this.tableCellMenuSignal.set({ top: rect ? rect.top + rect.height / 2 : 0, left: rect ? rect.left + rect.width / 2 : 0 });
        this.onTableCellMenuRequest.emit();
    }

    dismissTableMenus(except?: 'column' | 'row' | 'cell'): void {
        if (except !== 'column') this.tableColumnMenuSignal.set(null);
        if (except !== 'row') this.tableRowMenuSignal.set(null);
        if (except !== 'cell') this.tableCellMenuSignal.set(null);
    }

    private columnDotPosition(colIndex: number): { top: number; left: number } | null {
        return this.cellDotPosition(0, colIndex);
    }

    private rowDotPosition(rowIndex: number): { top: number; left: number } | null {
        return this.cellDotPosition(rowIndex, 0);
    }

    private cellDotPosition(row: number, col: number): { top: number; left: number } | null {
        const table = this.view ? this.findTable(this.view.state) : null;
        const tableDom = table ? (this.view!.nodeDOM(table.pos) as HTMLTableElement | null) : null;
        if (!tableDom) return null;
        const rowEl = tableDom.rows[Math.min(row, tableDom.rows.length - 1)];
        const cellEl = rowEl?.cells[Math.min(col, rowEl.cells.length - 1)];
        if (!cellEl) return null;
        const rootRect = this.hostEl.getBoundingClientRect();
        const cellRect = cellEl.getBoundingClientRect();
        return { top: cellRect.top - rootRect.top, left: cellRect.left - rootRect.left };
    }

    tableColumnCommands(colIndex: number): TextEditorTableColumnCommands {
        return {
            insertBefore: () => {
                this.selectColumn(colIndex);
                this.runCommand(addColumnBefore);
                this.dismissTableMenus();
                this.view?.focus();
            },
            insertAfter: () => {
                this.selectColumn(colIndex);
                this.runCommand(addColumnAfter);
                this.dismissTableMenus();
                this.view?.focus();
            },
            delete: () => {
                this.selectColumn(colIndex);
                this.runCommand(deleteColumn);
                this.dismissTableMenus();
                this.view?.focus();
            },
            align: (alignment) => this.alignColumn(colIndex, alignment)
        };
    }

    tableRowCommands(rowIndex: number): TextEditorTableRowCommands {
        return {
            insertBefore: () => {
                this.selectRow(rowIndex);
                this.runCommand(addRowBefore);
                this.dismissTableMenus();
                this.view?.focus();
            },
            insertAfter: () => {
                this.selectRow(rowIndex);
                this.runCommand(addRowAfter);
                this.dismissTableMenus();
                this.view?.focus();
            },
            delete: () => {
                this.selectRow(rowIndex);
                this.runCommand(deleteRow);
                this.dismissTableMenus();
                this.view?.focus();
            }
        };
    }

    tableCellCommands(): TextEditorTableCellCommands {
        return {
            merge: () => this.runTableCommand(mergeCells),
            split: () => this.runTableCommand(splitCell),
            clear: () => this.clearSelectedCells(),
            deleteTable: () => this.runTableCommand(deleteTable)
        };
    }

    private runTableCommand(command: (state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView) => boolean): void {
        this.runCommand(command);
        this.dismissTableMenus();
        this.view?.focus();
    }

    private selectColumn(colIndex: number): void {
        const view = this.view;
        const table = view ? this.findTable(view.state) : null;
        if (!view || !table) return;
        const map = TableMap.get(table.node);
        const anchor = view.state.doc.resolve(table.pos + 1 + map.positionAt(0, colIndex, table.node));
        const head = view.state.doc.resolve(table.pos + 1 + map.positionAt(map.height - 1, colIndex, table.node));
        view.dispatch(view.state.tr.setSelection(CellSelection.colSelection(anchor, head) as Selection));
    }

    private selectRow(rowIndex: number): void {
        const view = this.view;
        const table = view ? this.findTable(view.state) : null;
        if (!view || !table) return;
        const map = TableMap.get(table.node);
        const anchor = view.state.doc.resolve(table.pos + 1 + map.positionAt(rowIndex, 0, table.node));
        const head = view.state.doc.resolve(table.pos + 1 + map.positionAt(rowIndex, map.width - 1, table.node));
        view.dispatch(view.state.tr.setSelection(CellSelection.rowSelection(anchor, head) as Selection));
    }

    private alignColumn(colIndex: number, alignment: string): void {
        const view = this.view;
        const table = view ? this.findTable(view.state) : null;
        if (!view || !table) return;
        const map = TableMap.get(table.node);
        let tr = view.state.tr;
        for (let row = 0; row < map.height; row++) {
            const pos = table.pos + 1 + map.positionAt(row, colIndex, table.node);
            const cell = tr.doc.nodeAt(pos);
            if (cell) tr = tr.setNodeMarkup(pos, undefined, { ...cell.attrs, align: alignment });
        }
        view.dispatch(tr);
        this.dismissTableMenus();
        view.focus();
    }

    private clearSelectedCells(): void {
        const view = this.view;
        if (!view) return;
        const selection = view.state.selection;
        let tr = view.state.tr;
        const clearCell = (pos: number) => {
            const cell = tr.doc.nodeAt(pos);
            if (cell) tr = tr.replaceWith(pos + 1, pos + cell.nodeSize - 1, this.schema.nodes.paragraph.create());
        };
        if (selection instanceof CellSelection) {
            selection.forEachCell((cell, pos) => clearCell(pos));
        } else {
            const table = this.findTable(view.state);
            if (table) {
                const map = TableMap.get(table.node);
                const active = this.tableActiveSignal();
                const cellPos = table.pos + 1 + map.positionAt(Math.max(0, active?.rowIndex ?? 0), Math.max(0, active?.colIndex ?? 0), table.node);
                clearCell(cellPos);
            }
        }
        view.dispatch(tr);
        this.dismissTableMenus();
        view.focus();
    }

    /**
     * Adds table rows through the floating controls.
     */
    addTableRows(count: number, position: 'start' | 'end' | 'near'): void {
        for (let i = 0; i < count; i++) this.runCommand(position === 'start' ? addRowBefore : addRowAfter);
    }

    /**
     * Adds table columns through the floating controls.
     */
    addTableColumns(count: number, position: 'start' | 'end' | 'near'): void {
        for (let i = 0; i < count; i++) this.runCommand(position === 'start' ? addColumnBefore : addColumnAfter);
    }

    /**
     * Recomputes and emits the table overlay geometry.
     */
    updateTableOverlayRect(): void {
        if (this.view) this.syncTableState(this.view.state);
    }

    /******************** Block mode ********************/

    readonly blockHover = () => this.blockHoverSignal();
    readonly blockMenuRequest = () => this.blockMenuSignal();
    readonly isBlockMode = () => this.mode() === 'block';

    /**
     * The root host element; parts use it to convert viewport coordinates.
     */
    rootElement(): HTMLElement {
        return this.hostEl;
    }

    private topLevelBlocks(): { node: PMNode; pos: number }[] {
        const blocks: { node: PMNode; pos: number }[] = [];
        const doc = this.view?.state.doc ?? this.schema.topNodeType.create(null, this.schema.nodes.paragraph.create());
        let pos = 0;
        doc.forEach((node) => {
            blocks.push({ node, pos });
            pos += node.nodeSize;
        });
        return blocks;
    }

    private updateBlockHover(view: EditorView, event: MouseEvent): void {
        const coords = view.posAtCoords({ left: event.clientX, top: event.clientY });
        if (!coords) return;
        const $pos = view.state.doc.resolve(coords.pos);
        if ($pos.depth === 0) {
            if (this.blockHoverSignal()) {
                this.blockHoverSignal.set(null);
                this.blockHoverChange.emit({ element: null, index: -1 });
            }
            return;
        }
        const index = $pos.index(0);
        const blockPos = $pos.before(1);
        const element = (view.nodeDOM(blockPos) as HTMLElement) ?? null;
        const current = this.blockHoverSignal();
        if (!current || current.index !== index || current.element !== element) {
            this.blockHoverSignal.set({ element, index });
            this.blockHoverChange.emit({ element, index });
        }
    }

    /**
     * Inserts a new empty block after `index` (block mode).
     */
    addBlockAfter(index: number): void {
        const view = this.view;
        if (!view) return;
        const blocks = this.topLevelBlocks();
        const target = blocks[Math.min(Math.max(index, -1), blocks.length - 1)];
        const insertPos = target ? target.pos + target.node.nodeSize : 0;
        const paragraph = this.schema.nodes.paragraph.create();
        view.dispatch(view.state.tr.insert(insertPos, paragraph));
        view.dispatch(view.state.tr.setSelection(TextSelection.near(view.state.doc.resolve(insertPos + 1))));
        view.focus();
    }

    /**
     * Moves a block, reordering the document (block mode).
     */
    moveBlock(from: number, to: number): void {
        const view = this.view;
        if (!view || from === to) return;
        const blocks = this.topLevelBlocks();
        if (from < 0 || from >= blocks.length) return;
        const reordered = blocks.map((b) => b.node);
        const [moved] = reordered.splice(from, 1);
        reordered.splice(Math.min(to, reordered.length), 0, moved);
        view.dispatch(view.state.tr.replaceWith(0, view.state.doc.content.size, Fragment.fromArray(reordered)));
        view.focus();
    }

    /**
     * Block type name of the top-level block at `index`, e.g. `'paragraph'`.
     */
    getBlockType(index: number): string {
        return this.topLevelBlocks()[index]?.node.type.name ?? 'paragraph';
    }

    startBlockDrag(index: number, event: DragEvent): void {
        this.draggingBlockIndex = index;
        event.dataTransfer?.setData('text/plain', `texteditor-block:${index}`);
        this.blockDragStart.emit(index);
    }

    endBlockDrag(): void {
        this.draggingBlockIndex = null;
        this.blockDropIndex.set(null);
        this.blockDragEnd.emit();
    }

    private onBodyDragOver(event: DragEvent): void {
        const hasFiles = event.dataTransfer?.types?.includes('Files');
        if (this.draggingBlockIndex === null && !hasFiles) return;
        event.preventDefault();
        if (this.draggingBlockIndex === null || !this.view) return;
        const coords = this.view.posAtCoords({ left: event.clientX, top: event.clientY });
        if (!coords) return;
        const $pos = this.view.state.doc.resolve(coords.pos);
        const index = $pos.depth === 0 ? $pos.index(0) : $pos.index(0) + 1;
        this.blockDropIndex.set(index);
        const blocks = this.topLevelBlocks();
        const target = blocks[Math.min(index, blocks.length - 1)];
        if (target) {
            const dom = this.view.nodeDOM(target.pos) as HTMLElement | null;
            const body = this.hostEl.querySelector('.p-texteditor-body') as HTMLElement | null;
            if (dom && body) this.blockDropIndicatorTop.set(dom.getBoundingClientRect().top - body.getBoundingClientRect().top);
        }
    }

    private onBodyDragLeave(): void {
        if (this.draggingBlockIndex !== null) this.blockDropIndex.set(null);
    }

    onBodyDrop(event: DragEvent): void {
        const files = Array.from(event.dataTransfer?.files ?? []);
        if (files.length) {
            event.preventDefault();
            const images = files.filter((file) => file.type.startsWith('image/'));
            const documents = files.filter((file) => !file.type.startsWith('image/'));
            if (images.length) this.startUploads('image', images);
            if (documents.length) this.startUploads('document', documents);
            return;
        }
        if (this.draggingBlockIndex !== null) {
            event.preventDefault();
            const to = this.blockDropIndex();
            if (to !== null) this.moveBlock(this.draggingBlockIndex, to);
            this.endBlockDrag();
        }
    }

    requestBlockMenu(index: number, anchor: { top: number; left: number }): void {
        this.blockMenuSignal.set({ index, top: anchor.top, left: anchor.left });
    }

    dismissBlockMenu(): void {
        this.blockMenuSignal.set(null);
    }

    blockCommands(index: number): TextEditorBlockMenuCommands {
        return {
            duplicate: () => this.duplicateBlock(index),
            copyToClipboard: () => this.copyBlock(index),
            deleteBlock: () => this.deleteBlock(index),
            turnInto: (level) => this.turnBlockInto(index, level)
        };
    }

    /**
     * Command set for the block handle menu at `blockIndex`.
     */
    getBlockMenuCommands(blockIndex: number): TextEditorBlockMenuCommands {
        return this.blockCommands(blockIndex);
    }

    private duplicateBlock(index: number): void {
        const view = this.view;
        if (!view) return;
        const target = this.topLevelBlocks()[index];
        if (!target) return;
        view.dispatch(view.state.tr.insert(target.pos + target.node.nodeSize, target.node.copy(target.node.content)));
        this.dismissBlockMenu();
    }

    private copyBlock(index: number): void {
        const target = this.topLevelBlocks()[index];
        if (!target) return;
        navigator.clipboard?.writeText(serializeHtml(this.schema, target.node));
        this.dismissBlockMenu();
    }

    private deleteBlock(index: number): void {
        const view = this.view;
        if (!view) return;
        const target = this.topLevelBlocks()[index];
        if (!target) return;
        view.dispatch(view.state.tr.delete(target.pos, target.pos + target.node.nodeSize));
        this.dismissBlockMenu();
    }

    private turnBlockInto(index: number, level: number): void {
        const view = this.view;
        if (!view) return;
        const target = this.topLevelBlocks()[index];
        if (!target) return;
        if (level > 0) view.dispatch(view.state.tr.setNodeMarkup(target.pos, this.schema.nodes.heading, { level }));
        else view.dispatch(view.state.tr.setNodeMarkup(target.pos, this.schema.nodes.paragraph));
        this.dismissBlockMenu();
    }

    /******************** Uploads ********************/

    registerUploadConfig(kind: 'image' | 'document', config: UploadConfig): void {
        this.uploadConfigs[kind] = config;
    }

    readonly uploadEntries = (kind: 'image' | 'document') => (kind === 'image' ? this.imageUploadEntries() : this.documentUploadEntries());

    private effectiveUploadConfig(kind: 'image' | 'document'): UploadConfig {
        return {
            handler: (kind === 'image' ? this.imageUploadHandler() : this.documentUploadHandler()) ?? this.uploadHandler() ?? undefined,
            maxFileCount: kind === 'image' ? this.imageMaxFileCount() : this.documentMaxFileCount(),
            maxFileSize: kind === 'image' ? this.imageMaxFileSize() : this.documentMaxFileSize(),
            allowedTypes: this.uploadConfigs[kind].allowedTypes ?? (kind === 'image' ? this.allowedImageTypes() : this.allowedDocumentTypes()),
            ...this.uploadConfigs[kind]
        };
    }

    effectiveAllowedTypes(kind: 'image' | 'document'): string {
        return this.effectiveUploadConfig(kind).allowedTypes ?? '';
    }

    openUploadPicker(kind: 'image' | 'document'): void {
        const picker = kind === 'image' ? this.imagePicker?.nativeElement : this.documentPicker?.nativeElement;
        picker?.click();
        if (kind === 'image') this.onImageUploadRequest.emit();
        else this.onDocumentUploadRequest.emit();
    }

    private onPickerChange(kind: 'image' | 'document', event: Event): void {
        const input = event.target as HTMLInputElement;
        const files = Array.from(input.files ?? []);
        input.value = '';
        if (files.length) this.startUploads(kind, files);
    }

    /**
     * Filters out files failing image validation (count, size, type).
     */
    validateImageFiles(files: File[]): File[] {
        return this.validateFiles('image', files);
    }

    /**
     * Filters out files failing document validation (count, size, type).
     */
    validateDocumentFiles(files: File[]): File[] {
        return this.validateFiles('document', files);
    }

    private validateFiles(kind: 'image' | 'document', files: File[]): File[] {
        const config = this.effectiveUploadConfig(kind);
        const accepted: File[] = [];
        const rejectedByType: File[] = [];
        const rejectedBySize: File[] = [];
        let rejectedByCount = 0;
        for (const file of files) {
            if (config.allowedTypes && !this.matchesAllowedTypes(file, config.allowedTypes)) rejectedByType.push(file);
            else if (config.maxFileSize && file.size > config.maxFileSize) rejectedBySize.push(file);
            else if (config.maxFileCount && accepted.length >= config.maxFileCount) rejectedByCount++;
            else accepted.push(file);
        }
        if (rejectedByType.length) this.emitUploadReject(kind, rejectedByType, 'file-type');
        if (rejectedBySize.length) this.emitUploadReject(kind, rejectedBySize, 'max-file-size');
        if (rejectedByCount > 0) this.emitUploadReject(kind, files, 'max-file-count');
        return accepted;
    }

    private matchesAllowedTypes(file: File, allowedTypes: string): boolean {
        return allowedTypes
            .split(',')
            .map((t) => t.trim())
            .some((type) => {
                if (type.endsWith('/*')) return file.type.startsWith(type.slice(0, -1));
                if (type.startsWith('.')) return file.name.toLowerCase().endsWith(type.toLowerCase());
                return file.type === type;
            });
    }

    private uploadRejectHandlers: Record<'image' | 'document', ((event: { files: File[]; reason: TextEditorRejectReason }) => void) | null> = { image: null, document: null };

    registerUploadRejectHandler(kind: 'image' | 'document', handler: (event: { files: File[]; reason: TextEditorRejectReason }) => void): void {
        this.uploadRejectHandlers[kind] = handler;
    }

    emitUploadReject(kind: 'image' | 'document', files: File[], reason: TextEditorRejectReason): void {
        if (kind === 'image') this.onImageReject.emit({ files, reason });
        else this.onDocumentReject.emit({ files, reason });
        this.uploadRejectHandlers[kind]?.({ files, reason });
    }

    /**
     * Starts image uploads, inserting upload placeholders first.
     */
    startImageUploads(files: File[]): void {
        this.startUploads('image', files);
    }

    /**
     * Starts document uploads; each finished file is inserted as a link.
     */
    startDocumentUploads(files: File[]): void {
        this.startUploads('document', files);
    }

    startUploads(kind: 'image' | 'document', files: File[]): void {
        const config = this.effectiveUploadConfig(kind);
        const handler = config.handler;
        if (!handler) return;
        const accepted = this.validateFiles(kind, files);
        if (!accepted.length) return;

        for (const file of accepted) {
            const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
            const entry: UploadSlotEntry = { id, fileName: file.name, progress: 0 };
            const entriesSignal = kind === 'image' ? this.imageUploadEntries : this.documentUploadEntries;
            entriesSignal.update((entries) => [...entries, entry]);
            this.emitUploadEntries(kind);

            if (kind === 'image') this.insertUploadPlaceholder(id);

            const controller = new AbortController();
            this.uploadAbortControllers.set(id, controller);

            const updateProgress = (percent: number) => {
                entriesSignal.update((entries) => entries.map((e) => (e.id === id ? { ...e, progress: Math.min(100, Math.round(percent)) } : e)));
                this.emitUploadEntries(kind);
            };

            handler(file, { onProgress: updateProgress, signal: controller.signal })
                .then((url) => {
                    const safe = safeUrl(url, kind === 'image' ? 'image' : 'link');
                    if (kind === 'image') this.completeImageUpload(id, safe ?? '');
                    else this.completeDocumentUpload(file.name, safe);
                })
                .catch((error) => {
                    if (kind === 'image') {
                        this.removeImagePlaceholder(id);
                        this.onImageUploadError.emit({ file, error });
                    } else {
                        this.onDocumentUploadError.emit({ file, error });
                    }
                })
                .finally(() => {
                    this.uploadAbortControllers.delete(id);
                    entriesSignal.update((entries) => entries.filter((e) => e.id !== id));
                    this.emitUploadEntries(kind);
                    if (entriesSignal().length === 0) {
                        if (kind === 'image') this.onImageUploadComplete.emit();
                        else this.onDocumentUploadComplete.emit();
                    }
                });
        }
    }

    private emitUploadEntries(kind: 'image' | 'document'): void {
        if (kind === 'image') this.onImageUploadStateChange.emit(this.imageUploadEntries());
        else this.onDocumentUploadStateChange.emit(this.documentUploadEntries());
    }

    private insertUploadPlaceholder(id: string): void {
        const view = this.view;
        if (!view) return;
        const placeholder = this.schema.nodes.image.create({ src: TRANSPARENT_PIXEL, alt: 'Uploading…', uploadId: id });
        view.dispatch(view.state.tr.replaceSelectionWith(placeholder));
    }

    private completeImageUpload(id: string, url: string): void {
        const view = this.view;
        if (!view) return;
        view.state.doc.descendants((node, pos) => {
            if (node.type.name === 'image' && node.attrs.uploadId === id) {
                view.dispatch(view.state.tr.setNodeMarkup(pos, undefined, { ...node.attrs, src: url, uploadId: null, alt: node.attrs.alt === 'Uploading…' ? null : node.attrs.alt }));
                return false;
            }
            return true;
        });
    }

    private removeImagePlaceholder(id: string): void {
        const view = this.view;
        if (!view) return;
        view.state.doc.descendants((node, pos) => {
            if (node.type.name === 'image' && node.attrs.uploadId === id) {
                view.dispatch(view.state.tr.delete(pos, pos + node.nodeSize));
                return false;
            }
            return true;
        });
    }

    private completeDocumentUpload(fileName: string, url: string | null): void {
        const view = this.view;
        if (!view || !url) return;
        const linkMark = this.schema.marks.link.create({ href: url });
        const insertion = view.state.selection.to;
        view.dispatch(view.state.tr.insertText(fileName, insertion, insertion).addMark(insertion, insertion + fileName.length, linkMark));
    }

    /**
     * Cancels in-progress image uploads and clears the upload UI.
     */
    dismissImageUpload(): void {
        this.dismissUpload('image');
    }

    /**
     * Cancels in-progress document uploads and clears the upload UI.
     */
    dismissDocumentUpload(): void {
        this.dismissUpload('document');
    }

    dismissUpload(kind: 'image' | 'document'): void {
        const entriesSignal = kind === 'image' ? this.imageUploadEntries : this.documentUploadEntries;
        for (const [id, controller] of this.uploadAbortControllers) {
            if (entriesSignal().some((e) => e.id === id)) {
                controller.abort();
                this.uploadAbortControllers.delete(id);
            }
        }
        entriesSignal.set([]);
        this.emitUploadEntries(kind);
    }

    private abortAllUploads(): void {
        for (const controller of this.uploadAbortControllers.values()) controller.abort();
        this.uploadAbortControllers.clear();
    }

    /******************** Plugin installation ********************/

    private installPlugins(): void {
        for (const entry of this.plugins() ?? []) {
            const { definition, options } = resolvePluginEntry(entry);
            const cleanups: (() => void)[] = [];
            const context = {
                options,
                getSelectedText: () => this.getSelectedText(),
                replaceSelection: (content: string, asHtml?: boolean) => this.replaceSelection(content, asHtml),
                getEditorElement: () => this.getEditorElement(),
                getView: () => this.view,
                getState: () => this.view?.state ?? null,
                registerProseMirrorPlugin: (plugin: unknown) => this.registerProseMirrorPlugin(plugin as Plugin),
                runCommand: (command: any) => this.runCommand(command),
                onUnmounted: (fn: () => void) => cleanups.push(fn)
            };
            const contributed = definition.install(context as any);
            this.pluginCleanups.push(() => cleanups.forEach((fn) => fn()));
            if (contributed?.commands) {
                this.installedPluginCommands[definition.name] = contributed.commands as Record<string, (...args: any[]) => any>;
            }
        }
        this._pluginCommands.set({ ...this.installedPluginCommands });
    }

    private runPluginCleanups(): void {
        this.pluginCleanups.forEach((fn) => {
            try {
                fn();
            } catch {
                /* noop */
            }
        });
        this.pluginCleanups = [];
    }

    /******************** ControlValueAccessor ********************/

    writeValue(value: any): void {
        if (value !== undefined && value !== this.lastEmitted) {
            this.applyValue(value);
            this.lastEmitted = value;
        }
    }

    registerOnChange(fn: (value: any) => void): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onModelTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.cvaDisabled.set(isDisabled);
    }
}
