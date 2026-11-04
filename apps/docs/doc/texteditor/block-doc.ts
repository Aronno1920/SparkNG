import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, signal } from '@angular/core';
import {
    TextEditorBlockControls,
    TextEditorBlockControlsDef,
    TextEditorBlockMenu,
    TextEditorBlockMenuDef,
    TextEditorBlockSubmenu,
    TextEditorBlockSubmenuDef,
    TextEditorContent,
    TextEditorRoot,
    TextEditorSlashMenu,
    TextEditorSlashMenuDef
} from '@bdspark/sparkng/texteditor';

@Component({
    selector: 'block-doc',
    standalone: true,
    imports: [
        AppDocSectionText,
        TextEditorRoot,
        TextEditorBlockControls,
        TextEditorBlockMenu,
        TextEditorBlockSubmenu,
        TextEditorSlashMenu,
        TextEditorContent,
        AppCode,
        TextEditorBlockControlsDef,
        TextEditorBlockMenuDef,
        TextEditorBlockSubmenuDef,
        TextEditorSlashMenuDef
    ],
    template: `
        <app-docsectiontext>
            <p>
                <code>mode="block"</code> switches the value to <code>string[]</code> — one HTML string per block. The runtime owns drag reordering, the hover bar and slash detection. Mount <code>p-texteditor-block-controls</code> for the add/drag
                handles, <code>p-texteditor-block-menu</code> for per-block options (with a Turn into submenu), and <code>p-texteditor-slash-menu</code> to enable the <code>/</code> command palette — it is an ARIA combobox whose entries render as
                <code>role="option"</code> buttons.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-texteditor-root [(value)]="blocks" mode="block" placeholder="Type '/' for commands…">
                <p-texteditor-block-controls>
                    <ng-template pTexteditorBlockControlsDef let-index="index" let-addBlock="addBlock" let-onDragStart="onDragStart" let-onDragEnd="onDragEnd" let-onDragHandleClick="onDragHandleClick">
                        <button type="button" (click)="addBlock(index)" aria-label="Add block">+</button>
                        <button type="button" draggable="true" (dragstart)="onDragStart(index, $event)" (dragend)="onDragEnd()" (click)="onDragHandleClick(index, $event)" aria-label="Block options">⋮⋮</button>
                    </ng-template>
                </p-texteditor-block-controls>
                <p-texteditor-block-menu>
                    <ng-template pTexteditorBlockMenuDef let-commands="commands" let-blockType="blockType" let-submenu="submenu" let-dismiss="dismiss">
                        <button type="button" role="menuitem" (click)="commands.duplicate(); dismiss()">Duplicate</button>
                        <button type="button" role="menuitem" (click)="commands.copyToClipboard(); dismiss()">Copy</button>
                        <button type="button" role="menuitem" (click)="submenu.open('turnInto')">Turn into…</button>
                        <button type="button" role="menuitem" (click)="commands.deleteBlock(); dismiss()">Delete</button>
                    </ng-template>
                    <p-texteditor-block-submenu>
                        <ng-template pTexteditorBlockSubmenuDef let-activeSubmenu="activeSubmenu" let-commands="commands" let-dismiss="dismiss">
                            @if (activeSubmenu === 'turnInto') {
                                <button type="button" role="menuitem" (click)="commands.turnInto(1); dismiss()">Heading 1</button>
                                <button type="button" role="menuitem" (click)="commands.turnInto(2); dismiss()">Heading 2</button>
                                <button type="button" role="menuitem" (click)="commands.turnInto(0); dismiss()">Paragraph</button>
                            }
                        </ng-template>
                    </p-texteditor-block-submenu>
                </p-texteditor-block-menu>
                <p-texteditor-slash-menu placeholder="Type to search">
                    <ng-template pTexteditorSlashMenuDef let-commands="commands" let-filterText="filterText" let-dismiss="dismiss">
                        <button type="button" role="option" [hidden]="!matches(filterText, 'heading 1')" (click)="commands.heading(1); dismiss()">Heading 1</button>
                        <button type="button" role="option" [hidden]="!matches(filterText, 'heading 2')" (click)="commands.heading(2); dismiss()">Heading 2</button>
                        <button type="button" role="option" [hidden]="!matches(filterText, 'paragraph')" (click)="commands.paragraph(); dismiss()">Text</button>
                        <button type="button" role="option" [hidden]="!matches(filterText, 'bullet list')" (click)="commands.bulletList(); dismiss()">Bullet list</button>
                        <button type="button" role="option" [hidden]="!matches(filterText, 'checklist')" (click)="commands.checkList(); dismiss()">Checklist</button>
                        <button type="button" role="option" [hidden]="!matches(filterText, 'quote')" (click)="commands.blockquote(); dismiss()">Quote</button>
                        <button type="button" role="option" [hidden]="!matches(filterText, 'code block')" (click)="commands.codeBlock(); dismiss()">Code block</button>
                        <button type="button" role="option" [hidden]="!matches(filterText, 'divider')" (click)="commands.horizontalRule(); dismiss()">Divider</button>
                        <button type="button" role="option" [hidden]="!matches(filterText, 'table')" (click)="commands.table(3, 3); dismiss()">Table</button>
                    </ng-template>
                </p-texteditor-slash-menu>
                <p-texteditor-content height="400px" />
            </p-texteditor-root>
        </div>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class BlockDoc {
    readonly blocks = signal<string[] | undefined>(['<h2>Welcome to the Block Editor</h2>', '<p>Each section is its own editable block — hover for the add and drag handles, type <code>/</code> for the command palette, and drag ⋮⋮ to reorder.</p>']);

    matches(filterText: string, label: string): boolean {
        return label.includes(filterText.toLowerCase());
    }

    code = {
        typescript: `import { Component, signal } from '@angular/core';
import { TextEditorBlockControls, TextEditorBlockMenu, TextEditorContent, TextEditorRoot, TextEditorSlashMenu } from '@bdspark/sparkng/texteditor';

@Component({
    selector: 'my-block-editor',
    standalone: true,
    imports: [TextEditorRoot, TextEditorBlockControls, TextEditorBlockMenu, TextEditorSlashMenu, TextEditorContent, TextEditorBlockControlsDef, TextEditorBlockMenuDef, TextEditorBlockSubmenuDef, TextEditorSlashMenuDef],
    template: \`
        <p-texteditor-root [(value)]="blocks" mode="block" placeholder="Type '/' for commands…">
            <p-texteditor-block-controls>
                <ng-template pTexteditorBlockControlsDef
                             let-index="index" let-addBlock="addBlock"
                             let-onDragStart="onDragStart" let-onDragEnd="onDragEnd"
                             let-onDragHandleClick="onDragHandleClick">
                    <button (click)="addBlock(index)" aria-label="Add block">+</button>
                    <button draggable="true"
                            (dragstart)="onDragStart(index, \$event)"
                            (dragend)="onDragEnd()"
                            (click)="onDragHandleClick(index, \$event)"
                            aria-label="Block options">⋮⋮</button>
                </ng-template>
            </p-texteditor-block-controls>
            <p-texteditor-block-menu>
                <ng-template pTexteditorBlockMenuDef let-commands="commands" let-submenu="submenu" let-dismiss="dismiss">
                    <button role="menuitem" (click)="commands.duplicate(); dismiss()">Duplicate</button>
                    <button role="menuitem" (click)="submenu.open('turnInto')">Turn into…</button>
                    <button role="menuitem" (click)="commands.deleteBlock(); dismiss()">Delete</button>
                </ng-template>
            </p-texteditor-block-menu>
            <p-texteditor-slash-menu placeholder="Type to search">
                <ng-template pTexteditorSlashMenuDef let-commands="commands" let-filterText="filterText" let-dismiss="dismiss">
                    <button role="option" [hidden]="!'heading 1'.includes(filterText)"
                            (click)="commands.heading(1); dismiss()">Heading 1</button>
                </ng-template>
            </p-texteditor-slash-menu>
            <p-texteditor-content height="400px" />
        </p-texteditor-root>
    \`
})
export class MyBlockEditor {
    blocks = signal(['<h2>Welcome</h2>', '<p>Each entry is a block.</p>']);
}`
    };
}
