/**
 * @file
 * Table parts: `p-texteditor-table-controls` (floating add row/column controls
 * and column/row trigger dots) plus the column, row and cell menus with their
 * nested submenus.
 */

import { ChangeDetectionStrategy, Component, ContentChild, Directive, ElementRef, TemplateRef, ViewEncapsulation, computed, forwardRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { TableOverlayRect, TextEditorSubmenu, TextEditorTableControlsSlotContext, TextEditorTableCellMenuSlotContext, TextEditorTableColumnMenuSlotContext, TextEditorTableRowMenuSlotContext } from '@bdspark/sparkng/types/texteditor';
import { TABLECELLMENU_CONTEXT, TABLECOLUMNMENU_CONTEXT, TABLEROWMENU_CONTEXT, TABLECONTROLS_CONTEXT, TEXTEDITOR_CONTEXT } from '../context/texteditor.context';

/* ------------------------------------------------------------------ */
/* Slot directives                                                     */
/* ------------------------------------------------------------------ */

/**
 * Structural directive handing the table controls their slot props
 * (`position`, `commands`).
 * @group Directives
 */
@Directive({ selector: '[pTexteditorTableControlsDef]', standalone: true })
export class TextEditorTableControlsDef {
    static ngTemplateContextGuard(_dir: TextEditorTableControlsDef, ctx: unknown): TextEditorTableControlsSlotContext {
        return ctx as TextEditorTableControlsSlotContext;
    }
}

/** Slot directive for the table column menu template. @group Directives */
@Directive({ selector: '[pTexteditorTableColumnMenuDef]', standalone: true })
export class TextEditorTableColumnMenuDef {
    static ngTemplateContextGuard(_dir: TextEditorTableColumnMenuDef, ctx: unknown): TextEditorTableColumnMenuSlotContext {
        return ctx as TextEditorTableColumnMenuSlotContext;
    }
}

/** Slot directive for the table column submenu template. @group Directives */
@Directive({ selector: '[pTexteditorTableColumnSubmenuDef]', standalone: true })
export class TextEditorTableColumnSubmenuDef {
    static ngTemplateContextGuard(_dir: TextEditorTableColumnSubmenuDef, ctx: unknown): unknown {
        return ctx;
    }
}

/** Slot directive for the table row menu template. @group Directives */
@Directive({ selector: '[pTexteditorTableRowMenuDef]', standalone: true })
export class TextEditorTableRowMenuDef {
    static ngTemplateContextGuard(_dir: TextEditorTableRowMenuDef, ctx: unknown): TextEditorTableRowMenuSlotContext {
        return ctx as TextEditorTableRowMenuSlotContext;
    }
}

/** Slot directive for the table row submenu template. @group Directives */
@Directive({ selector: '[pTexteditorTableRowSubmenuDef]', standalone: true })
export class TextEditorTableRowSubmenuDef {
    static ngTemplateContextGuard(_dir: TextEditorTableRowSubmenuDef, ctx: unknown): unknown {
        return ctx;
    }
}

/** Slot directive for the table cell menu template. @group Directives */
@Directive({ selector: '[pTexteditorTableCellMenuDef]', standalone: true })
export class TextEditorTableCellMenuDef {
    static ngTemplateContextGuard(_dir: TextEditorTableCellMenuDef, ctx: unknown): TextEditorTableCellMenuSlotContext {
        return ctx as TextEditorTableCellMenuSlotContext;
    }
}

/** Slot directive for the table cell submenu template. @group Directives */
@Directive({ selector: '[pTexteditorTableCellSubmenuDef]', standalone: true })
export class TextEditorTableCellSubmenuDef {
    static ngTemplateContextGuard(_dir: TextEditorTableCellSubmenuDef, ctx: unknown): unknown {
        return ctx;
    }
}

/* ------------------------------------------------------------------ */
/* Table controls                                                      */
/* ------------------------------------------------------------------ */

/**
 * Floating controls for the active table: add row/column buttons rendered at
 * the table edges, plus column and row trigger dots opening the menus.
 * Renders nothing while the cursor is outside any table.
 * @group Components
 */
@Component({
    selector: 'p-texteditor-table-controls',
    standalone: true,
    imports: [CommonModule],
    providers: [{ provide: TABLECONTROLS_CONTEXT, useExisting: forwardRef(() => TextEditorTableControls) }],
    template: `
        @if (position(); as pos) {
            <div class="p-texteditor-table-overlay" [attr.data-scope]="'texteditor'" [style.top.px]="pos.top" [style.left.px]="pos.left" [style.width.px]="pos.width" [style.height.px]="pos.height">
                @if (slotContext(); as ctx) {
                    <ng-container *ngTemplateOutlet="template()!; context: ctx" />
                }
                <ng-content />
                <button type="button" class="p-texteditor-table-trigger p-texteditor-table-trigger-col" [attr.data-scope]="'texteditor'" aria-label="Column options" (click)="openColumnMenu($event)"></button>
                <button type="button" class="p-texteditor-table-trigger p-texteditor-table-trigger-row" [attr.data-scope]="'texteditor'" aria-label="Row options" (click)="openRowMenu($event)"></button>
                <button type="button" class="p-texteditor-table-add p-texteditor-table-add-col" [attr.data-scope]="'texteditor'" aria-label="Add column" (click)="editor.addTableColumns(1, 'end')">+</button>
                <button type="button" class="p-texteditor-table-add p-texteditor-table-add-row" [attr.data-scope]="'texteditor'" aria-label="Add row" (click)="editor.addTableRows(1, 'end')">+</button>
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorTableControls {
    readonly editor = inject(TEXTEDITOR_CONTEXT);

    @ContentChild(TextEditorTableControlsDef, { read: TemplateRef }) controlsDef?: TemplateRef<any>;

    readonly template = signal<TemplateRef<any> | null>(null);
    readonly position = computed<TableOverlayRect | null>(() => this.editor.tableOverlayRect());

    readonly commands = computed(() => ({
        addRow: () => this.editor.addTableRows(1, 'end'),
        addColumn: () => this.editor.addTableColumns(1, 'end')
    }));

    readonly slotContext = computed<TextEditorTableControlsSlotContext | null>(() => {
        const position = this.position();
        if (!position) return null;
        return { position, commands: this.commands() };
    });

    ngAfterContentInit(): void {
        this.template.set(this.controlsDef ?? null);
        this.editor.registerPart('tableControls');
    }

    openColumnMenu(event: MouseEvent): void {
        const active = this.editor.tableActiveState();
        if (active) this.editor.requestTableColumnMenu(active.colIndex);
        event.stopPropagation();
    }

    openRowMenu(event: MouseEvent): void {
        const active = this.editor.tableActiveState();
        if (active) this.editor.requestTableRowMenu(active.rowIndex);
        event.stopPropagation();
    }
}

/* ------------------------------------------------------------------ */
/* Menus                                                               */
/* ------------------------------------------------------------------ */

/**
 * Column action popover (insert left/right, delete, align submenu).
 * @group Components
 */
@Component({
    selector: 'p-texteditor-table-column-menu',
    standalone: true,
    imports: [CommonModule],
    providers: [{ provide: TABLECOLUMNMENU_CONTEXT, useExisting: forwardRef(() => TextEditorTableColumnMenu) }],
    template: `
        @if (request(); as req) {
            <div
                class="p-texteditor-popover-menu p-texteditor-table-column-menu"
                role="menu"
                aria-label="Column options"
                [attr.data-scope]="'texteditor'"
                [attr.data-part]="'table-column-menu'"
                [style.top.px]="req.top - 8"
                [style.left.px]="req.left"
                (click)="$event.stopPropagation()"
            >
                @if (slotContext(); as ctx) {
                    <ng-container *ngTemplateOutlet="template()!; context: ctx" />
                }
                <ng-content select="p-texteditor-table-column-submenu" />
                <ng-content />
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorTableColumnMenu {
    readonly editor = inject(TEXTEDITOR_CONTEXT);

    @ContentChild(TextEditorTableColumnMenuDef, { read: TemplateRef }) menuDef?: TemplateRef<any>;

    readonly template = signal<TemplateRef<any> | null>(null);
    readonly request = computed(() => this.editor.tableColumnMenuRequest());
    readonly colIndex = computed(() => this.request()?.colIndex ?? 0);
    readonly colCount = computed(() => this.editor.tableActiveState()?.colCount ?? 0);
    readonly activeSubmenu = signal<string | null>(null);

    readonly commands = computed(() => this.editor.tableColumnCommands(this.colIndex()));

    readonly submenuController = computed<TextEditorSubmenu>(() => ({
        active: () => this.activeSubmenu(),
        open: (key: string) => this.activeSubmenu.set(key),
        close: () => this.activeSubmenu.set(null)
    }));

    get submenu(): TextEditorSubmenu {
        return this.submenuController();
    }

    readonly slotContext = computed<TextEditorTableColumnMenuSlotContext | null>(() => {
        if (!this.request()) return null;
        return {
            colIndex: this.colIndex(),
            colCount: this.colCount(),
            commands: this.commands(),
            submenu: this.submenuController(),
            dismiss: () => this.dismiss()
        };
    });

    ngAfterContentInit(): void {
        this.template.set(this.menuDef ?? null);
        this.editor.registerPart('tableColumnMenu');
    }

    dismiss(): void {
        this.editor.dismissTableMenus('column');
        this.activeSubmenu.set(null);
    }
}

/**
 * Row action popover (insert above/below, delete).
 * @group Components
 */
@Component({
    selector: 'p-texteditor-table-row-menu',
    standalone: true,
    imports: [CommonModule],
    providers: [{ provide: TABLEROWMENU_CONTEXT, useExisting: forwardRef(() => TextEditorTableRowMenu) }],
    template: `
        @if (request(); as req) {
            <div
                class="p-texteditor-popover-menu p-texteditor-table-row-menu"
                role="menu"
                aria-label="Row options"
                [attr.data-scope]="'texteditor'"
                [attr.data-part]="'table-row-menu'"
                [style.top.px]="req.top"
                [style.left.px]="req.left - 8"
                (click)="$event.stopPropagation()"
            >
                @if (slotContext(); as ctx) {
                    <ng-container *ngTemplateOutlet="template()!; context: ctx" />
                }
                <ng-content select="p-texteditor-table-row-submenu" />
                <ng-content />
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorTableRowMenu {
    readonly editor = inject(TEXTEDITOR_CONTEXT);

    @ContentChild(TextEditorTableRowMenuDef, { read: TemplateRef }) menuDef?: TemplateRef<any>;

    readonly template = signal<TemplateRef<any> | null>(null);
    readonly request = computed(() => this.editor.tableRowMenuRequest());
    readonly rowIndex = computed(() => this.request()?.rowIndex ?? 0);
    readonly rowCount = computed(() => this.editor.tableActiveState()?.rowCount ?? 0);
    readonly activeSubmenu = signal<string | null>(null);

    readonly commands = computed(() => this.editor.tableRowCommands(this.rowIndex()));

    readonly submenuController = computed<TextEditorSubmenu>(() => ({
        active: () => this.activeSubmenu(),
        open: (key: string) => this.activeSubmenu.set(key),
        close: () => this.activeSubmenu.set(null)
    }));

    get submenu(): TextEditorSubmenu {
        return this.submenuController();
    }

    readonly slotContext = computed<TextEditorTableRowMenuSlotContext | null>(() => {
        if (!this.request()) return null;
        return {
            rowIndex: this.rowIndex(),
            rowCount: this.rowCount(),
            commands: this.commands(),
            submenu: this.submenuController(),
            dismiss: () => this.dismiss()
        };
    });

    ngAfterContentInit(): void {
        this.template.set(this.menuDef ?? null);
        this.editor.registerPart('tableRowMenu');
    }

    dismiss(): void {
        this.editor.dismissTableMenus('row');
        this.activeSubmenu.set(null);
    }
}

/**
 * Cell action popover (merge, split, clear, delete table) with a trigger dot
 * rendered inside the selection outline.
 * @group Components
 */
@Component({
    selector: 'p-texteditor-table-cell-menu',
    standalone: true,
    imports: [CommonModule],
    providers: [{ provide: TABLECELLMENU_CONTEXT, useExisting: forwardRef(() => TextEditorTableCellMenu) }],
    template: `
        @if (request(); as req) {
            <div
                class="p-texteditor-popover-menu p-texteditor-table-cell-menu"
                role="menu"
                aria-label="Cell options"
                [attr.data-scope]="'texteditor'"
                [attr.data-part]="'table-cell-menu'"
                [style.top.px]="req.top"
                [style.left.px]="req.left"
                (click)="$event.stopPropagation()"
            >
                @if (slotContext(); as ctx) {
                    <ng-container *ngTemplateOutlet="template()!; context: ctx" />
                }
                <ng-content select="p-texteditor-table-cell-submenu" />
                <ng-content />
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorTableCellMenu {
    readonly editor = inject(TEXTEDITOR_CONTEXT);
    readonly elementRef = inject(ElementRef);

    @ContentChild(TextEditorTableCellMenuDef, { read: TemplateRef }) menuDef?: TemplateRef<any>;

    readonly template = signal<TemplateRef<any> | null>(null);
    readonly request = computed(() => this.editor.tableCellMenuRequest());
    readonly isMultiCellSelected = computed(() => this.editor.getIsMultiCellSelected());
    readonly isCellMerged = computed(() => this.editor.getIsCellMerged());
    readonly activeSubmenu = signal<string | null>(null);

    readonly commands = computed(() => this.editor.tableCellCommands());

    readonly submenuController = computed<TextEditorSubmenu>(() => ({
        active: () => this.activeSubmenu(),
        open: (key: string) => this.activeSubmenu.set(key),
        close: () => this.activeSubmenu.set(null)
    }));

    get submenu(): TextEditorSubmenu {
        return this.submenuController();
    }

    readonly slotContext = computed<TextEditorTableCellMenuSlotContext | null>(() => {
        if (!this.request()) return null;
        return {
            isMultiCellSelected: this.isMultiCellSelected(),
            isCellMerged: this.isCellMerged(),
            commands: this.commands(),
            submenu: this.submenuController(),
            dismiss: () => this.dismiss()
        };
    });

    ngAfterContentInit(): void {
        this.template.set(this.menuDef ?? null);
        this.editor.registerPart('tableCellMenu');
    }

    dismiss(): void {
        this.editor.dismissTableMenus('cell');
        this.activeSubmenu.set(null);
    }
}

/* ------------------------------------------------------------------ */
/* Submenus                                                            */
/* ------------------------------------------------------------------ */

/** Nested submenu of the table column menu (e.g. Align). @group Components */
@Component({
    selector: 'p-texteditor-table-column-submenu',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (context(); as ctx) {
            <div class="p-texteditor-popover-submenu" role="menu" [attr.data-scope]="'texteditor'" [attr.data-part]="'table-column-submenu'">
                <ng-container *ngTemplateOutlet="template()!; context: ctx" />
            </div>
        }
        <ng-content />
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorTableColumnSubmenu {
    readonly menu = inject(TABLECOLUMNMENU_CONTEXT, { optional: true });

    @ContentChild(TextEditorTableColumnSubmenuDef, { read: TemplateRef }) submenuDef?: TemplateRef<any>;

    readonly template = signal<TemplateRef<any> | null>(null);

    readonly context = computed(() => {
        if (!this.menu || this.menu.submenu.active() === null) return null;
        return { activeSubmenu: this.menu.submenu.active(), commands: this.menu.commands(), dismiss: () => this.menu!.dismiss() };
    });

    ngAfterContentInit(): void {
        this.template.set(this.submenuDef ?? null);
    }
}

/** Nested submenu of the table row menu. @group Components */
@Component({
    selector: 'p-texteditor-table-row-submenu',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (context(); as ctx) {
            <div class="p-texteditor-popover-submenu" role="menu" [attr.data-scope]="'texteditor'" [attr.data-part]="'table-row-submenu'">
                <ng-container *ngTemplateOutlet="template()!; context: ctx" />
            </div>
        }
        <ng-content />
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorTableRowSubmenu {
    readonly menu = inject(TABLEROWMENU_CONTEXT, { optional: true });

    @ContentChild(TextEditorTableRowSubmenuDef, { read: TemplateRef }) submenuDef?: TemplateRef<any>;

    readonly template = signal<TemplateRef<any> | null>(null);

    readonly context = computed(() => {
        if (!this.menu || this.menu.submenu.active() === null) return null;
        return { activeSubmenu: this.menu.submenu.active(), commands: this.menu.commands(), dismiss: () => this.menu!.dismiss() };
    });

    ngAfterContentInit(): void {
        this.template.set(this.submenuDef ?? null);
    }
}

/** Nested submenu of the table cell menu. @group Components */
@Component({
    selector: 'p-texteditor-table-cell-submenu',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (context(); as ctx) {
            <div class="p-texteditor-popover-submenu" role="menu" [attr.data-scope]="'texteditor'" [attr.data-part]="'table-cell-submenu'">
                <ng-container *ngTemplateOutlet="template()!; context: ctx" />
            </div>
        }
        <ng-content />
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorTableCellSubmenu {
    readonly menu = inject(TABLECELLMENU_CONTEXT, { optional: true });

    @ContentChild(TextEditorTableCellSubmenuDef, { read: TemplateRef }) submenuDef?: TemplateRef<any>;

    readonly template = signal<TemplateRef<any> | null>(null);

    readonly context = computed(() => {
        if (!this.menu || this.menu.submenu.active() === null) return null;
        return { activeSubmenu: this.menu.submenu.active(), commands: this.menu.commands(), dismiss: () => this.menu!.dismiss() };
    });

    ngAfterContentInit(): void {
        this.template.set(this.submenuDef ?? null);
    }
}
