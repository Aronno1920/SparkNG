/**
 * @file
 * Derives the {@link TextEditorFormatState} snapshot from the current ProseMirror state.
 */

import { EditorState } from 'prosemirror-state';
import { Mark, MarkType, Node as PMNode } from 'prosemirror-model';
import { undoDepth, redoDepth } from 'prosemirror-history';
import type { TextEditorFormatState } from '@bdspark/sparkng/types/texteditor';

function markActive(state: EditorState, type: MarkType): boolean {
    const { from, $from, to, empty, storedMarks } = state.selection as any;
    if (empty) return !!type.isInSet((storedMarks ?? $from.marks()) as Mark[]);
    return state.doc.rangeHasMark(from, to, type) || !!type.isInSet($from.marks());
}

/**
 * Collects a single attribute value across the selection. Returns `null` when
 * the selection mixes more than one value (or has none), mirroring PrimeUI
 * semantics where selects read as cleared on mixed selections.
 */
function markAttrValue(state: EditorState, type: MarkType, attr: string): string | null {
    const { from, to, empty, $from, storedMarks } = state.selection as any;
    if (empty) {
        const mark = ((storedMarks ?? $from.marks()) as Mark[]).find((m) => m.type === type);
        return mark ? (mark.attrs[attr] ?? null) : null;
    }
    let value: string | null | undefined;
    state.doc.nodesBetween(from, to, (node: PMNode) => {
        for (const mark of node.marks) {
            if (mark.type === type) {
                const v = mark.attrs[attr] ?? null;
                if (value === undefined) value = v;
                else if (value !== v) value = null;
            }
        }
        return true;
    });
    return value === undefined ? null : value;
}

function ancestor(state: EditorState, name: string): PMNode | null {
    const { $from } = state.selection;
    for (let depth = $from.depth; depth > 0; depth--) {
        const node = $from.node(depth);
        if (node.type.name === name) return node;
    }
    return null;
}

function hasAncestor(state: EditorState, name: string): boolean {
    return ancestor(state, name) !== null;
}

function findLinkMark(state: EditorState, type: MarkType): Mark | null {
    const { $from, from, to, empty } = state.selection as any;
    if (empty) {
        return ((($from.marks() as Mark[]) || []).find((m) => m.type === type) ?? null) as Mark | null;
    }
    let found: Mark | null = null;
    state.doc.nodesBetween(from, to, (node: PMNode) => {
        const mark = node.marks.find((m) => m.type === type);
        if (mark) found = mark;
        return true;
    });
    return found;
}

/**
 * Builds the format state snapshot for the given editor state.
 */
export function getFormatState(state: EditorState): TextEditorFormatState {
    const marks = state.schema.marks;
    const { $from, empty } = state.selection as any;
    const parent: PMNode = $from.parent;
    const linkMark = findLinkMark(state, marks.link);

    let textAlign: string | null = null;
    if ('align' in (parent.type.spec.attrs ?? {})) {
        const align = parent.attrs.align;
        let mixed = false;
        if (!empty) {
            const { from, to } = state.selection as any;
            state.doc.nodesBetween(from, to, (node: PMNode) => {
                if (node.isBlock && 'align' in (node.type.spec.attrs ?? {}) && node.attrs.align !== align) mixed = true;
                return true;
            });
        }
        textAlign = mixed ? null : align;
    }

    return {
        canUndo: undoDepth(state) > 0,
        canRedo: redoDepth(state) > 0,
        hasSelection: !(state.selection as any).empty,
        heading: parent.type.name === 'heading' ? parent.attrs.level : null,
        blockquote: hasAncestor(state, 'blockquote'),
        codeBlock: parent.type.name === 'code_block',
        bulletList: hasAncestor(state, 'bullet_list'),
        orderedList: hasAncestor(state, 'ordered_list'),
        checkList: hasAncestor(state, 'check_list'),
        bold: markActive(state, marks.bold),
        italic: markActive(state, marks.italic),
        underline: markActive(state, marks.underline),
        strikethrough: markActive(state, marks.strikethrough),
        subscript: markActive(state, marks.subscript),
        superscript: markActive(state, marks.superscript),
        code: markActive(state, marks.code),
        link: !!linkMark,
        linkUrl: linkMark ? linkMark!.attrs.href : null,
        textAlign,
        fontFamily: markAttrValue(state, marks.fontFamily, 'family'),
        fontSize: markAttrValue(state, marks.fontSize, 'size'),
        foregroundColor: markAttrValue(state, marks.textColor, 'color'),
        backgroundColor: markAttrValue(state, marks.backgroundColor, 'color'),
        inTable: hasAncestor(state, 'table'),
        inCheckList: hasAncestor(state, 'check_list')
    };
}
