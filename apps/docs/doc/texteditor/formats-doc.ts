import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, signal } from '@angular/core';
import { TextEditorContent, TextEditorRoot, TextEditorToolbar, TextEditorToolbarDef } from '@bdspark/sparkng/texteditor';

@Component({
    selector: 'formats-doc',
    standalone: true,
    imports: [AppDocSectionText, TextEditorRoot, TextEditorToolbar, TextEditorContent, AppCode, TextEditorToolbarDef],
    template: `
        <app-docsectiontext>
            <h3>Inline Formats</h3>
            <p>
                Bold, italic, underline, strikethrough, superscript, subscript and inline code are marks toggled with <code>commands.*()</code> and mirrored by their boolean state flag. A collapsed selection sets the typing mark, so the next
                characters come out formatted. Subscript and superscript are mutually exclusive.
            </p>
            <h3>Font &amp; Colors</h3>
            <p>
                <code>commands.fontFamily(value)</code>, <code>commands.fontSize(value)</code>, <code>commands.foregroundColor(color)</code> and <code>commands.backgroundColor(color)</code> apply value marks. When the selection spans more than one
                value the state reports <code>null</code>, so a select reads as cleared instead of guessing the first value.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-texteditor-root [(value)]="value" placeholder="Format text…">
                <p-texteditor-toolbar>
                    <ng-template pTexteditorToolbarDef let-commands="commands" let-state="state">
                        <button type="button" (click)="commands.bold()" [attr.aria-pressed]="state.bold" aria-label="Bold"><strong>B</strong></button>
                        <button type="button" (click)="commands.italic()" [attr.aria-pressed]="state.italic" aria-label="Italic"><em>I</em></button>
                        <button type="button" (click)="commands.underline()" [attr.aria-pressed]="state.underline" aria-label="Underline"><u>U</u></button>
                        <button type="button" (click)="commands.strikethrough()" [attr.aria-pressed]="state.strikethrough" aria-label="Strikethrough"><s>S</s></button>
                        <button type="button" (click)="commands.superscript()" [attr.aria-pressed]="state.superscript" aria-label="Superscript">x²</button>
                        <button type="button" (click)="commands.subscript()" [attr.aria-pressed]="state.subscript" aria-label="Subscript">x₂</button>
                        <button type="button" (click)="commands.code()" [attr.aria-pressed]="state.code" aria-label="Inline code">&lt;/&gt;</button>
                        <select [value]="state.fontFamily || ''" (change)="commands.fontFamily($any($event.target).value)" aria-label="Font family">
                            <option value="">Font</option>
                            <option value="Arial">Arial</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Courier New">Courier New</option>
                        </select>
                        <select [value]="state.fontSize || ''" (change)="commands.fontSize($any($event.target).value)" aria-label="Font size">
                            <option value="">Size</option>
                            <option value="12px">12px</option>
                            <option value="16px">16px</option>
                            <option value="20px">20px</option>
                        </select>
                        <button type="button" (click)="commands.foregroundColor('#e11d48')" [attr.aria-pressed]="state.foregroundColor === '#e11d48'" aria-label="Red text"><span style="color: #e11d48">A</span></button>
                        <button type="button" (click)="commands.backgroundColor('#fef08a')" [attr.aria-pressed]="state.backgroundColor === '#fef08a'" aria-label="Highlight"><span style="background: #fef08a">H</span></button>
                        <button type="button" (click)="commands.clearFormatting()" aria-label="Clear formatting">⌫</button>
                    </ng-template>
                </p-texteditor-toolbar>
                <p-texteditor-content />
            </p-texteditor-root>
        </div>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class FormatsDoc {
    readonly value = signal<string | undefined>('<p>Marks: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strikethrough</s>, x<sup>2</sup> + x<sub>2</sub> and inline <code>code</code>.</p>');

    code = {
        typescript: `// toggle marks
<button (click)="commands.bold()" [attr.aria-pressed]="state.bold">B</button>
<button (click)="commands.subscript()" [attr.aria-pressed]="state.subscript">x₂</button>

// value marks — null on mixed selections
<select [value]="state.fontFamily || ''" (change)="commands.fontFamily($any($event.target).value)">
    <option value="Arial">Arial</option>
    <option value="Georgia">Georgia</option>
</select>

// swatch buttons
<button (click)="commands.foregroundColor('#e11d48')"
        [attr.aria-pressed]="state.foregroundColor === '#e11d48'">A</button>`
    };
}
