import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, effect, inject, signal } from '@angular/core';
import { TEXTEDITOR_CONTEXT, TextEditorContent, TextEditorRoot, TextEditorToolbar, defineTextEditorPlugin } from '@bdspark/sparkng/texteditor';
import type { CharacterCountStats } from '@bdspark/sparkng/types/texteditor';

/* Plugin definitions — the canonical copy-in pattern from the docs. */

const uppercasePlugin = defineTextEditorPlugin('uppercase', ({ getSelectedText, replaceSelection }) => ({
    commands: {
        toUpperCase: () => {
            const text = getSelectedText();
            if (text) replaceSelection(text.toUpperCase());
        }
    }
}));

import { Plugin } from 'prosemirror-state';

const characterCountPlugin = defineTextEditorPlugin<{ limit?: number }>('characterCount', (ctx) => {
    const listeners: ((stats: CharacterCountStats) => void)[] = [];

    const compute = (): CharacterCountStats => {
        const view: any = ctx.getView();
        const doc = view?.state?.doc;
        const text = doc ? doc.textBetween(0, doc.content.size, ' ', ' ') : '';
        const characters = text.replace(/s/g, '').length;
        const words = text.trim() ? text.trim().split(/s+/).length : 0;
        const limit = ctx.options?.limit ?? 0;
        return { characters, words, overLimit: limit > 0 && characters > limit };
    };

    const notify = () => {
        const stats = compute();
        listeners.forEach((listener) => listener(stats));
    };

    ctx.registerProseMirrorPlugin(
        new Plugin({
            view: () => ({ update: () => notify() })
        })
    );

    return {
        commands: {
            getStats: compute,
            characters: () => compute().characters,
            words: () => compute().words,
            isOverLimit: () => compute().overLimit,
            onChange: (callback: (stats: CharacterCountStats) => void) => {
                listeners.push(callback);
                callback(compute());
                return () => {
                    const index = listeners.indexOf(callback);
                    if (index >= 0) listeners.splice(index, 1);
                };
            }
        }
    };
});

/* Counter widget reading the plugin commands through the root context. */
@Component({
    selector: 'counter-display',
    standalone: true,
    template: `
        <span [style.fontWeight]="stats().overLimit ? 700 : 400" [style.color]="stats().overLimit ? '#dc2626' : 'inherit'">{{ stats().characters }}</span>
        <span>&nbsp;chars · {{ stats().words }} words</span>
    `
})
export class CounterDisplay {
    readonly ctx = inject(TEXTEDITOR_CONTEXT);
    readonly stats = signal<CharacterCountStats>({ characters: 0, words: 0, overLimit: false });
    private subscribed = false;

    constructor() {
        effect(() => {
            const commands = this.ctx.pluginCommands();
            const counter = commands['characterCount'] as any;
            if (this.subscribed || !counter) return;
            this.subscribed = true;
            counter.onChange((stats: CharacterCountStats) => this.stats.set(stats));
        });
    }
}

@Component({
    selector: 'plugins-doc',
    standalone: true,
    imports: [AppDocSectionText, TextEditorRoot, TextEditorToolbar, TextEditorContent, CounterDisplay, AppCode],
    template: `
        <app-docsectiontext>
            <p>
                A plugin namespaces imperative commands onto <code>pluginCommands[name]</code> with <code>defineTextEditorPlugin(name, install, options?)</code>. Pass definitions — or <code>[plugin, options]</code> tuples — to the
                <code>[plugins]</code> input; the set is frozen once the editor state is created. The install context exposes <code>getSelectedText</code>, <code>replaceSelection</code>, <code>getView</code>,
                <code>registerProseMirrorPlugin</code> and <code>onUnmounted</code>; the third argument can contribute schema nodes/marks and ProseMirror plugins before the first render.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-texteditor-root [(value)]="value" [plugins]="[[characterCountPlugin, { limit: 280 }], uppercasePlugin]">
                <p-texteditor-toolbar>
                    <ng-template pTexteditorToolbarDef let-commands="commands" let-plugins="plugins">
                        <button type="button" (click)="plugins['uppercase']?.['toUpperCase']()">UPPERCASE selection</button>
                        <span style="margin-inline-start: auto; font-size: 0.875rem;"><counter-display /></span>
                    </ng-template>
                </p-texteditor-toolbar>
                <p-texteditor-content />
            </p-texteditor-root>
        </div>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `
})
export class PluginsDoc {
    readonly value = signal<string | undefined>('<p>Select a few words and uppercase them; the live counter is a plugin too.</p>');

    readonly characterCountPlugin = characterCountPlugin;
    readonly uppercasePlugin = uppercasePlugin;

    code = {
        typescript: `import { defineTextEditorPlugin, TEXTEDITOR_CONTEXT, TextEditorModule } from '@bdspark/sparkng/texteditor';
import { inject, signal, effect, Component } from '@angular/core';

export const uppercasePlugin = defineTextEditorPlugin('uppercase', ({ getSelectedText, replaceSelection }) => ({
    commands: {
        toUpperCase: () => {
            const text = getSelectedText();
            if (text) replaceSelection(text.toUpperCase());
        }
    }
}));

// registration — options via [plugin, options] tuples
<p-texteditor-root [plugins]="[[characterCountPlugin, { limit: 280 }], uppercasePlugin]">
    <p-texteditor-toolbar>
        <ng-template pTexteditorToolbarDef let-plugins="plugins">
            <button (click)="plugins['uppercase']?.['toUpperCase']()">UPPERCASE</button>
        </ng-template>
    </p-texteditor-toolbar>
    <p-texteditor-content />
</p-texteditor-root>

// consuming plugin commands from a projected component
export class CounterDisplay {
    readonly ctx = inject(TEXTEDITOR_CONTEXT);
    readonly stats = signal({ characters: 0, words: 0, overLimit: false });

    constructor() {
        effect(() => {
            const cmds = this.ctx.pluginCommands();
            cmds['characterCount']?.onChange((s) => this.stats.set(s));
        });
    }
}`
    };
}
