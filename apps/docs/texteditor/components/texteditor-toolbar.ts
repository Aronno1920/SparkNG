/**
 * @file
 * `p-texteditor-toolbar` (static toolbar surface) and its slot directive, plus
 * the floating `p-texteditor-context-toolbar` with its overflow sub-part.
 */

import { ChangeDetectionStrategy, Component, ContentChild, computed, Directive, ElementRef, TemplateRef, ViewEncapsulation, forwardRef, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { TextEditorContextToolbarMoreSlotContext, TextEditorContextToolbarSlotContext, TextEditorToolbarSlotContext } from '@bdspark/sparkng/types/texteditor';
import { CONTEXTTOOLBAR_CONTEXT, TEXTEDITOR_CONTEXT } from '../context/texteditor.context';

/* ------------------------------------------------------------------ */
/* Slot directives                                                     */
/* ------------------------------------------------------------------ */

/**
 * Structural directive handing the toolbar its slot props (`commands`, `state`,
 * `plugins` — already unwrapped).
 * @group Directives
 */
@Directive({ selector: '[pTexteditorToolbarDef]', standalone: true })
export class TextEditorToolbarDef {
    static ngTemplateContextGuard(_dir: TextEditorToolbarDef, ctx: unknown): TextEditorToolbarSlotContext {
        return ctx as TextEditorToolbarSlotContext;
    }
}

/**
 * Structural directive handing the context toolbar its slot props
 * (`commands`, `state`, `plugins`, `toggleMore`, `moreActive`, `dismiss`).
 * @group Directives
 */
@Directive({ selector: '[pTexteditorContextToolbarDef]', standalone: true })
export class TextEditorContextToolbarDef {
    static ngTemplateContextGuard(_dir: TextEditorContextToolbarDef, ctx: unknown): TextEditorContextToolbarSlotContext {
        return ctx as TextEditorContextToolbarSlotContext;
    }
}

/**
 * Structural directive handing the context toolbar overflow panel its slot props.
 * @group Directives
 */
@Directive({ selector: '[pTexteditorContextToolbarMoreDef]', standalone: true })
export class TextEditorContextToolbarMoreDef {
    static ngTemplateContextGuard(_dir: TextEditorContextToolbarMoreDef, ctx: unknown): TextEditorContextToolbarMoreSlotContext {
        return ctx as TextEditorContextToolbarMoreSlotContext;
    }
}

/* ------------------------------------------------------------------ */
/* Static toolbar                                                      */
/* ------------------------------------------------------------------ */

/**
 * Persistent `role="toolbar"` surface above the content. Fill it with widgets
 * through the `pTexteditorToolbarDef` template or projected components reading
 * {@link TEXTEDITOR_CONTEXT}.
 * @group Components
 */
@Component({
    selector: 'p-texteditor-toolbar',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="p-texteditor-toolbar" role="toolbar" aria-orientation="horizontal" aria-label="Text editor toolbar" [attr.data-scope]="'texteditor'" [attr.data-part]="'toolbar'">
            @if (slotContext(); as ctx) {
                <ng-container *ngTemplateOutlet="template()!; context: ctx" />
            }
            <ng-content />
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorToolbar {
    readonly editor = inject(TEXTEDITOR_CONTEXT);

    @ContentChild(TextEditorToolbarDef, { read: TemplateRef }) toolbarDef?: TemplateRef<any>;

    readonly template = signal<TemplateRef<any> | null>(null);

    readonly slotContext = computed<TextEditorToolbarSlotContext | null>(() => {
        const commands = this.editor.commands();
        const state = this.editor.state();
        if (!commands || !state) return null;
        return { commands, state, plugins: this.editor.pluginCommands() };
    });

    ngAfterContentInit(): void {
        this.template.set(this.toolbarDef ?? null);
        this.editor.registerPart('toolbar');
    }
}

/* ------------------------------------------------------------------ */
/* Context (bubble) toolbar                                            */
/* ------------------------------------------------------------------ */

/**
 * Floating toolbar anchored to the selection. Opens on double-click or text
 * selection; owns click-outside dismissal and the overflow sub-part.
 * @group Components
 */
@Component({
    selector: 'p-texteditor-context-toolbar',
    standalone: true,
    imports: [CommonModule],
    providers: [{ provide: CONTEXTTOOLBAR_CONTEXT, useExisting: forwardRef(() => TextEditorContextToolbar) }],
    template: `
        @if (request(); as req) {
            <div
                class="p-texteditor-context-toolbar"
                role="toolbar"
                aria-orientation="horizontal"
                aria-label="Selection toolbar"
                [attr.data-scope]="'texteditor'"
                [attr.data-part]="'context-toolbar'"
                [style.top.px]="req.top"
                [style.left.px]="req.left"
                (click)="$event.stopPropagation()"
            >
                @if (slotContext(); as ctx) {
                    <ng-container *ngTemplateOutlet="template()!; context: ctx" />
                }
                <ng-content select="p-texteditor-context-toolbar-more" />
                <ng-content />
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorContextToolbar {
    readonly editor = inject(TEXTEDITOR_CONTEXT);
    readonly elementRef = inject(ElementRef);

    @ContentChild(TextEditorContextToolbarDef, { read: TemplateRef }) contextToolbarDef?: TemplateRef<any>;
    @ContentChild(TextEditorContextToolbarMoreDef, { read: TemplateRef }) contextToolbarMoreDef?: TemplateRef<any>;

    readonly template = signal<TemplateRef<any> | null>(null);
    readonly moreTemplate = signal<TemplateRef<any> | null>(null);
    readonly moreTriggerEl = signal<HTMLElement | null>(null);

    readonly request = computed(() => this.editor.contextToolbarRequest());
    readonly moreActive = computed(() => this.editor.contextToolbarMoreActive());
    readonly commands = computed(() => this.editor.commands());
    readonly state = computed(() => this.editor.state());

    readonly slotContext = computed<TextEditorContextToolbarSlotContext | null>(() => {
        const commands = this.editor.commands();
        const state = this.editor.state();
        if (!commands || !state) return null;
        return {
            commands,
            state,
            plugins: this.editor.pluginCommands(),
            toggleMore: (event?: Event) => this.editor.toggleContextToolbarMore(event),
            moreActive: this.editor.contextToolbarMoreActive(),
            dismiss: () => this.dismiss()
        };
    });

    readonly moreContext = computed<TextEditorContextToolbarMoreSlotContext | null>(() => {
        const commands = this.editor.commands();
        const state = this.editor.state();
        if (!commands || !state) return null;
        return { commands, state, dismiss: () => this.dismiss() };
    });

    ngAfterContentInit(): void {
        this.template.set(this.contextToolbarDef ?? null);
        this.moreTemplate.set(this.contextToolbarMoreDef ?? null);
        this.editor.registerPart('contextToolbar');
    }

    setMoreTrigger(el: HTMLElement | null): void {
        this.moreTriggerEl.set(el);
    }

    toggleMore(event?: Event): void {
        this.editor.toggleContextToolbarMore(event);
    }

    dismiss(): void {
        this.editor.dismissContextToolbar();
    }
}

/**
 * Overflow panel of the context toolbar; anchors to the element published via
 * `setMoreTrigger`.
 * @group Components
 */
@Component({
    selector: 'p-texteditor-context-toolbar-more',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (moreContext(); as ctx) {
            <ng-container *ngTemplateOutlet="template()!; context: ctx" />
        }
        <ng-content />
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorContextToolbarMore {
    readonly editor = inject(TEXTEDITOR_CONTEXT);

    @ContentChild(TextEditorContextToolbarMoreDef, { read: TemplateRef }) moreDef?: TemplateRef<any>;

    readonly template = signal<TemplateRef<any> | null>(null);

    readonly moreContext = computed<TextEditorContextToolbarMoreSlotContext | null>(() => {
        const commands = this.editor.commands();
        const state = this.editor.state();
        if (!commands || !state) return null;
        return { commands, state, dismiss: () => this.editor.dismissContextToolbar() };
    });

    ngAfterContentInit(): void {
        this.template.set(this.moreDef ?? null);
    }
}
