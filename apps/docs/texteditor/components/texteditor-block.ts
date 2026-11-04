/**
 * @file
 * Block mode parts: `p-texteditor-block-controls` (hover bar with add/drag
 * handles), `p-texteditor-block-menu` (per-block options popover) and
 * `p-texteditor-block-submenu` (nested Turn into / Color panels).
 */

import { ChangeDetectionStrategy, Component, ContentChild, Directive, TemplateRef, ViewEncapsulation, computed, forwardRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { TextEditorBlockControlsSlotContext, TextEditorBlockMenuSlotContext, TextEditorBlockSubmenuSlotContext, TextEditorSubmenu } from '@bdspark/sparkng/types/texteditor';
import { BLOCKCONTROLS_CONTEXT, BLOCKMENU_CONTEXT, TEXTEDITOR_CONTEXT } from '../context/texteditor.context';

/* ------------------------------------------------------------------ */
/* Slot directives                                                     */
/* ------------------------------------------------------------------ */

/**
 * Structural directive handing the block controls their slot props (`index`,
 * `blockType`, `addBlock`, `onDragStart`, `onDragEnd`, `onDragHandleClick`).
 * @group Directives
 */
@Directive({ selector: '[pTexteditorBlockControlsDef]', standalone: true })
export class TextEditorBlockControlsDef {
    static ngTemplateContextGuard(_dir: TextEditorBlockControlsDef, ctx: unknown): TextEditorBlockControlsSlotContext {
        return ctx as TextEditorBlockControlsSlotContext;
    }
}

/**
 * Structural directive handing the block menu its slot props (`blockIndex`,
 * `blockType`, `commands`, `submenu`, `dismiss`).
 * @group Directives
 */
@Directive({ selector: '[pTexteditorBlockMenuDef]', standalone: true })
export class TextEditorBlockMenuDef {
    static ngTemplateContextGuard(_dir: TextEditorBlockMenuDef, ctx: unknown): TextEditorBlockMenuSlotContext {
        return ctx as TextEditorBlockMenuSlotContext;
    }
}

/**
 * Structural directive handing the block submenu its slot props
 * (`activeSubmenu`, `dismiss`).
 * @group Directives
 */
@Directive({ selector: '[pTexteditorBlockSubmenuDef]', standalone: true })
export class TextEditorBlockSubmenuDef {
    static ngTemplateContextGuard(_dir: TextEditorBlockSubmenuDef, ctx: unknown): TextEditorBlockSubmenuSlotContext {
        return ctx as TextEditorBlockSubmenuSlotContext;
    }
}

/* ------------------------------------------------------------------ */
/* Block controls                                                      */
/* ------------------------------------------------------------------ */

/**
 * Floating hover bar with an add-block button and a drag handle, teleported
 * next to the hovered block (block mode).
 * @group Components
 */
@Component({
    selector: 'p-texteditor-block-controls',
    standalone: true,
    imports: [CommonModule],
    providers: [{ provide: BLOCKCONTROLS_CONTEXT, useExisting: forwardRef(() => TextEditorBlockControls) }],
    template: `
        @if (hover(); as h) {
            <div
                class="p-texteditor-block-controls"
                [attr.data-block-type]="blockType()"
                [attr.data-scope]="'texteditor'"
                [attr.data-part]="'block-controls'"
                [style.top.px]="top()"
                (click)="$event.stopPropagation()"
                (dragstart)="$event.stopPropagation()"
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
export class TextEditorBlockControls {
    readonly editor = inject(TEXTEDITOR_CONTEXT);

    @ContentChild(TextEditorBlockControlsDef, { read: TemplateRef }) controlsDef?: TemplateRef<any>;

    readonly template = signal<TemplateRef<any> | null>(null);
    readonly hover = computed(() => this.editor.blockHover());
    readonly index = computed(() => this.hover()?.index ?? -1);
    readonly blockType = computed(() => (this.index() >= 0 ? this.editor.getBlockType(this.index()) : 'paragraph'));
    readonly top = computed(() => {
        const h = this.hover();
        return h?.element ? (h.element as HTMLElement).offsetTop : 0;
    });

    readonly slotContext = computed<TextEditorBlockControlsSlotContext | null>(() => {
        if (!this.hover()) return null;
        return {
            index: this.index(),
            blockType: this.blockType(),
            addBlock: (index: number) => this.editor.addBlockAfter(index),
            onDragStart: (index: number, event: DragEvent) => this.editor.startBlockDrag(index, event),
            onDragEnd: () => this.editor.endBlockDrag(),
            onDragHandleClick: (index: number, event: MouseEvent) => this.openMenu(index, event)
        };
    });

    ngAfterContentInit(): void {
        this.template.set(this.controlsDef ?? null);
        this.editor.registerPart('blockControls');
    }

    addBlock(index: number): void {
        this.editor.addBlockAfter(index);
    }

    onDragStart(index: number, event: DragEvent): void {
        this.editor.startBlockDrag(index, event);
    }

    onDragEnd(): void {
        this.editor.endBlockDrag();
    }

    onDragHandleClick(index: number, event: MouseEvent): void {
        this.openMenu(index, event);
    }

    openMenu(index: number, event: MouseEvent): void {
        const host = (event.currentTarget ?? event.target) as HTMLElement;
        const rect = host.getBoundingClientRect();
        const rootRect = this.editor.rootElement().getBoundingClientRect();
        this.editor.requestBlockMenu(index, { top: rect.top - rootRect.top, left: rect.right - rootRect.left + 4 });
    }
}

/* ------------------------------------------------------------------ */
/* Block menu + submenu                                                */
/* ------------------------------------------------------------------ */

/**
 * Floating per-block options popover opened from the drag handle. Commands:
 * duplicate, copy, delete and a Turn into submenu.
 * @group Components
 */
@Component({
    selector: 'p-texteditor-block-menu',
    standalone: true,
    imports: [CommonModule],
    providers: [{ provide: BLOCKMENU_CONTEXT, useExisting: forwardRef(() => TextEditorBlockMenu) }],
    template: `
        @if (request(); as req) {
            <div
                class="p-texteditor-popover-menu p-texteditor-block-menu"
                role="menu"
                aria-label="Block options"
                [attr.data-scope]="'texteditor'"
                [attr.data-part]="'block-menu'"
                [style.top.px]="req.top"
                [style.left.px]="req.left"
                (click)="$event.stopPropagation()"
            >
                @if (slotContext(); as ctx) {
                    <ng-container *ngTemplateOutlet="template()!; context: ctx" />
                }
                <ng-content select="p-texteditor-block-submenu" />
                <ng-content />
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorBlockMenu {
    readonly editor = inject(TEXTEDITOR_CONTEXT);

    @ContentChild(TextEditorBlockMenuDef, { read: TemplateRef }) menuDef?: TemplateRef<any>;

    readonly template = signal<TemplateRef<any> | null>(null);
    readonly request = computed(() => this.editor.blockMenuRequest());
    readonly index = computed(() => this.request()?.index ?? 0);
    readonly blockType = computed(() => this.editor.getBlockType(this.index()));
    readonly activeSubmenu = signal<string | null>(null);

    readonly commands = computed(() => this.editor.blockCommands(this.index()));

    readonly submenuController = computed<TextEditorSubmenu>(() => ({
        active: () => this.activeSubmenu(),
        open: (key: string) => this.activeSubmenu.set(key),
        close: () => this.activeSubmenu.set(null)
    }));

    readonly blockIndex = computed(() => this.index());

    get submenu(): TextEditorSubmenu {
        return this.submenuController();
    }

    readonly slotContext = computed<TextEditorBlockMenuSlotContext | null>(() => {
        if (!this.request()) return null;
        return {
            blockIndex: this.index(),
            blockType: this.blockType(),
            commands: this.commands(),
            submenu: this.submenuController(),
            dismiss: () => this.dismiss()
        };
    });

    ngAfterContentInit(): void {
        this.template.set(this.menuDef ?? null);
        this.editor.registerPart('blockMenu');
    }

    dismiss(): void {
        this.editor.dismissBlockMenu();
        this.activeSubmenu.set(null);
    }
}

/**
 * Nested submenu of the block menu (e.g. Turn into, Color).
 * @group Components
 */
@Component({
    selector: 'p-texteditor-block-submenu',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (context(); as ctx) {
            <div class="p-texteditor-popover-submenu" role="menu" [attr.data-scope]="'texteditor'" [attr.data-part]="'block-submenu'">
                <ng-container *ngTemplateOutlet="template()!; context: ctx" />
            </div>
        }
        <ng-content />
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorBlockSubmenu {
    readonly menu = inject(BLOCKMENU_CONTEXT, { optional: true });

    @ContentChild(TextEditorBlockSubmenuDef, { read: TemplateRef }) submenuDef?: TemplateRef<any>;

    readonly template = signal<TemplateRef<any> | null>(null);

    readonly context = computed<TextEditorBlockSubmenuSlotContext | null>(() => {
        if (!this.menu || this.menu.submenu.active() === null) return null;
        return { activeSubmenu: this.menu.submenu.active(), commands: this.menu.commands(), dismiss: () => this.menu!.dismiss() };
    });

    ngAfterContentInit(): void {
        this.template.set(this.submenuDef ?? null);
    }
}
