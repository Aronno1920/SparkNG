import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, signal } from '@angular/core';
import { TextEditorContent, TextEditorRoot, TextEditorToolbar, TextEditorToolbarDef } from '@bdspark/sparkng/texteditor';
import type { TextEditorCommands } from '@bdspark/sparkng/types/texteditor';

@Component({
    selector: 'link-doc',
    standalone: true,
    imports: [AppDocSectionText, TextEditorRoot, TextEditorToolbar, TextEditorContent, AppCode, TextEditorToolbarDef],
    template: `
        <app-docsectiontext>
            <p>
                Links are managed with three commands. <code>insertLink(url, text?)</code> wraps the selection — or inserts <code>text</code> when the selection is collapsed. <code>updateLink(url)</code> and <code>removeLink()</code> detect the link
                boundaries around the cursor, so the selection does not have to cover the whole link. <code>state.link</code> and <code>state.linkUrl</code> report the active link. Only <code>http</code>, <code>https</code>, <code>mailto</code>,
                <code>tel</code>, <code>ftp</code> and relative URLs pass sanitization; unsafe schemes drop the link mark but keep the text.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-texteditor-root [(value)]="value" placeholder="Type text to use as a link label">
                <p-texteditor-toolbar>
                    <ng-template pTexteditorToolbarDef let-commands="commands" let-state="state">
                        <button type="button" (click)="addLink(commands)">Add link</button>
                        <button type="button" (click)="editLink(commands)" [disabled]="!state.link">Edit link</button>
                        <button type="button" (click)="commands.removeLink()" [disabled]="!state.link">Remove link</button>
                    </ng-template>
                </p-texteditor-toolbar>
                <p-texteditor-content />
            </p-texteditor-root>
        </div>
        <app-code [code]="code"></app-code>
    `
})
export class LinkDoc {
    readonly value = signal<string | undefined>('<p>An existing <a href="https://sparkng.bdspark.com" target="_blank">SparkNG link</a> sits in this paragraph — put the cursor inside it and edit or remove it.</p>');

    addLink(commands: TextEditorCommands): void {
        const url = prompt('Link URL', 'https://');
        if (url) commands.insertLink(url);
    }

    editLink(commands: TextEditorCommands): void {
        const url = prompt('New URL', 'https://');
        if (url) commands.updateLink(url);
    }

    code = {
        typescript: `commands.insertLink('https://example.com');          // wraps the selection
commands.insertLink('https://example.com', 'label'); // label when collapsed
commands.updateLink('https://other.com');            // link around the cursor
commands.removeLink();                               // unwraps it

// state
<button (click)="commands.removeLink()" [disabled]="!state.link">Remove link</button>`
    };
}
