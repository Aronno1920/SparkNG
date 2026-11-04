/**
 * @file
 * ProseMirror plugins for the TextEditor: placeholder decorations, slash and
 * mention type-ahead detection, markdown input rules, and the keymap.
 */

import { Plugin, PluginKey, EditorState, Transaction, TextSelection } from 'prosemirror-state';
import { EditorView, Decoration, DecorationSet } from 'prosemirror-view';
import { Schema, MarkType, NodeType, Node as PMNode } from 'prosemirror-model';
import { InputRule, inputRules, wrappingInputRule, textblockTypeInputRule, smartQuotes, ellipsis } from 'prosemirror-inputrules';
import { keymap } from 'prosemirror-keymap';
import { toggleMark, setBlockType, chainCommands, baseKeymap } from 'prosemirror-commands';
import { wrapInList, splitListItem, liftListItem, sinkListItem } from 'prosemirror-schema-list';
import { goToNextCell } from 'prosemirror-tables';
import { history, undo, redo } from 'prosemirror-history';

/* ------------------------------------------------------------------ */
/* Placeholder                                                         */
/* ------------------------------------------------------------------ */

export const placeholderKey = new PluginKey<DecorationSet>('texteditorPlaceholder');

/**
 * Adds `data-placeholder` to empty text blocks so CSS can render hint text.
 * In classic mode only the first empty block is decorated; in block mode every
 * empty block shows the hint.
 */
export function placeholderPlugin(getPlaceholder: () => string, isBlockMode: () => boolean): Plugin {
    return new Plugin({
        key: placeholderKey,
        props: {
            decorations(state: EditorState): DecorationSet {
                const text = getPlaceholder();
                if (!text) return DecorationSet.empty;
                const decorations: Decoration[] = [];
                let decoratedFirst = false;
                state.doc.descendants((node: PMNode, pos: number) => {
                    if (node.isTextblock && node.childCount === 0 && node.type.name !== 'code_block') {
                        if (!isBlockMode() && decoratedFirst) return;
                        decorations.push(Decoration.node(pos, pos + node.nodeSize, { 'data-placeholder': text }));
                        decoratedFirst = true;
                    }
                    return true;
                });
                return DecorationSet.create(state.doc, decorations);
            }
        }
    });
}

/* ------------------------------------------------------------------ */
/* Type-ahead detection (slash & mention)                              */
/* ------------------------------------------------------------------ */

export interface TypeaheadRange {
    active: boolean;
    trigger: '/' | '@';
    from: number;
    to: number;
    text: string;
}

function detectTrigger(state: EditorState, char: '/' | '@'): TypeaheadRange | null {
    const { $from } = state.selection;
    if (!$from.parent.isTextblock || $from.parent.type.name === 'code_block') return null;
    const before = $from.parent.textBetween(0, $from.parentOffset, null, '\ufffc');
    const match = new RegExp(`(?:^|\\s)\\${char}([^\\s${char}]*)$`).exec(before);
    if (!match) return null;
    const text = match[1];
    if (text.length > 32) return null;
    const from = $from.pos - text.length - 1;
    return { active: true, trigger: char, from, to: $from.pos, text };
}

/**
 * Tracks `/` and `@` trigger ranges before the caret and reports changes
 * through a callback; the root keeps the latest ranges and drives the menus.
 */
export function typeaheadPlugin(options: { slashEnabled: () => boolean; mentionEnabled: () => boolean; onChange: (update: { slash: TypeaheadRange | null; mention: TypeaheadRange | null; view: EditorView }) => void }): Plugin {
    return new Plugin({
        view(editorView: EditorView) {
            let last = 'init';
            const check = (view: EditorView) => {
                const slash = options.slashEnabled() ? detectTrigger(view.state, '/') : null;
                const mention = options.mentionEnabled() ? detectTrigger(view.state, '@') : null;
                const key = `${slash ? `/${slash.text}@${slash.from}` : '-'}|${mention ? `@${mention.text}@${mention.from}` : '-'}`;
                if (key !== last) {
                    last = key;
                    options.onChange({ slash, mention, view });
                }
            };
            check(editorView);
            return {
                update(view: EditorView) {
                    check(view);
                }
            };
        }
    });
}

/* ------------------------------------------------------------------ */
/* Markdown input rules                                                */
/* ------------------------------------------------------------------ */

