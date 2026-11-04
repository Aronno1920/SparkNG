import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, signal, viewChild } from '@angular/core';
import { TextEditorContent, TextEditorRoot, TextEditorToolbar, TextEditorToolbarDef } from '@bdspark/sparkng/texteditor';

@Component({
    selector: 'events-doc',
    standalone: true,
    imports: [AppDocSectionText, TextEditorRoot, TextEditorToolbar, TextEditorContent, AppCode, TextEditorToolbarDef],
    template: `
        <app-docsectiontext>
            <p>
                Document edits flow through <code>[(value)]</code> / <code>valueChange</code>. <code>selectionUpdate</code> makes caret movement observable without polling, <code>editorCreate</code> fires once when the view is ready, and
                <code>editorFocus</code> / <code>editorBlur</code> track focus. <code>valueChangeDebounce</code> coalesces value emissions (150-300ms for large documents).
            </p>
        </app-docsectiontext>
        <div class="card" style="display: flex; gap: 1rem; align-items: flex-start;">
            <p-texteditor-root [(value)]="value" style="flex: 1" (editorCreate)="push('create')" (selectionUpdate)="push('selection-update')" (editorFocus)="push('focus')" (editorBlur)="push('blur')">
                <p-texteditor-toolbar>
                    <ng-template pTexteditorToolbarDef let-commands="commands">
                        <button type="button" (click)="markdown.set(root.getMarkdown())">Get Markdown</button>
                    </ng-template>
                </p-texteditor-toolbar>
                <p-texteditor-content />
            </p-texteditor-root>
            <div style="min-width: 220px; border-inline-start: 1px solid #cbd5e1; padding-inline-start: 1rem;">
                <strong>Event log</strong>
                <ul style="margin: 0.5rem 0 0; padding-inline-start: 1.25rem; font-size: 0.875rem;">
                    @for (entry of log(); track $index) {
                        <li>{{ entry }}</li>
                    }
                </ul>
                @if (markdown()) {
                    <pre style="margin-top: 0.75rem; font-size: 0.75rem; white-space: pre-wrap;">{{ markdown() }}</pre>
                }
            </div>
        </div>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class EventsDoc {
    readonly root = viewChild(TextEditorRoot);
    readonly value = signal<string | undefined>('<h2>Events &amp; Output</h2><p>Type, move the caret, focus and blur — the log reacts. Click <strong>Get Markdown</strong> to serialize.</p>');
    readonly log = signal<string[]>([]);
    readonly markdown = signal('');

    push(event: string): void {
        this.log.update((prev) => [event, ...prev].slice(0, 8));
    }

    code = {
        typescript: `import { Component, ViewChild, signal } from '@angular/core';
import { TextEditorContent, TextEditorRoot, TextEditorModule } from '@bdspark/sparkng/texteditor';

@Component({
    selector: 'events-demo',
    standalone: true,
    imports: [TextEditorModule, TextEditorToolbarDef],
    template: \`
        <p-texteditor-root #root [(value)]="value"
                           (editorCreate)="onCreate()"
                           (selectionUpdate)="onSelection()"
                           (editorFocus)="onFocus()"
                           (editorBlur)="onBlur()">
            <p-texteditor-content />
        </p-texteditor-root>
    \`
})
export class EventsDemo {
    @ViewChild('root') root!: TextEditorRoot;
    value = signal('');

    onMarkdown() {
        console.log(this.root.getMarkdown());
    }

    onCreate() {}
    onSelection() {}
    onFocus() {}
    onBlur() {}
}`
    };
}
