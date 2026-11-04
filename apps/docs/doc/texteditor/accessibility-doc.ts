import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';

@Component({
    selector: 'accessibility-doc',
    standalone: true,
    imports: [AppDocSectionText],
    template: `
        <app-docsectiontext>
            <h3>Screen Reader</h3>
            <p>
                The editing region is a ProseMirror <code>contenteditable</code> exposed as <code>role="textbox"</code> with <code>aria-multiline="true"</code>. An accessible name is required (WCAG 4.1.2) — provide <code>ariaLabel</code> or
                <code>ariaLabelledby</code> on the root; the default label is <code>"Rich text editor"</code>. <code>readonly</code> and <code>disabled</code> both set <code>aria-readonly="true"</code>.
            </p>
            <p>
                Toolbars render <code>role="toolbar"</code> with <code>aria-orientation</code> and an <code>aria-label</code>. Icon-only buttons carry <code>aria-label</code>, toggles carry <code>aria-pressed</code>. While a slash or mention
                type-ahead is open the region becomes a combobox (<code>aria-expanded</code>, <code>aria-activedescendant</code> against <code>role="listbox"</code>/<code>role="option"</code> entries); block and table menus stay
                <code>role="menu"</code>/<code>menuitem</code>. Upload progress is wrapped in <code>role="status"</code> with <code>aria-live="polite"</code>.
            </p>
            <h3>Keyboard Support</h3>
            <div class="doc-tablewrapper">
                <table class="doc-table">
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Function</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><i>Tab</i></td>
                            <td>Moves focus between toolbar buttons; indents list items and jumps to the next table cell.</td>
                        </tr>
                        <tr>
                            <td><i>Shift + Tab</i></td>
                            <td>Outdents list items and jumps to the previous table cell.</td>
                        </tr>
                        <tr>
                            <td><i>Enter</i></td>
                            <td>New line; splits list items; accepts the highlighted type-ahead option.</td>
                        </tr>
                        <tr>
                            <td><i>Shift + Enter</i></td>
                            <td>Inserts a hard break.</td>
                        </tr>
                        <tr>
                            <td><i>Arrow Keys</i></td>
                            <td>Move the caret; navigate type-ahead and menu entries; move between table cells at boundaries.</td>
                        </tr>
                        <tr>
                            <td><i>Ctrl/Cmd + B / I / U</i></td>
                            <td>Bold, italic and underline.</td>
                        </tr>
                        <tr>
                            <td><i>Ctrl/Cmd + Z</i></td>
                            <td>Undo; <i>Shift + Ctrl/Cmd + Z</i> (or Ctrl/Cmd + Y) redoes.</td>
                        </tr>
                        <tr>
                            <td><i>Shift + Ctrl + 1…6</i></td>
                            <td>Applies heading levels 1 through 6.</td>
                        </tr>
                        <tr>
                            <td><i>Escape</i></td>
                            <td>Closes popovers (type-ahead, context toolbar, block and table menus) and returns focus to the editor.</td>
                        </tr>
                        <tr>
                            <td><i>/</i></td>
                            <td>Opens the slash command palette when its part is mounted (block mode).</td>
                        </tr>
                        <tr>
                            <td><i>@</i></td>
                            <td>Opens the mention menu when its part is mounted.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3>Reduced Motion</h3>
            <p>All overlay animations are disabled under <code>prefers-reduced-motion: reduce</code>.</p>
        </app-docsectiontext>
    `
})
export class AccessibilityDoc {}
