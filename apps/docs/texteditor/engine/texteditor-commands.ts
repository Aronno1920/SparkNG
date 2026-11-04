/**
 * @file
 * The imperative command surface (`TextEditorCommands`) built on ProseMirror.
 */

import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Schema, Node as PMNode, MarkType } from 'prosemirror-model';
import { toggleMark, setBlockType, wrapIn, lift, chainCommands, exitCode, baseKeymap } from 'prosemirror-commands';
import { wrapInList, liftListItem, sinkListItem } from 'prosemirror-schema-list';
import { undo, redo } from 'prosemirror-history';
import { CellSelection } from 'prosemirror-tables';
import type { TextEditorCommands, TextEditorImageAttrs, TextEditorTextAlign } from '@bdspark/sparkng/types/texteditor';
import { safeUrl } from './texteditor-schema';

/**
 * Hooks the commands rely on; implemented by the root component.
 */
export interface TextEditorCommandDeps {
    view: () => EditorView | null;
    schema: () => Schema;
    openImageUpload: () => void;
    openDocumentUpload: () => void;
    print: () => void;
}

function applyMarkWithAttrs(state: EditorState, dispatch: ((tr: Transaction) => void) | undefined, type: MarkType, attrs: Record<string, string>): boolean {
    const sel: any = state.selection;
    const { empty, $from, to, from, storedMarks } = sel;
    if (empty) {
        const active = (storedMarks ?? $from.marks()).some((m) => m.type === type && Object.keys(attrs).every((k) => (m.attrs as any)[k] === (attrs as any)[k]));
        if (dispatch) {
            if (active) dispatch(state.tr.removeStoredMark(type));
            else dispatch(state.tr.removeStoredMark(type).addStoredMark(type.create(attrs)));
        }
        return true;
    }
    if (dispatch) {
        // Replace any existing value of this mark so colors/fonts never stack.
        dispatch(state.tr.removeMark(from, to, type).addMark(from, to, type.create(attrs)));
    }
    return true;
}

function hasAncestor(state: EditorState, name: string): boolean {
    for (let depth = state.selection.$from.depth; depth > 0; depth--) {
        if (state.selection.$from.node(depth).type.name === name) return true;
    }
    return false;
}

function toggleWrapInList(state: EditorState, dispatch: ((tr: Transaction) => void) | undefined, view: EditorView, listType: string, itemType: string): boolean {
    const schema = state.schema;
    const list = schema.nodes[listType];
    const item = schema.nodes[itemType];
    if (!list || !item) return false;

    if (hasAncestor(state, listType)) {
        return liftListItem(item)(state, dispatch, view);
    }
    return wrapInList(list)(state, dispatch, view);
}

function setAlign(state: EditorState, dispatch: ((tr: Transaction) => void) | undefined, alignment: string): boolean {
    const { $from, from, to } = state.selection;
    const block = $from.parent;
    if (!('align' in (block.type.spec.attrs ?? {}))) return false;
    let tr = state.tr;
    let applicable = false;
    state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.isBlock && 'align' in (node.type.spec.attrs ?? {}) && (node.type === block.type || node.type.name === 'paragraph' || node.type.name === 'heading')) {
            const target = node.attrs.align === alignment ? null : alignment;
            tr = tr.setNodeMarkup(pos, undefined, { ...node.attrs, align: target });
            applicable = true;
        }
        return true;
    });
    if (!applicable) {
        const target = block.attrs.align === alignment ? null : alignment;
        tr = tr.setNodeMarkup($from.before(), undefined, { ...block.attrs, align: target });
    }
    if (dispatch) dispatch(tr.scrollIntoView());
    return true;
}

function buildTable(schema: Schema, rows: number, cols: number): PMNode {
    const cell = schema.nodes.table_cell;
    const rowType = schema.nodes.table_row;
    const tableType = schema.nodes.table;
    const tableRows: any[] = [];
    for (let r = 0; r < rows; r++) {
        const cells: any[] = [];
        for (let c = 0; c < cols; c++) {
            cells.push(cell.createAndFill(null, schema.nodes.paragraph.create())!);
        }
        tableRows.push(rowType.createChecked(null, cells));
    }
    return tableType.createChecked(null, tableRows);
}

