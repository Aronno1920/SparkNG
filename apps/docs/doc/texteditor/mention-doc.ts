import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, signal } from '@angular/core';
import { TextEditorContent, TextEditorMentionMenu, TextEditorMentionMenuDef, TextEditorRoot } from '@bdspark/sparkng/texteditor';

interface MentionUser {
    id: number;
    name: string;
}

const USERS: MentionUser[] = [
    { id: 1, name: 'Amy Elsner' },
    { id: 2, name: 'Anna Fali' },
    { id: 3, name: 'Asiya Javayant' },
    { id: 4, name: 'Bernardo Dominic' },
    { id: 5, name: 'Elwin Sharvill' },
    { id: 6, name: 'Ioni Bowcher' },
    { id: 7, name: 'Ivan Magalhaes' },
    { id: 8, name: 'Onyama Limba' },
    { id: 9, name: 'Stephen Shaw' },
    { id: 10, name: 'Xuxue Feng' }
];

@Component({
    selector: 'mention-doc',
    standalone: true,
    imports: [AppDocSectionText, TextEditorRoot, TextEditorMentionMenu, TextEditorContent, AppCode, TextEditorMentionMenuDef],
    template: `
        <app-docsectiontext>
            <p>
                Mounting <code>p-texteditor-mention-menu</code> enables the <code>@</code> type-ahead in the runtime. The <code>handler</code> resolves candidates for the current query (sync or async), <code>filterField</code> drives substring
                filtering, and <code>template</code> renders the inserted chip. Keyboard support follows the ARIA combobox pattern: arrows move, Enter accepts, Escape dismisses.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-texteditor-root [(value)]="value" placeholder="Type @ to mention a user">
                <p-texteditor-mention-menu [handler]="mentionHandler" filterField="name" [template]="mentionTemplate">
                    <ng-template pTexteditorMentionMenuDef let-items="items" let-commands="commands" let-filterText="filterText">
                        @if (items.length === 0) {
                            <div class="te-empty">No matches for "{{ filterText }}"</div>
                        }
                        @for (item of items; track item.id) {
                            <button type="button" role="option" (click)="commands.select(item)">{{ item.name }}</button>
                        }
                    </ng-template>
                </p-texteditor-mention-menu>
                <p-texteditor-content />
            </p-texteditor-root>
        </div>
        <app-code [code]="code"></app-code>
    `,
    styles: [
        `
            .te-empty {
                padding: 0.5rem 0.75rem;
                color: #64748b;
            }
        `
    ]
})
export class MentionDoc {
    readonly value = signal<string | undefined>('<p>Ping a teammate with @…</p>');

    readonly mentionHandler = (query: string): MentionUser[] => {
        if (!query) return USERS;
        return USERS.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));
    };

    readonly mentionTemplate = (data: MentionUser): string => `@${data.name}`;

    code = {
        typescript: `import { Component, signal } from '@angular/core';
import { TextEditorContent, TextEditorMentionMenu, TextEditorRoot } from '@bdspark/sparkng/texteditor';

@Component({
    selector: 'my-editor',
    standalone: true,
    imports: [TextEditorRoot, TextEditorMentionMenu, TextEditorContent, TextEditorMentionMenuDef],
    template: \`
        <p-texteditor-root [(value)]="value" placeholder="Type @ to mention a user">
            <p-texteditor-mention-menu [handler]="mentionHandler" filterField="name" [template]="mentionTemplate">
                <ng-template pTexteditorMentionMenuDef let-items="items" let-commands="commands" let-filterText="filterText">
                    @if (items.length === 0) {
                        <div>No matches for "{{ filterText }}"</div>
                    }
                    @for (item of items; track item.id) {
                        <button role="option" (click)="commands.select(item)">{{ item.name }}</button>
                    }
                </ng-template>
            </p-texteditor-mention-menu>
            <p-texteditor-content />
        </p-texteditor-root>
    \`
})
export class MyEditor {
    value = signal<string | undefined>(undefined);
    mentionHandler = (query: string) => USERS;
    mentionTemplate = (data: (typeof USERS)[number]) => \`@\${data.name}\`;
}`
    };
}
