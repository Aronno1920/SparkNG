/**
 * @file
 * Navigator parts: `p-texteditor-navigator` (renderless heading tracker),
 * `p-texteditor-navigator-trigger` (focusable rail) and
 * `p-texteditor-navigator-menu` (heading outline popover).
 */

import { ChangeDetectionStrategy, Component, ContentChild, Directive, TemplateRef, ViewEncapsulation, computed, forwardRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { TextEditorNavigatorSlotContext } from '@bdspark/sparkng/types/texteditor';
import { NAVIGATOR_CONTEXT, TEXTEDITOR_CONTEXT } from '../context/texteditor.context';

/* ------------------------------------------------------------------ */
/* Slot directives                                                     */
/* ------------------------------------------------------------------ */

/**
 * Structural directive handing the navigator trigger its slot props
 * (`headings`, `activeIndex`).
 * @group Directives
 */
@Directive({ selector: '[pTexteditorNavigatorTriggerDef]', standalone: true })
export class TextEditorNavigatorTriggerDef {
    static ngTemplateContextGuard(_dir: TextEditorNavigatorTriggerDef, ctx: unknown): TextEditorNavigatorSlotContext {
        return ctx as TextEditorNavigatorSlotContext;
    }
}

/**
 * Structural directive handing the navigator menu its slot props
 * (`headings`, `activeIndex`, `scrollTo`).
 * @group Directives
 */
@Directive({ selector: '[pTexteditorNavigatorMenuDef]', standalone: true })
export class TextEditorNavigatorMenuDef {
    static ngTemplateContextGuard(_dir: TextEditorNavigatorMenuDef, ctx: unknown): TextEditorNavigatorSlotContext {
        return ctx as TextEditorNavigatorSlotContext;
    }
}

/* ------------------------------------------------------------------ */
/* Navigator                                                           */
/* ------------------------------------------------------------------ */

/**
 * Renderless part that enables heading tracking for the minimap. Mounting it
 * turns the feature on; renders nothing.
 * @group Components
 */
@Component({
    selector: 'p-texteditor-navigator',
    standalone: true,
    imports: [CommonModule],
    providers: [{ provide: NAVIGATOR_CONTEXT, useExisting: forwardRef(() => TextEditorNavigator) }],
    template: `
        <ng-content select="p-texteditor-navigator-trigger" />
        <ng-content select="p-texteditor-navigator-menu" />
        <ng-content />
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorNavigator {
    readonly editor = inject(TEXTEDITOR_CONTEXT);

    readonly activeIndex = computed(() => this.editor.navigatorActiveIndex());
    readonly menuOpen = computed(() => this.editor.navigatorMenuOpen());
    readonly headings = computed(() => this.editor.headings());

    scrollTo(pos: number): void {
        this.editor.scrollToPos(pos);
    }

    constructor() {
        this.editor.registerPart('navigator');
    }

    openMenu(): void {
        this.editor.navigatorSetMenuOpen(true);
    }

    closeMenu(): void {
        this.editor.navigatorSetMenuOpen(false);
    }
}

/**
 * Focusable rail summarizing the outline; opens on hover, focus, Enter, Space
 * or ArrowDown.
 * @group Components
 */
@Component({
    selector: 'p-texteditor-navigator-trigger',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (context(); as ctx) {
            <div
                class="p-texteditor-navigator"
                tabindex="0"
                role="button"
                aria-haspopup="menu"
                [attr.aria-expanded]="menuOpen()"
                aria-label="Document outline"
                [attr.data-scope]="'texteditor'"
                [attr.data-part]="'navigator'"
                (mouseenter)="open()"
                (focus)="open()"
                (keydown)="onKeydown($event)"
            >
                <ng-container *ngTemplateOutlet="template()!; context: ctx" />
            </div>
        }
        <ng-content />
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorNavigatorTrigger {
    readonly navigator = inject(NAVIGATOR_CONTEXT);

    @ContentChild(TextEditorNavigatorTriggerDef, { read: TemplateRef }) triggerDef?: TemplateRef<any>;

    readonly template = signal<TemplateRef<any> | null>(null);

    readonly context = computed<TextEditorNavigatorSlotContext | null>(() => ({ headings: this.navigator.headings(), activeIndex: this.navigator.activeIndex() }));
    readonly menuOpen = computed(() => this.navigator.menuOpen());

    ngAfterContentInit(): void {
        this.template.set(this.triggerDef ?? null);
    }

    open(): void {
        this.navigator.openMenu();
    }

    onKeydown(event: KeyboardEvent): void {
        if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
            event.preventDefault();
            this.navigator.openMenu();
        }
        if (event.key === 'Escape') this.navigator.closeMenu();
    }
}

/**
 * Heading outline popover anchored to the trigger; arrow keys navigate, Enter
 * scrolls, Escape closes.
 * @group Components
 */
@Component({
    selector: 'p-texteditor-navigator-menu',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (context(); as ctx) {
            <div class="p-texteditor-popover-menu p-texteditor-navigator-popover" role="menu" aria-label="Document outline" [attr.data-scope]="'texteditor'" [attr.data-part]="'navigator-menu'">
                <ng-container *ngTemplateOutlet="template()!; context: ctx" />
            </div>
        }
        <ng-content />
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorNavigatorMenu {
    readonly navigator = inject(NAVIGATOR_CONTEXT);

    @ContentChild(TextEditorNavigatorMenuDef, { read: TemplateRef }) menuDef?: TemplateRef<any>;

    readonly template = signal<TemplateRef<any> | null>(null);

    readonly context = computed<TextEditorNavigatorSlotContext | null>(() => {
        if (!this.navigator.menuOpen()) return null;
        return { headings: this.navigator.headings(), activeIndex: this.navigator.activeIndex(), scrollTo: (pos: number) => this.navigator.scrollTo(pos) };
    });

    ngAfterContentInit(): void {
        this.template.set(this.menuDef ?? null);
    }
}