/**
 * Creates the `TextEditorCommands` implementation for a given editor accessor.
 */
export function createTextEditorCommands(deps: TextEditorCommandDeps): TextEditorCommands {
    const run = (command: (state: EditorState, dispatch?: (tr: Transaction) => void, view?: EditorView) => boolean): boolean => {
        const view = deps.view();
        if (!view) return false;
        const ok = command(view.state, view.dispatch, view);
        view.focus();
        return ok;
    };

    const mark = (name: string) => () => {
        const view = deps.view();
        if (!view) return;
        run(toggleMark(view.state.schema.marks[name]));
    };

    const styleMark = (name: string, attr: string) => (value: string) => {
        const view = deps.view();
        if (!view) return;
        const type = view.state.schema.marks[name];
        if (!type) return;
        applyMarkWithAttrs(view.state, view.dispatch, type, { [attr]: value });
        view.focus();
    };

    const commands: TextEditorCommands = {
        bold: mark('bold'),
        italic: mark('italic'),
        underline: mark('underline'),
        strikethrough: mark('strikethrough'),
        subscript: mark('subscript'),
        superscript: mark('superscript'),
        code: mark('code'),
        fontFamily: styleMark('fontFamily', 'family'),
        fontSize: styleMark('fontSize', 'size'),
        foregroundColor: styleMark('textColor', 'color'),
        backgroundColor: styleMark('backgroundColor', 'color'),

        clearFormatting(): void {
            const view = deps.view();
            if (!view) return;
            const { from, to } = view.state.selection;
            const styleMarks = ['textColor', 'backgroundColor', 'fontFamily', 'fontSize'].map((n) => view.state.schema.marks[n]).filter(Boolean);
            let tr = view.state.tr;
            for (const type of styleMarks) tr = tr.removeMark(from, to, type as MarkType);
            view.dispatch(tr);
            view.focus();
        },

        heading(level: number): void {
            const view = deps.view();
            if (!view) return;
            const { $from } = view.state.selection;
            const headingType = view.state.schema.nodes.heading;
            const paragraphType = view.state.schema.nodes.paragraph;
            if ($from.parent.type === headingType && $from.parent.attrs.level === level) {
                run(setBlockType(paragraphType));
            } else {
                run(setBlockType(headingType, { level }));
            }
        },

        paragraph(): void {
            const view = deps.view();
            if (!view) return;
            run(setBlockType(view.state.schema.nodes.paragraph));
        },

        blockquote(): void {
            const view = deps.view();
            if (!view) return;
            const type = view.state.schema.nodes.blockquote;
            if (hasAncestor(view.state, 'blockquote')) run(lift);
            else run(wrapIn(type));
        },

        codeBlock(): void {
            const view = deps.view();
            if (!view) return;
            const { $from } = view.state.selection;
            const codeType = view.state.schema.nodes.code_block;
            if ($from.parent.type === codeType) run(setBlockType(view.state.schema.nodes.paragraph));
            else run(setBlockType(codeType));
        },

        bulletList(): void {
            const view = deps.view();
            if (!view) return;
            run((state, dispatch, v) => toggleWrapInList(state, dispatch, v as EditorView, 'bullet_list', 'list_item'));
        },

        orderedList(): void {
            const view = deps.view();
            if (!view) return;
            run((state, dispatch, v) => toggleWrapInList(state, dispatch, v as EditorView, 'ordered_list', 'list_item'));
        },

        checkList(): void {
            const view = deps.view();
            if (!view) return;
            run((state, dispatch, v) => toggleWrapInList(state, dispatch, v as EditorView, 'check_list', 'check_item'));
        },

        textAlign(alignment: TextEditorTextAlign): void {
            const view = deps.view();
            if (!view) return;
            run((state, dispatch) => setAlign(state, dispatch, alignment));
        },

        indent(): void {
            const view = deps.view();
            if (!view) return;
            const item = view.state.schema.nodes.list_item ?? view.state.schema.nodes.check_item;
            if (item) run(sinkListItem(item));
        },

        outdent(): void {
            const view = deps.view();
            if (!view) return;
            const schema = view.state.schema;
            const item = hasAncestor(view.state, 'list_item') ? schema.nodes.list_item : hasAncestor(view.state, 'check_item') ? schema.nodes.check_item : undefined;
            if (item) run(liftListItem(item));
        },

        insertHorizontalRule(): void {
            const view = deps.view();
            if (!view) return;
            run((state, dispatch) => {
                if (!dispatch) return false;
                const hr = state.schema.nodes.horizontal_rule;
                dispatch(state.tr.replaceSelectionWith(hr.create()).scrollIntoView());
                return true;
            });
        },

        insertLink(url: string, text?: string): void {
            const view = deps.view();
            if (!view) return;
            const href = safeUrl(url, 'link');
            if (!href) return;
            const linkType = view.state.schema.marks.link;
            const { empty, from, to } = view.state.selection;
            if (empty) {
                const label = text || url;
                run((state, dispatch) => {
                    if (!dispatch) return false;
                    dispatch(state.tr.insertText(label, from, to).addMark(from, from + label.length, linkType.create({ href })));
                    return true;
                });
            } else {
                run((state, dispatch) => {
                    if (!dispatch) return false;
                    dispatch(state.tr.addMark(from, to, linkType.create({ href })));
                    return true;
                });
            }
        },

        updateLink(url: string): void {
            const view = deps.view();
            if (!view) return;
            const href = safeUrl(url, 'link');
            if (!href) return;
            const linkType = view.state.schema.marks.link;
            run((state, dispatch) => {
                if (!dispatch) return false;
                const { from, to } = state.selection;
                let start = from;
                let end = to;
                state.doc.nodesBetween(from, to, (node, pos) => {
                    node.marks.forEach((m) => {
                        if (m.type === linkType) {
                            start = Math.min(start, pos);
                            end = Math.max(end, pos + node.nodeSize);
                        }
                    });
                });
                if (start === from && end === to) return false;
                dispatch(state.tr.removeMark(start, end, linkType).addMark(start, end, linkType.create({ href })));
                return true;
            });
        },

        removeLink(): void {
            const view = deps.view();
            if (!view) return;
            const linkType = view.state.schema.marks.link;
            run((state, dispatch) => {
                if (!dispatch) return false;
                const { from, to } = state.selection;
                let start = from;
                let end = to;
                state.doc.nodesBetween(from, to, (node, pos) => {
                    node.marks.forEach((m) => {
                        if (m.type === linkType) {
                            start = Math.min(start, pos);
                            end = Math.max(end, pos + node.nodeSize);
                        }
                    });
                });
                dispatch(state.tr.removeMark(start, end, linkType));
                return true;
            });
        },

        insertImage(src: string, attrs?: TextEditorImageAttrs): void {
            const view = deps.view();
            if (!view) return;
            const safe = safeUrl(src, 'image');
            if (!safe) return;
            run((state, dispatch) => {
                if (!dispatch) return false;
                const imageType = state.schema.nodes.image;
                const node = imageType.create({ src: safe, ...(attrs ?? {}) });
                dispatch(state.tr.replaceSelectionWith(node).scrollIntoView());
                return true;
            });
        },

        uploadImages(): void {
            deps.openImageUpload();
        },

        uploadDocuments(): void {
            deps.openDocumentUpload();
        },

        table(rows = 3, cols = 3): void {
            const view = deps.view();
            if (!view) return;
            run((state, dispatch) => {
                if (!dispatch) return false;
                const tableNode = buildTable(state.schema, rows, cols);
                dispatch(state.tr.replaceSelectionWith(tableNode).scrollIntoView());
                return true;
            });
        },

        focus(): void {
            deps.view()?.focus();
        },

        blur(): void {
            const view = deps.view();
            view?.dom.blur();
        },

        undo(): void {
            run(undo as any);
        },

        redo(): void {
            run(redo as any);
        },

        print(): void {
            deps.print();
        }
    };

    return commands;
}

export { chainCommands, exitCode, baseKeymap, liftListItem, sinkListItem, CellSelection };
