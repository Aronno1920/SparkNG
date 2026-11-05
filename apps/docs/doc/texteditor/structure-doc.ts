import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, signal } from '@angular/core';
import { TextEditorContent, TextEditorRoot, TextEditorToolbar, TextEditorToolbarDef } from '@bdspark/sparkng/texteditor';
import type { TextEditorCommands } from '@bdspark/sparkng/types/texteditor';

@Component({
    selector: 'structure-doc',
    standalone: true,
    imports: [AppDocSectionText, TextEditorRoot, TextEditorToolbar, TextEditorContent, AppCode, TextEditorToolbarDef],
    template: `
        <app-docsectiontext>
            <h3>Headings &amp; Blocks</h3>
            <p>
                <code>commands.heading(level)</code> converts the block; calling it with the active level toggles back to a paragraph. <code>commands.blockquote()</code> and <code>commands.codeBlock()</code> toggle their block types — a code block
                holds plain text and accepts no inline marks. <code>commands.insertHorizontalRule()</code> has no state flag.
            </p>
            <h3>Lists</h3>
            <p>
                <code>commands.bulletList()</code>, <code>commands.orderedList()</code> and <code>commands.checkList()</code> toggle the matching list. Checklist items serialize as <code>ul[data-p-checked-list]</code> with
                <code>li[data-p-checked]</code> and their checkbox toggles with a click. <code>checklistPlaceholder</code> labels empty checklist items.
            </p>
            <h3>Text Align</h3>
            <p><code>commands.textAlign('left' | 'center' | 'right' | 'justify')</code> sets the block alignment; the active value is reported by <code>state.textAlign</code>.</p>
        </app-docsectiontext>
        <div class="card">
            <p-texteditor-root [(value)]="value" placeholder="Build structure…" [markdown]="true">
                <p-texteditor-toolbar>
                    <ng-template pTexteditorToolbarDef let-commands="commands" let-state="state">
                        <select [value]="state.heading ?? ''" (change)="onHeading($event, commands)" aria-label="Block type">
                            <option value="">Paragraph</option>
                            <option value="1">Heading 1</option>
                            <option value="2">Heading 2</option>
                            <option value="3">Heading 3</option>
                        </select>
                        <button type="button" (click)="commands.bulletList()" [attr.aria-pressed]="state.bulletList" aria-label="Bullet list">• List</button>
                        <button type="button" (click)="commands.orderedList()" [attr.aria-pressed]="state.orderedList" aria-label="Ordered list">1. List</button>
                        <button type="button" (click)="commands.checkList()" [attr.aria-pressed]="state.checkList" aria-label="Checklist">☑ List</button>
                        <button type="button" (click)="commands.blockquote()" [attr.aria-pressed]="state.blockquote" aria-label="Blockquote">❝</button>
                        <button type="button" (click)="commands.codeBlock()" [attr.aria-pressed]="state.codeBlock" aria-label="Code block">{{ '{ }' }}</button>
                        <button type="button" (click)="commands.insertHorizontalRule()" aria-label="Divider">—</button>
                        <button type="button" (click)="commands.textAlign('left')" [attr.aria-pressed]="state.textAlign === 'left'" aria-label="Align left">⇤</button>
                        <button type="button" (click)="commands.textAlign('center')" [attr.aria-pressed]="state.textAlign === 'center'" aria-label="Align center">⇆</button>
                        <button type="button" (click)="commands.textAlign('right')" [attr.aria-pressed]="state.textAlign === 'right'" aria-label="Align right">⇥</button>
                    </ng-template>
                </p-texteditor-toolbar>
                <p-texteditor-content checklistPlaceholder="To-Do" />
            </p-texteditor-root>
        </div>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class StructureDoc {
    readonly value = signal<string | undefined>(
        '<h1>Structure</h1><p>Markdown shortcuts are enabled in this demo: type <code>#</code>, <code>-</code>, <code>1.</code>, <code>&gt;</code> or <code>[ ]</code> followed by a space.</p><ul data-p-checked-list=""><li data-p-checked="true"><p>Shipped with the scheduler demo</p></li><li data-p-checked="false"><p>Try the checklist toggle</p></li></ul>'
    );

    onHeading(event: Event, commands: TextEditorCommands): void {
        const level = Number((event.target as HTMLSelectElement).value) || null;
        if (level === null) commands.paragraph();
        else commands.heading(level);
    }

    code = {
        typescript: `// headings — re-clicking the active level falls back to paragraph
onChange(event: Event, commands: TextEditorCommands) {
    const level = Number((event.target as HTMLSelectElement).value) || null;
    level === null ? commands.paragraph() : commands.heading(level);
}

// lists & blocks
commands.bulletList();
commands.orderedList();
commands.checkList();          // ul[data-p-checked-list]
commands.blockquote();
commands.codeBlock();
commands.insertHorizontalRule();

// text align
commands.textAlign('center');`
    };
}