function markRule(regex: RegExp, type: MarkType, attrs: Record<string, any> = {}): InputRule {
    return new InputRule(regex, (state, match, start, end) => {
        if (!match[1]) return null;
        const tr = state.tr.delete(start, end).insertText(match[1], start);
        return tr.addMark(start, start + match[1].length, type.create(attrs));
    });
}

function checkListRule(schema: Schema): InputRule {
    return new InputRule(/^\s*\[([ xX])\]\s$/, (state, match, start, end) => {
        const $start = state.doc.resolve(start);
        const para = $start.parent;
        if (para.type.name !== 'paragraph') return null;
        const pos = $start.before();
        const checked = match[1].toLowerCase() === 'x';
        const rest = para.textContent.slice(match[0].length);
        const paragraph = schema.nodes.paragraph.create(null, rest ? schema.text(rest) : undefined);
        const item = schema.nodes.check_item.create({ checked }, paragraph);
        const list = schema.nodes.check_list.create(null, item);
        const tr = state.tr.replaceWith(pos, pos + para.nodeSize, list);
        const caret = pos + 3 + rest.length;
        return tr.setSelection(TextSelection.create(tr.doc, caret)).scrollIntoView();
    });
}

/**
 * Markdown shortcuts (`#`, `**`, `-`, `>`, `==`, ```), check markers and
 * smart typography. Enabled by the `markdown` input on the root.
 */
export function markdownInputRules(schema: Schema, defaultHighlightColor: string): Plugin {
    const nodes = schema.nodes;
    const marks = schema.marks;
    const rules: InputRule[] = [
        textblockTypeInputRule(/^(#{1,6})\s$/, nodes.heading as NodeType, (match: RegExpMatchArray) => ({ level: match[1].length })),
        textblockTypeInputRule(/^```$/, nodes.code_block as NodeType),
        wrappingInputRule(/^\s*>\s$/, nodes.blockquote as NodeType),
        wrappingInputRule(/^[-*]\s$/, nodes.bullet_list as NodeType),
        wrappingInputRule(/^\d+\.\s$/, nodes.ordered_list as NodeType),
        checkListRule(schema),
        new InputRule(/^(?:---|___)$/, (state, _match, start, end) => state.tr.replaceWith(start - 1, end, nodes.horizontal_rule.create()).scrollIntoView() as Transaction),
        markRule(/(?<=^|\s)\*\*([^*]+)\*\*$/, marks.bold as MarkType),
        markRule(/(?<=^|\s)\*([^*]+)\*$/, marks.italic as MarkType),
        markRule(/(?<=^|\s)~~([^~]+)~~$/, marks.strikethrough as MarkType),
        markRule(/(?<!`)`([^`]+)`$/, marks.code as MarkType),
        markRule(/(?<=^|\s)==([^=]+)==$/, marks.backgroundColor as MarkType, { color: defaultHighlightColor }),
        ...smartQuotes,
        ellipsis
    ];
    return inputRules({ rules });
}

/* ------------------------------------------------------------------ */
/* Keymap                                                              */
/* ------------------------------------------------------------------ */

/**
 * Base keymap: marks, lists, history, table cell navigation and Shift-Enter.
 */
export function buildKeymap(schema: Schema): Plugin {
    const nodes = schema.nodes;
    const marks = schema.marks;
    const bindings: Record<string, any> = {
        'Mod-b': toggleMark(marks.bold),
        'Mod-i': toggleMark(marks.italic),
        'Mod-u': toggleMark(marks.underline),
        'Mod-z': undo,
        'Shift-Mod-z': redo,
        'Mod-y': redo,
        'Shift-Enter': (state: EditorState, dispatch: ((tr: Transaction) => void) | undefined) => {
            if (dispatch) dispatch(state.tr.replaceSelectionWith(nodes.hard_break.create()).scrollIntoView());
            return true;
        },
        Enter: chainCommands(splitListItem(nodes.list_item), splitListItem(nodes.check_item), baseKeymap.Enter as any),
        Tab: chainCommands((state, dispatch) => goToNextCell(1)(state, dispatch), sinkListItem(nodes.list_item), sinkListItem(nodes.check_item)),
        'Shift-Tab': chainCommands(liftListItem(nodes.list_item), liftListItem(nodes.check_item))
    };
    for (let level = 1; level <= 6; level++) {
        bindings[`Shift-Ctrl-${level}`] = setBlockType(nodes.heading, { level });
    }
    return keymap(bindings);
}

/**
 * History plugin with sensible defaults.
 */
export function historyPlugin(): Plugin {
    return history();
}

export { undo, redo };
