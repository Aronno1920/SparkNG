/**
 * @file
 * `p-texteditor-content`: the editable region. Mounts the ProseMirror view
 * (created by the root) into its host element.
 */

import { ChangeDetectionStrategy, Component, ElementRef, inject, input, ViewEncapsulation } from '@angular/core';
import { booleanAttribute } from '@angular/core';

@Component({
    selector: 'p-texteditor-content',
    standalone: true,
    template: `
        <div
            #host
            class="p-texteditor-content"
            [attr.data-scope]="'texteditor'"
            [attr.data-part]="'content'"
            [style.height]="height()"
            [attr.data-checklist-placeholder]="checklistPlaceholder() ?? null"
            [attr.aria-placeholder]="placeholder() ?? null"
            [attr.spellcheck]="spellcheck() ? 'true' : 'false'"
        ></div>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-texteditor-content-wrapper',
        '[attr.data-scope]': '"texteditor"'
    }
})
export class TextEditorContent {
    /**
     * Height of the editable region, e.g. `'400px'`.
     * @group Props
     */
    readonly height = input<string | null>(null);
    /**
     * Placeholder text rendered inside empty checklist items, e.g. `"To-Do"`.
     * @group Props
     */
    readonly checklistPlaceholder = input<string | null>(null);
    /**
     * Placeholder forwarded for classic-mode empty editor styling.
     * @group Props
     */
    readonly placeholder = input<string | null>(null);
    /**
     * Whether native spellcheck is enabled on the editable region.
     * @group Props
     */
    readonly spellcheck = input(true, { transform: booleanAttribute });

    readonly elementRef = inject(ElementRef);

    /**
     * The element the ProseMirror view mounts into.
     */
    get hostElement(): HTMLElement {
        return (this.elementRef.nativeElement as HTMLElement).querySelector<HTMLElement>('.p-texteditor-content')!;
    }
}
