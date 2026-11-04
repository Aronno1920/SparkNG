import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, signal } from '@angular/core';
import {
    TextEditorContent,
    TextEditorRoot,
    TextEditorTableCellMenu,
    TextEditorTableCellMenuDef,
    TextEditorTableCellSubmenu,
    TextEditorTableColumnMenu,
    TextEditorTableColumnMenuDef,
    TextEditorTableColumnSubmenu,
    TextEditorTableColumnSubmenuDef,
    TextEditorTableControls,
    TextEditorTableRowMenu,
    TextEditorTableRowMenuDef,
    TextEditorTableRowSubmenu,
    TextEditorToolbar,
    TextEditorToolbarDef
} from '@bdspark/sparkng/texteditor';

@Component({
    selector: 'table-doc',
    standalone: true,
    imports: [
        AppDocSectionText,
        TextEditorRoot,
        TextEditorToolbar,
        TextEditorContent,
        TextEditorTableControls,
        TextEditorTableColumnMenu,
        TextEditorTableColumnSubmenu,
        TextEditorTableRowMenu,
        TextEditorTableCellMenu,
        AppCode,
        TextEditorToolbarDef,
        TextEditorTableColumnMenuDef,
        TextEditorTableColumnSubmenuDef,
        TextEditorTableRowMenuDef,
        TextEditorTableCellMenuDef
    ],
    template: `
        <app-docsectiontext>
            <p>
                Insert with <code>commands.table(rows, cols)</code>. Four floating parts manage the active table: <code>p-texteditor-table-controls</code> renders the add row/column buttons and the column/row trigger dots,
                <code>p-texteditor-table-column-menu</code>, <code>-row-menu</code> and <code>-cell-menu</code> open the matching action popovers with a shared submenu controller keeping both halves in lock-step. Column widths honor
                <code>minTableColumnWidth</code> (40px) and <code>defaultTableColumnWidth</code> (120px).
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-texteditor-root [(value)]="value" placeholder="Insert a table…">
                <p-texteditor-toolbar>
                    <ng-template pTexteditorToolbarDef let-commands="commands">
                        <button type="button" (click)="commands.table(3, 3)" aria-label="Insert table">▦ Table</button>
                    </ng-template>
                </p-texteditor-toolbar>
                <p-texteditor-content />
                <p-texteditor-table-controls />
                <p-texteditor-table-column-menu>
                    <ng-template pTexteditorTableColumnMenuDef let-commands="commands" let-submenu="submenu" let-dismiss="dismiss">
                        <button type="button" role="menuitem" (click)="commands.insertBefore(); dismiss()">Insert left</button>
                        <button type="button" role="menuitem" (click)="commands.insertAfter(); dismiss()">Insert right</button>
                        <button type="button" role="menuitem" (click)="submenu.open('align')">Align…</button>
                        <button type="button" role="menuitem" (click)="commands.delete(); dismiss()">Delete column</button>
                    </ng-template>
                    <p-texteditor-table-column-submenu>
                        <ng-template pTexteditorTableColumnSubmenuDef let-activeSubmenu="activeSubmenu" let-commands="commands" let-dismiss="dismiss">
                            @if (activeSubmenu === 'align') {
                                <button type="button" role="menuitem" (click)="commands.align('left'); dismiss()">Left</button>
                                <button type="button" role="menuitem" (click)="commands.align('center'); dismiss()">Center</button>
                                <button type="button" role="menuitem" (click)="commands.align('right'); dismiss()">Right</button>
                            }
                        </ng-template>
                    </p-texteditor-table-column-submenu>
                </p-texteditor-table-column-menu>
                <p-texteditor-table-row-menu>
                    <ng-template pTexteditorTableRowMenuDef let-commands="commands" let-dismiss="dismiss">
                        <button type="button" role="menuitem" (click)="commands.insertBefore(); dismiss()">Insert above</button>
                        <button type="button" role="menuitem" (click)="commands.insertAfter(); dismiss()">Insert below</button>
                        <button type="button" role="menuitem" (click)="commands.delete(); dismiss()">Delete row</button>
                    </ng-template>
                </p-texteditor-table-row-menu>
                <p-texteditor-table-cell-menu>
                    <ng-template pTexteditorTableCellMenuDef let-commands="commands" let-isMultiCellSelected="isMultiCellSelected" let-dismiss="dismiss">
                        <button type="button" role="menuitem" (click)="commands.merge(); dismiss()" [disabled]="!isMultiCellSelected">Merge cells</button>
                        <button type="button" role="menuitem" (click)="commands.split(); dismiss()">Split cell</button>
                        <button type="button" role="menuitem" (click)="commands.clear(); dismiss()">Clear contents</button>
                        <button type="button" role="menuitem" (click)="commands.deleteTable(); dismiss()">Delete table</button>
                    </ng-template>
                </p-texteditor-table-cell-menu>
            </p-texteditor-root>
        </div>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class TableDoc {
    readonly value = signal<string | undefined>('<p>Hover a table to reveal the floating controls: dots open the column and row menus, plus a cell menu for merge, split and clear.</p>');

    code = {
        typescript: `commands.table(3, 3); // insert

// floating controls
<p-texteditor-table-controls>
    <ng-template pTexteditorTableControlsDef let-position="position" let-commands="commands">
        @if (position) {
            <button (click)="commands.addColumn()">+ column</button>
            <button (click)="commands.addRow()">+ row</button>
        }
    </ng-template>
</p-texteditor-table-controls>

// column menu with a shared submenu
<button role="menuitem" (click)="commands.insertBefore(); dismiss()">Insert left</button>
<button role="menuitem" (click)="submenu.open('align')">Align…</button>`
    };
}
