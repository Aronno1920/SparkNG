import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, signal } from '@angular/core';
import { TextEditorContent, TextEditorContextToolbar, TextEditorContextToolbarDef, TextEditorContextToolbarMore, TextEditorContextToolbarMoreDef, TextEditorRoot } from '@bdspark/sparkng/texteditor';

@Component({
    selector: 'contexttoolbar-doc',
    standalone: true,
    imports: [AppDocSectionText, TextEditorRoot, TextEditorContextToolbar, TextEditorContextToolbarMore, TextEditorContent, AppCode, TextEditorContextToolbarDef, TextEditorContextToolbarMoreDef],
    template: `
        <app-docsectiontext>
            <p>
                The context toolbar floats over the selection. It opens on double-click or text selection, owns click-outside dismissal, and ships an overflow sub-part. Mounting <code>p-texteditor-context-toolbar</code> enables the feature — without
                it, selections never trigger the request.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-texteditor-root [(value)]="value" placeholder="Select some text…">
                <p-texteditor-context-toolbar>
                    <ng-template pTexteditorContextToolbarDef let-commands="commands" let-state="state" let-toggleMore="toggleMore" let-moreActive="moreActive">
                        <button type="button" (click)="commands.bold()" [attr.aria-pressed]="state.bold" aria-label="Bold"><strong>B</strong></button>
                        <button type="button" (click)="commands.italic()" [attr.aria-pressed]="state.italic" aria-label="Italic"><em>I</em></button>
                        <button type="button" (click)="commands.underline()" [attr.aria-pressed]="state.underline" aria-label="Underline"><u>U</u></button>
                        <button type="button" (click)="toggleMore()" [attr.aria-pressed]="moreActive" aria-label="More">⋯</button>
                    </ng-template>
                    <p-texteditor-context-toolbar-more>
                        <ng-template pTexteditorContextToolbarMoreDef let-commands="commands" let-state="state">
                            <button type="button" (click)="commands.strikethrough()" [attr.aria-pressed]="state.strikethrough" aria-label="Strikethrough"><s>S</s></button>
                            <button type="button" (click)="commands.code()" [attr.aria-pressed]="state.code" aria-label="Inline code">&lt;/&gt;</button>
                        </ng-template>
                    </p-texteditor-context-toolbar-more>
                </p-texteditor-context-toolbar>
                <p-texteditor-content />
            </p-texteditor-root>
        </div>
        <app-code [code]="code"></app-code>
    `
})
export class ContextToolbarDoc {
    readonly value = signal<string | undefined>('<p>Double-click a word or drag across a sentence — the floating toolbar follows the selection with inline formatting plus a More overflow.</p>');

    code = {
        typescript: `import { Component, signal } from '@angular/core';
import { TextEditorContent, TextEditorContextToolbar, TextEditorContextToolbarMore, TextEditorRoot } from '@bdspark/sparkng/texteditor';

@Component({
    selector: 'my-editor',
    standalone: true,
    imports: [TextEditorRoot, TextEditorContextToolbar, TextEditorContextToolbarMore, TextEditorContent, TextEditorContextToolbarDef, TextEditorContextToolbarMoreDef],
    template: \`
        <p-texteditor-root [(value)]="value">
            <p-texteditor-context-toolbar>
                <ng-template pTexteditorContextToolbarDef let-commands="commands" let-state="state" let-toggleMore="toggleMore" let-moreActive="moreActive">
                    <button (click)="commands.bold()" [attr.aria-pressed]="state.bold">B</button>
                    <button (click)="commands.italic()" [attr.aria-pressed]="state.italic">I</button>
                    <button (click)="toggleMore()" [attr.aria-pressed]="moreActive">⋯</button>
                </ng-template>
                <p-texteditor-context-toolbar-more>
                    <ng-template pTexteditorContextToolbarMoreDef let-commands="commands" let-state="state">
                        <button (click)="commands.strikethrough()" [attr.aria-pressed]="state.strikethrough">S</button>
                    </ng-template>
                </p-texteditor-context-toolbar-more>
            </p-texteditor-context-toolbar>
            <p-texteditor-content />
        </p-texteditor-root>
    \`
})
export class MyEditor {
    value = signal('<p>Select some text…</p>');
}`
    };
}
