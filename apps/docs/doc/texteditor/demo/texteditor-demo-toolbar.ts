import { ChangeDetectionStrategy, Component, HostListener, input, signal, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from '@bdspark/sparkng/colorpicker';
import { TextEditorToolbar, TextEditorToolbarDef } from '@bdspark/sparkng/texteditor';
import type { TextEditorCommands, TextEditorTextAlign } from '@bdspark/sparkng/types/texteditor';

/**
 * Thin-line toolbar icon set rendered inline so the demo stays dependency free.
 */
@Component({
    selector: 'te-icon',
    standalone: true,
    template: `
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" [attr.data-icon]="name()">
            @switch (name()) {
                @case ('quote') {
                    <path d="M10 11H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6a4 4 0 0 1-4 4" />
                    <path d="M20 11h-4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6a4 4 0 0 1-4 4" />
                }
                @case ('list') {
                    <line x1="8.5" y1="6" x2="21" y2="6" />
                    <line x1="8.5" y1="12" x2="21" y2="12" />
                    <line x1="8.5" y1="18" x2="21" y2="18" />
                    <circle cx="4" cy="6" r="1" fill="currentColor" stroke="none" />
                    <circle cx="4" cy="12" r="1" fill="currentColor" stroke="none" />
                    <circle cx="4" cy="18" r="1" fill="currentColor" stroke="none" />
                }
                @case ('list-ordered') {
                    <line x1="10" y1="6" x2="21" y2="6" />
                    <line x1="10" y1="12" x2="21" y2="12" />
                    <line x1="10" y1="18" x2="21" y2="18" />
                    <path d="M4 6h1v4" />
                    <path d="M4 10h2" />
                    <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                }
                @case ('list-checks') {
                    <path d="m3 17 2 2 4-4" />
                    <path d="m3 7 2 2 4-4" />
                    <path d="M13 6h8" />
                    <path d="M13 12h8" />
                    <path d="M13 18h8" />
                }
                @case ('link') {
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                }
                @case ('image') {
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                }
                @case ('upload') {
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                }
                @case ('printer') {
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect x="6" y="14" width="12" height="8" rx="1" />
                }
                @case ('minus') {
                    <line x1="5" y1="12" x2="19" y2="12" />
                }
                @case ('table') {
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M3 15h18" />
                    <path d="M9 3v18" />
                    <path d="M15 3v18" />
                }
                @case ('outdent') {
                    <polyline points="7 8 3 12 7 16" />
                    <line x1="3" y1="12" x2="13" y2="12" />
                    <line x1="17" y1="5" x2="21" y2="5" />
                    <line x1="17" y1="12" x2="21" y2="12" />
                    <line x1="17" y1="19" x2="21" y2="19" />
                }
                @case ('indent') {
                    <polyline points="9 8 13 12 9 16" />
                    <line x1="3" y1="12" x2="13" y2="12" />
                    <line x1="17" y1="5" x2="21" y2="5" />
                    <line x1="17" y1="12" x2="21" y2="12" />
                    <line x1="17" y1="19" x2="21" y2="19" />
                }
                @case ('undo') {
                    <path d="M9 14 4 9l5-5" />
                    <path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11" />
                }
                @case ('redo') {
                    <path d="m15 14 5-5-5-5" />
                    <path d="M20 9H9.5a5.5 5.5 0 0 0 0 11H13" />
                }
                @case ('highlighter') {
                    <path d="m9 11-6 6v3h9l3-3" />
                    <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />
                }
                @case ('align-left') {
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="15" y2="12" />
                    <line x1="3" y1="18" x2="18" y2="18" />
                }
                @case ('align-center') {
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="6" y1="12" x2="18" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                }
                @case ('align-right') {
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="9" y1="12" x2="21" y2="12" />
                    <line x1="6" y1="18" x2="21" y2="18" />
                }
                @case ('align-justify') {
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                }
                @case ('caret') {
                    <path d="m6 9 6 6 6-6" />
                }
            }
        </svg>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeIcon {
    readonly name = input.required<string>();
}

/**
 * Docs-only reference toolbar rendering every built-in command group with the
 * thin-line icon set. It is the SparkNG counterpart of PrimeUI's copied-in
 * `<toolbar-ui />` widget set and shows the canonical `commands.*` / `state.*`
 * binding pattern, including ColorPicker-driven text & background colors and a
 * dropdown alignment control.
 */
@Component({
    selector: 'texteditor-demo-toolbar',
    standalone: true,
    imports: [FormsModule, ColorPickerModule, TextEditorToolbar, TextEditorToolbarDef, TeIcon],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <p-texteditor-toolbar>
            <ng-template pTexteditorToolbarDef let-commands="commands" let-state="state">
                <select class="te-select te-heading" [value]="state.heading ?? ''" (change)="onHeading($event, commands)" aria-label="Block type">
                    <option value="">Paragraph</option>
                    @for (level of headingLevels; track level) {
                        <option [value]="level">Heading {{ level }}</option>
                    }
                </select>
                <button type="button" class="te-mark" (click)="commands.bold()" [attr.aria-pressed]="state.bold" aria-label="Bold"><strong>B</strong></button>
                <button type="button" class="te-mark" (click)="commands.italic()" [attr.aria-pressed]="state.italic" aria-label="Italic"><em>I</em></button>
                <button type="button" class="te-mark" (click)="commands.underline()" [attr.aria-pressed]="state.underline" aria-label="Underline"><u>U</u></button>
                <button type="button" class="te-mark" (click)="commands.strikethrough()" [attr.aria-pressed]="state.strikethrough" aria-label="Strikethrough"><s>S</s></button>
                <button type="button" (click)="commands.superscript()" [attr.aria-pressed]="state.superscript" aria-label="Superscript"><span class="te-x2">x²</span></button>
                <button type="button" (click)="commands.subscript()" [attr.aria-pressed]="state.subscript" aria-label="Subscript"><span class="te-x2">x₂</span></button>
                <button type="button" (click)="commands.code()" [attr.aria-pressed]="state.code" aria-label="Inline code"><span class="te-mono">&lt;/&gt;</span></button>
                <button type="button" (click)="commands.blockquote()" [attr.aria-pressed]="state.blockquote" aria-label="Blockquote"><te-icon name="quote" /></button>
                <select class="te-select te-font" [value]="state.fontFamily ?? ''" (change)="commands.fontFamily($any($event.target).value)" aria-label="Font family">
                    @for (font of fontFamilies; track font.value) {
                        <option [value]="font.value" [style.fontFamily]="font.value || null">{{ font.label }}</option>
                    }
                </select>
                <select class="te-select te-size" [value]="state.fontSize ?? ''" (change)="commands.fontSize($any($event.target).value)" aria-label="Font size">
                    @for (size of fontSizes; track size.value) {
                        <option [value]="size.value">{{ size.label }}</option>
                    }
                </select>
                <span class="te-pop" (click)="$event.stopPropagation()">
                    <button type="button" class="te-trigger" (click)="textPickerOpen.set(!textPickerOpen())" [attr.aria-expanded]="textPickerOpen()" aria-label="Text color" title="Text color">
                        <span class="te-color-a" [style.borderBottomColor]="state.foregroundColor ?? textColor()">A</span>
                        <te-icon name="caret" [class.te-caret-active]="textPickerOpen()" />
                    </button>
                    @if (textPickerOpen()) {
                        <div class="te-popover" role="dialog" aria-label="Pick text color">
                            <p-colorpicker [ngModel]="textColor()" (ngModelChange)="applyTextColor($event, commands)" [inline]="true" format="hex" />
                            <button type="button" class="te-popover-clear" (click)="commands.clearFormatting(); textPickerOpen.set(false)">Clear styles</button>
                        </div>
                    }
                </span>
                <span class="te-pop" (click)="$event.stopPropagation()">
                    <button type="button" class="te-trigger" (click)="bgPickerOpen.set(!bgPickerOpen())" [attr.aria-expanded]="bgPickerOpen()" aria-label="Background color" title="Background color">
                        <span class="te-hl-dot" [style.background]="state.backgroundColor ?? bgColor()"><te-icon name="highlighter" /></span>
                        <te-icon name="caret" [class.te-caret-active]="bgPickerOpen()" />
                    </button>
                    @if (bgPickerOpen()) {
                        <div class="te-popover" role="dialog" aria-label="Pick background color">
                            <p-colorpicker [ngModel]="bgColor()" (ngModelChange)="applyBackgroundColor($event, commands)" [inline]="true" format="hex" />
                            <button type="button" class="te-popover-clear" (click)="commands.clearFormatting(); bgPickerOpen.set(false)">Clear styles</button>
                        </div>
                    }
                </span>
                <button type="button" (click)="commands.undo()" [disabled]="!state.canUndo" aria-label="Undo"><te-icon name="undo" /></button>
                <button type="button" (click)="commands.redo()" [disabled]="!state.canRedo" aria-label="Redo"><te-icon name="redo" /></button>
                <button type="button" (click)="commands.clearFormatting()" aria-label="Clear formatting" title="Clear formatting">
                    <span class="te-tx">T<span>x</span></span>
                </button>
                <button type="button" (click)="commands.bulletList()" [attr.aria-pressed]="state.bulletList" aria-label="Bullet list"><te-icon name="list" /></button>
                <button type="button" (click)="commands.orderedList()" [attr.aria-pressed]="state.orderedList" aria-label="Ordered list"><te-icon name="list-ordered" /></button>
                <button type="button" (click)="commands.checkList()" [attr.aria-pressed]="state.checkList" aria-label="Checklist"><te-icon name="list-checks" /></button>
                <span class="te-pop" (click)="$event.stopPropagation()">
                    <button type="button" class="te-trigger" (click)="alignOpen.set(!alignOpen())" [attr.aria-expanded]="alignOpen()" aria-label="Text align" title="Text align">
                        <te-icon [name]="alignIconName(state)" />
                        <te-icon name="caret" [class.te-caret-active]="alignOpen()" />
                    </button>
                    @if (alignOpen()) {
                        <div class="te-dd-menu" role="menu" aria-label="Align options">
                            @for (option of alignOptions; track option.value) {
                                <button
                                    type="button"
                                    role="menuitemradio"
                                    [attr.aria-checked]="(state.textAlign ?? 'left') === option.value"
                                    [class.te-dd-active]="(state.textAlign ?? 'left') === option.value"
                                    (click)="commands.textAlign(option.value); alignOpen.set(false)"
                                >
                                    <te-icon [name]="'align-' + option.value" />
                                    <span>{{ option.label }}</span>
                                </button>
                            }
                        </div>
                    }
                </span>
                <button type="button" (click)="onAddLink(commands)" aria-label="Insert link"><te-icon name="link" /></button>
                <button type="button" (click)="onAddImage(commands)" aria-label="Insert image by URL"><te-icon name="image" /></button>
                <input #imageFile type="file" accept="image/*" hidden (change)="onImageFile($event, commands)" />
                <button type="button" (click)="imageFile.click()" aria-label="Upload image"><te-icon name="upload" /></button>
                <button type="button" (click)="commands.print()" aria-label="Print"><te-icon name="printer" /></button>
                <button type="button" (click)="commands.insertHorizontalRule()" aria-label="Divider"><te-icon name="minus" /></button>
                <button type="button" (click)="commands.table(3, 3)" aria-label="Insert table"><te-icon name="table" /></button>
                <button type="button" (click)="commands.outdent()" aria-label="Outdent"><te-icon name="outdent" /></button>
                <button type="button" (click)="commands.indent()" aria-label="Indent"><te-icon name="indent" /></button>
                <button type="button" (click)="commands.codeBlock()" [attr.aria-pressed]="state.codeBlock" aria-label="Code block">
                    <span class="te-mono">{{ '{ }' }}</span>
                </button>
            </ng-template>
        </p-texteditor-toolbar>
    `,
    styles: [
        `
            texteditor-demo-toolbar .te-mark {
                font-size: 0.9375rem;
                min-width: 1.75rem;
            }
            .p-texteditor-toolbar .te-x2 {
                font-size: 0.8125rem;
                letter-spacing: -0.02em;
            }
            .p-texteditor-toolbar .te-mono {
                font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
                font-size: 0.75rem;
            }
            .p-texteditor-toolbar .te-tx {
                font-weight: 700;
                font-size: 0.9375rem;
                line-height: 1;
            }
            .p-texteditor-toolbar .te-tx span {
                font-weight: 400;
                font-size: 0.6875rem;
                margin-left: -0.0625rem;
            }
            .p-texteditor-toolbar select.te-heading {
                min-width: 7.25rem;
            }
            .p-texteditor-toolbar select.te-font {
                min-width: 7.5rem;
            }
            .p-texteditor-toolbar select.te-size {
                min-width: 4.25rem;
            }
            .p-texteditor-toolbar .te-trigger {
                display: inline-flex;
                align-items: center;
                gap: 0.0625rem;
            }
            .p-texteditor-toolbar .te-color-a {
                font-weight: 700;
                font-size: 0.9375rem;
                line-height: 1.1;
                border-bottom: 3px solid #111827;
                padding: 0 0.0625rem;
            }
            .p-texteditor-toolbar .te-hl-dot {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                padding: 0.1875rem;
                background: transparent;
            }
            .p-texteditor-toolbar .te-pop {
                position: relative;
                display: inline-flex;
            }
            .p-texteditor-toolbar .te-caret-active {
                color: var(--p-primary-color, #3b82f6);
            }
            .p-texteditor-toolbar .te-popover {
                position: absolute;
                top: calc(100% + 0.375rem);
                left: 0;
                z-index: 40;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                padding: 0.75rem;
                background: var(--p-texteditor-toolbar-bg, #fff);
                border: 1px solid var(--p-content-border-color, #e2e8f0);
                border-radius: 0.5rem;
                box-shadow: 0 10px 30px -12px rgb(2 6 23 / 0.25);
            }
            .p-texteditor-toolbar .te-popover .p-colorpicker {
                width: auto;
            }
            .p-texteditor-toolbar .te-popover-clear {
                width: 100%;
                font-size: 0.75rem;
                padding: 0.25rem 0.5rem;
            }
            .p-texteditor-toolbar .te-dd-menu {
                position: absolute;
                top: calc(100% + 0.375rem);
                left: 0;
                z-index: 40;
                display: flex;
                flex-direction: column;
                min-width: 9rem;
                padding: 0.25rem;
                background: var(--p-texteditor-toolbar-bg, #fff);
                border: 1px solid var(--p-content-border-color, #e2e8f0);
                border-radius: 0.5rem;
                box-shadow: 0 10px 30px -12px rgb(2 6 23 / 0.25);
            }
            .p-texteditor-toolbar .te-dd-menu button {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                width: 100%;
                justify-content: flex-start;
                padding: 0.4375rem 0.5rem;
                border: 0;
                background: transparent;
                font-size: 0.8125rem;
            }
            .p-texteditor-toolbar .te-dd-menu button:hover {
                background: color-mix(in srgb, var(--p-primary-color, #3b82f6) 10%, transparent);
            }
            .p-texteditor-toolbar .te-dd-menu button.te-dd-active {
                color: var(--p-primary-color, #3b82f6);
                background: color-mix(in srgb, var(--p-primary-color, #3b82f6) 14%, transparent);
            }
        `
    ]
})
export class TextEditorDemoToolbar {
    readonly headingLevels = [1, 2, 3, 4, 5, 6];

    readonly fontFamilies = [
        { label: 'Default font', value: '' },
        { label: 'Arial', value: 'Arial' },
        { label: 'Arial Black', value: 'Arial Black' },
        { label: 'Verdana', value: 'Verdana' },
        { label: 'Tahoma', value: 'Tahoma' },
        { label: 'Trebuchet MS', value: 'Trebuchet MS' },
        { label: 'Times New Roman', value: 'Times New Roman' },
        { label: 'Georgia', value: 'Georgia' },
        { label: 'Garamond', value: 'Garamond' },
        { label: 'Courier New', value: 'Courier New' },
        { label: 'Lucida Console', value: 'Lucida Console' },
        { label: 'Monaco', value: 'Monaco' },
        { label: 'Comic Sans MS', value: 'Comic Sans MS' },
        { label: 'Impact', value: 'Impact' },
        { label: 'Brush Script MT', value: 'Brush Script MT' }
    ];

    readonly fontSizes = [
        { label: 'Size', value: '' },
        { label: '10px', value: '10px' },
        { label: '11px', value: '11px' },
        { label: '12px', value: '12px' },
        { label: '14px', value: '14px' },
        { label: '16px', value: '16px' },
        { label: '18px', value: '18px' },
        { label: '20px', value: '20px' },
        { label: '24px', value: '24px' },
        { label: '28px', value: '28px' },
        { label: '32px', value: '32px' },
        { label: '36px', value: '36px' },
        { label: '48px', value: '48px' },
        { label: '64px', value: '64px' }
    ];

    readonly alignOptions: { label: string; value: TextEditorTextAlign }[] = [
        { label: 'Align left', value: 'left' },
        { label: 'Align center', value: 'center' },
        { label: 'Align right', value: 'right' },
        { label: 'Align justify', value: 'justify' }
    ];

    readonly textPickerOpen = signal(false);
    readonly bgPickerOpen = signal(false);
    readonly alignOpen = signal(false);
    readonly textColor = signal('#e11d48');
    readonly bgColor = signal('#fef08a');

    @HostListener('document:click')
    onDocumentClick(): void {
        this.textPickerOpen.set(false);
        this.bgPickerOpen.set(false);
        this.alignOpen.set(false);
    }

    alignIconName(state: { textAlign: TextEditorTextAlign | null }): string {
        return 'align-' + (state.textAlign ?? 'left');
    }

    onHeading(event: Event, commands: TextEditorCommands): void {
        const level = Number((event.target as HTMLSelectElement).value) || null;
        if (level === null) commands.paragraph();
        else commands.heading(level);
    }

    applyTextColor(color: string, commands: TextEditorCommands): void {
        this.textColor.set(color);
        commands.foregroundColor(color);
    }

    applyBackgroundColor(color: string, commands: TextEditorCommands): void {
        this.bgColor.set(color);
        commands.backgroundColor(color);
    }

    onAddLink(commands: TextEditorCommands): void {
        const url = prompt('Link URL', 'https://');
        if (url) commands.insertLink(url);
    }

    onAddImage(commands: TextEditorCommands): void {
        const url = prompt('Image URL', 'https://');
        if (url) commands.insertImage(url);
    }

    onImageFile(event: Event, commands: TextEditorCommands): void {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') commands.insertImage(reader.result);
        };
        reader.readAsDataURL(file);
        input.value = '';
    }
}
