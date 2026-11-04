import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, signal } from '@angular/core';
import { TextEditorContent, TextEditorNavigator, TextEditorNavigatorMenu, TextEditorNavigatorMenuDef, TextEditorNavigatorTrigger, TextEditorNavigatorTriggerDef, TextEditorRoot } from '@bdspark/sparkng/texteditor';

@Component({
    selector: 'navigator-doc',
    standalone: true,
    imports: [AppDocSectionText, TextEditorRoot, TextEditorNavigator, TextEditorNavigatorTrigger, TextEditorNavigatorMenu, TextEditorContent, AppCode, TextEditorNavigatorTriggerDef, TextEditorNavigatorMenuDef],
    template: `
        <app-docsectiontext>
            <p>
                The navigator is a heading-outline minimap built from three parts. Mounting <code>p-texteditor-navigator</code> enables heading tracking (it renders nothing); the trigger is a focusable rail opening on hover, focus, Enter, Space or
                ArrowDown; the menu lists the outline with <code>scrollTo(pos)</code> navigation and highlights the active heading while the document scrolls.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-texteditor-root [(value)]="value" [navigator]="true">
                <p-texteditor-navigator>
                    <p-texteditor-navigator-trigger>
                        <ng-template pTexteditorNavigatorTriggerDef let-headings="headings" let-activeIndex="activeIndex">
                            <span class="te-nav-count">{{ headings.length }} headings</span>
                        </ng-template>
                    </p-texteditor-navigator-trigger>
                    <p-texteditor-navigator-menu>
                        <ng-template pTexteditorNavigatorMenuDef let-headings="headings" let-activeIndex="activeIndex" let-scrollTo="scrollTo">
                            @for (heading of headings; track heading.pos; let i = $index) {
                                <button type="button" role="menuitem" [class.te-active]="i === activeIndex" [attr.aria-current]="i === activeIndex ? 'true' : null" [style.paddingLeft.px]="8 + (heading.level - 1) * 12" (click)="scrollTo(heading.pos)">
                                    {{ heading.text || 'Untitled' }}
                                </button>
                            }
                        </ng-template>
                    </p-texteditor-navigator-menu>
                </p-texteditor-navigator>
                <p-texteditor-content height="300px" />
            </p-texteditor-root>
        </div>
        <app-code [code]="code"></app-code>
    `,
    styles: [
        `
            .te-nav-count {
                font-size: 0.75rem;
                padding: 0 0.375rem;
                white-space: nowrap;
            }
            .te-active {
                background: #f1f5f9;
            }
        `
    ]
})
export class NavigatorDoc {
    readonly value = signal<string | undefined>(
        '<h1>Annual Report</h1><p>Scroll the document and watch the active heading follow.</p><h2>Overview</h2><p>The navigator extracts every heading on document change and reports the visible one during scrolling.</p><h2>Details</h2><p>Clicking an outline entry scrolls that heading into view and moves the caret.</p><h3>Metrics</h3><p>Nested levels indent in the outline.</p><h3>Notes</h3><p>Everything is derived from the document — no manual sync.</p>'
    );

    code = {
        typescript: `import { Component, signal } from '@angular/core';
import { TextEditorContent, TextEditorNavigator, TextEditorNavigatorMenu, TextEditorNavigatorTrigger, TextEditorRoot } from '@bdspark/sparkng/texteditor';

@Component({
    selector: 'my-editor',
    standalone: true,
    imports: [TextEditorRoot, TextEditorNavigator, TextEditorNavigatorTrigger, TextEditorNavigatorMenu, TextEditorContent, TextEditorNavigatorTriggerDef, TextEditorNavigatorMenuDef],
    template: \`
        <p-texteditor-root [(value)]="value" [navigator]="true">
            <p-texteditor-navigator>
                <p-texteditor-navigator-trigger>
                    <ng-template pTexteditorNavigatorTriggerDef let-headings="headings">
                        <div role="button" aria-label="Document outline">{{ headings.length }} headings</div>
                    </ng-template>
                </p-texteditor-navigator-trigger>
                <p-texteditor-navigator-menu>
                    <ng-template pTexteditorNavigatorMenuDef let-headings="headings" let-activeIndex="activeIndex" let-scrollTo="scrollTo">
                        @for (h of headings; track h.pos; let i = \$index) {
                            <button role="menuitem" [attr.aria-current]="i === activeIndex ? 'true' : null"
                                    (click)="scrollTo(h.pos)">{{ h.text }}</button>
                        }
                    </ng-template>
                </p-texteditor-navigator-menu>
            </p-texteditor-navigator>
            <p-texteditor-content height="300px" />
        </p-texteditor-root>
    \`
})
export class MyEditor {
    value = signal('<h1>Doc</h1><p>…</p>');
}`
    };
}
