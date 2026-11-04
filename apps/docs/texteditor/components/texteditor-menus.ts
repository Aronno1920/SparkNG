/**
 * @file
 * `p-texteditor-slash-menu` and `p-texteditor-mention-menu` with their slot
 * directives and contexts. Mounting either part enables the matching
 * type-ahead feature in the runtime.
 */

import { ChangeDetectionStrategy, Component, ContentChild, Directive, ElementRef, TemplateRef, ViewEncapsulation, computed, forwardRef, inject, input, signal, OnDestroy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { TextEditorMentionMenuSlotContext, TextEditorSlashMenuSlotContext } from '@bdspark/sparkng/types/texteditor';
import { MENTIONMENU_CONTEXT, SLASHMENU_CONTEXT, TEXTEDITOR_CONTEXT } from '../context/texteditor.context';

/* ------------------------------------------------------------------ */
/* Slot directives                                                     */
/* ------------------------------------------------------------------ */

/**
 * Structural directive handing the slash menu its slot props (`commands`,
 * `filterText`, `position`, `dismiss`).
 * @group Directives
 */
@Directive({ selector: '[pTexteditorSlashMenuDef]', standalone: true })
export class TextEditorSlashMenuDef {
    static ngTemplateContextGuard(_dir: TextEditorSlashMenuDef, ctx: unknown): TextEditorSlashMenuSlotContext {
        return ctx as TextEditorSlashMenuSlotContext;
    }
}

/**
 * Structural directive handing the mention menu its slot props (`items`,
 * `commands`, `filterText`, `position`, `dismiss`).
 * @group Directives
 */
@Directive({ selector: '[pTexteditorMentionMenuDef]', standalone: true })
export class TextEditorMentionMenuDef {
    static ngTemplateContextGuard(_dir: TextEditorMentionMenuDef, ctx: unknown): TextEditorMentionMenuSlotContext {
        return ctx as TextEditorMentionMenuSlotContext;
    }
}

/* ------------------------------------------------------------------ */
/* Slash menu                                                          */
/* ------------------------------------------------------------------ */

/**
 * Slash-command palette opened by typing `/`. The part owns filtering: entries
 * whose text does not include the filter text are hidden; the popover collapses
 * when nothing remains. Keyboard navigation follows the ARIA combobox pattern.
 * @group Components
 */
@Component({
    selector: 'p-texteditor-slash-menu',
    standalone: true,
    imports: [CommonModule],
    providers: [{ provide: SLASHMENU_CONTEXT, useExisting: forwardRef(() => TextEditorSlashMenu) }],
    template: `
        @if (request(); as req) {
            <div
                class="p-texteditor-popover-menu p-texteditor-slash-menu"
                role="listbox"
                aria-label="Slash commands"
                [attr.data-scope]="'texteditor'"
                [attr.data-part]="'slash-menu'"
                [style.top.px]="req.top + 4"
                [style.left.px]="req.left"
                (click)="$event.stopPropagation()"
            >
                @if (slotContext(); as ctx) {
                    <ng-container *ngTemplateOutlet="template()!; context: filteredContext(ctx)" />
                }
                <ng-content />
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorSlashMenu implements OnDestroy {
    readonly editor = inject(TEXTEDITOR_CONTEXT);
    readonly elementRef = inject(ElementRef);

    /**
     * Text shown inside the focused block while the menu is open.
     * @group Props
     */
    readonly placeholder = input<string>('Type to search');

    @ContentChild(TextEditorSlashMenuDef, { read: TemplateRef }) slashDef?: TemplateRef<any>;

    readonly template = signal<TemplateRef<any> | null>(null);
    readonly request = computed(() => this.editor.slashMenuRequest());
    readonly filterText = computed(() => this.request()?.text ?? '');
    readonly position = computed(() => this.request());
    readonly commands = computed(() => this.editor.slashCommands());

    constructor() {
        this.editor.registerPart('slashMenu');
        effect(() => {
            if (this.request()) {
                this.editor.registerTypeahead({
                    onArrow: (dir) => this.moveFocus(dir),
                    onEnter: () => this.selectFocused(),
                    onEscape: () => {
                        this.dismiss();
                        return true;
                    }
                });
            }
        });
    }

    ngAfterContentInit(): void {
        this.template.set(this.slashDef ?? null);
    }

    ngOnDestroy(): void {
        this.editor.registerTypeahead({
            onArrow: () => false,
            onEnter: () => false,
            onEscape: () => false
        });
    }

    /**
     * Slot context with the raw filter text; consumers hide non-matching
     * entries, the part collapses when nothing remains.
     */
    filteredContext(ctx: TextEditorSlashMenuSlotContext): TextEditorSlashMenuSlotContext {
        return { ...ctx, filterText: this.filterText() };
    }

    private focusables(): HTMLElement[] {
        const host = this.elementRef.nativeElement as HTMLElement;
        const filter = this.filterText().toLowerCase();
        return Array.from(host.querySelectorAll<HTMLElement>('[role="option"]')).filter((el) => !el.hasAttribute('hidden') && (!filter || (el.textContent ?? '').toLowerCase().includes(filter)));
    }

    private moveFocus(dir: 1 | -1): boolean {
        const items = this.focusables();
        if (!items.length) return false;
        const active = document.activeElement as HTMLElement | null;
        const index = active ? items.indexOf(active) : -1;
        items[(index + dir + items.length) % items.length]?.focus();
        return true;
    }

    private selectFocused(): boolean {
        const items = this.focusables();
        const active = document.activeElement as HTMLElement | null;
        const target = active && items.includes(active) ? active : items[0];
        if (target) {
            target.click();
            return true;
        }
        return false;
    }

    dismiss(): void {
        this.editor.dismissSlashMenu();
    }
}

/* ------------------------------------------------------------------ */
/* Mention menu                                                        */
/* ------------------------------------------------------------------ */

/**
 * `@`-mention popover backed by a handler. Mounting this part enables the
 * mention type-ahead in the runtime. Pass `handler`, `filterField` and an
 * optional `template` renderer for the inserted chips.
 * @group Components
 */
@Component({
    selector: 'p-texteditor-mention-menu',
    standalone: true,
    imports: [CommonModule],
    providers: [{ provide: MENTIONMENU_CONTEXT, useExisting: forwardRef(() => TextEditorMentionMenu) }],
    template: `
        @if (request(); as req) {
            <div
                class="p-texteditor-popover-menu p-texteditor-mention-menu"
                role="listbox"
                aria-label="Mentions"
                [attr.data-scope]="'texteditor'"
                [attr.data-part]="'mention-menu'"
                [style.top.px]="req.top + 4"
                [style.left.px]="req.left"
                (click)="$event.stopPropagation()"
            >
                @if (slotContext(); as ctx) {
                    <ng-container *ngTemplateOutlet="template()!; context: ctx" />
                }
                <ng-content />
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorMentionMenu implements OnDestroy {
    readonly editor = inject(TEXTEDITOR_CONTEXT);
    readonly elementRef = inject(ElementRef);

    /**
     * Resolves candidates for the current `@query`; returns items or a promise of items.
     * @group Props
     */
    readonly handler = input<((query: string) => unknown[] | Promise<unknown[]>) | null>(null);
    /**
     * Field name used for substring filtering, e.g. `'name'`.
     * @group Props
     */
    readonly filterField = input<string | null>(null);
    /**
     * Function rendering the inserted mention text, e.g. `(data) => '@' + data.name`.
     * @group Props
     */
    readonly template = input<((data: any) => string) | null>(null);

    @ContentChild(TextEditorMentionMenuDef, { read: TemplateRef }) mentionDef?: TemplateRef<any>;

    readonly defTemplate = signal<TemplateRef<any> | null>(null);
    readonly request = computed(() => this.editor.mentionRequest());
    readonly items = computed(() => this.request()?.items ?? []);
    readonly filterText = computed(() => this.request()?.text ?? '');
    readonly position = computed(() => this.request());
    readonly commands = computed(() => this.editor.mentionCommands());

    constructor() {
        this.editor.registerPart('mentionMenu');
        // Part-level handler/filterField/template take precedence over the root inputs.
        effect(() => {
            this.editor.registerMentionConfig({ handler: this.handler(), filterField: this.filterField(), template: this.template() });
        });
        effect(() => {
            if (this.request()) {
                this.editor.registerTypeahead({
                    onArrow: (dir) => this.moveFocus(dir),
                    onEnter: () => this.selectFocused(),
                    onEscape: () => {
                        this.dismiss();
                        return true;
                    }
                });
            }
        });
    }

    ngAfterContentInit(): void {
        this.defTemplate.set(this.mentionDef ?? null);
    }

    ngOnDestroy(): void {
        this.editor.registerTypeahead({
            onArrow: () => false,
            onEnter: () => false,
            onEscape: () => false
        });
    }

    private moveFocus(dir: 1 | -1): boolean {
        const host = this.elementRef.nativeElement as HTMLElement;
        const items = Array.from(host.querySelectorAll<HTMLElement>('[role="option"]'));
        if (!items.length) return false;
        const active = document.activeElement as HTMLElement | null;
        const index = active ? items.indexOf(active) : -1;
        items[(index + dir + items.length) % items.length]?.focus();
        return true;
    }

    private selectFocused(): boolean {
        const host = this.elementRef.nativeElement as HTMLElement;
        const items = Array.from(host.querySelectorAll<HTMLElement>('[role="option"]'));
        const active = document.activeElement as HTMLElement | null;
        const target = active && items.includes(active) ? active : items[0];
        if (target) {
            target.click();
            return true;
        }
        return false;
    }

    dismiss(): void {
        this.editor.dismissMentionMenu();
    }
}
