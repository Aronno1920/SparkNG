import { Injectable } from '@angular/core';
import { style } from '@bdspark/sparkng-styles/texteditor';
import { BaseStyle } from '@bdspark/sparkng/base';

const classes = {
    root: 'p-texteditor',
    body: 'p-texteditor-body',
    toolbar: 'p-texteditor-toolbar',
    content: 'p-texteditor-content',
    contextToolbar: 'p-texteditor-context-toolbar',
    contextToolbarMore: 'p-texteditor-context-toolbar-more',
    popoverMenu: 'p-texteditor-popover-menu',
    popoverSubmenu: 'p-texteditor-popover-submenu',
    placeholder: 'p-texteditor-placeholder',
    mention: 'p-texteditor-mention',
    blockControls: 'p-texteditor-block-controls',
    blockMenu: 'p-texteditor-block-menu',
    blockDropIndicator: 'p-texteditor-block-drop-indicator',
    tableOverlay: 'p-texteditor-table-overlay',
    tableTrigger: 'p-texteditor-table-trigger',
    tableAdd: 'p-texteditor-table-add',
    navigator: 'p-texteditor-navigator',
    upload: 'p-texteditor-upload'
};

@Injectable()
export class TextEditorStyle extends BaseStyle {
    name = 'texteditor';

    style = style;

    classes = classes;
}

/**
 *
 * TextEditor is a ProseMirror based rich text editor built from headless parts.
 *
 * [Live Demo](https://sparkng.bdspark.com/texteditor)
 *
 * @module texteditorstyle
 *
 */
export enum TextEditorClasses {
    /**
     * Class name of the root element
     */
    root = 'p-texteditor',
    /**
     * Class name of the body element
     */
    body = 'p-texteditor-body',
    /**
     * Class name of the toolbar element
     */
    toolbar = 'p-texteditor-toolbar',
    /**
     * Class name of the content element
     */
    content = 'p-texteditor-content',
    /**
     * Class name of the context toolbar element
     */
    contextToolbar = 'p-texteditor-context-toolbar',
    /**
     * Class name of the context toolbar more element
     */
    contextToolbarMore = 'p-texteditor-context-toolbar-more',
    /**
     * Class name of the popover menu element
     */
    popoverMenu = 'p-texteditor-popover-menu',
    /**
     * Class name of the popover submenu element
     */
    popoverSubmenu = 'p-texteditor-popover-submenu',
    /**
     * Class name of the mention chip element
     */
    mention = 'p-texteditor-mention',
    /**
     * Class name of the block controls element
     */
    blockControls = 'p-texteditor-block-controls',
    /**
     * Class name of the block drop indicator element
     */
    blockDropIndicator = 'p-texteditor-block-drop-indicator',
    /**
     * Class name of the table overlay element
     */
    tableOverlay = 'p-texteditor-table-overlay',
    /**
     * Class name of the navigator element
     */
    navigator = 'p-texteditor-navigator'
}

export interface TextEditorStyle extends BaseStyle {}
