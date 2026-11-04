/**
 * @file
 * The TextEditor plugin system: `defineTextEditorPlugin` and the plugin context.
 *
 * A plugin namespaces imperative commands onto `pluginCommands[name]`, may
 * contribute schema nodes/marks, and may attach ProseMirror plugins at editor
 * creation time. The plugin set is frozen once the editor state is created —
 * every plugin must be passed to the `[plugins]` input on first render.
 */

import type { TextEditorPluginContext, TextEditorPluginDefinition } from '@bdspark/sparkng/types/texteditor';

export { TextEditorPluginContext, TextEditorPluginDefinition };

/**
 * Creates a plugin definition consumable by the `[plugins]` input of
 * `p-texteditor-root`. Pass options with a `[plugin, options]` tuple.
 *
 * @example
 * ```ts
 * export const uppercasePlugin = defineTextEditorPlugin('uppercase', ({ getSelectedText, replaceSelection }) => ({
 *     commands: {
 *         toUpperCase: () => {
 *             const text = getSelectedText();
 *             if (text) replaceSelection(text.toUpperCase());
 *         }
 *     }
 * }));
 * ```
 * @group Plugins
 */
export function defineTextEditorPlugin<Options = any, Commands extends Record<string, (...args: any[]) => any> = Record<string, (...args: any[]) => any>>(
    name: string,
    install: (ctx: TextEditorPluginContext<Options>) => { commands?: Commands } | void,
    options?: TextEditorPluginDefinition<Options, Commands>['options']
): TextEditorPluginDefinition<Options, Commands> {
    return { name, install, options };
}

/**
 * A `[plugin, options]` tuple accepted by the `plugins` input.
 * @group Plugins
 */
export type TextEditorPluginEntry = [TextEditorPluginDefinition<any, any>, any?] | TextEditorPluginDefinition<any, any>;

/**
 * Resolves an entry into `{ definition, options }`.
 */
export function resolvePluginEntry(entry: TextEditorPluginEntry): { definition: TextEditorPluginDefinition<any, any>; options: any } {
    if (Array.isArray(entry)) {
        return { definition: entry[0] as TextEditorPluginDefinition<any, any>, options: entry[1] };
    }
    return { definition: entry as TextEditorPluginDefinition<any, any>, options: undefined };
}
