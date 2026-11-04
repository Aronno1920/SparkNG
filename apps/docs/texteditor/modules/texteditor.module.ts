/**
 * @file
 * NgModule aggregating every TextEditor part; standalone parts are also
 * exported individually for tree shaking.
 */

import { NgModule } from '@angular/core';
import { TextEditorRoot, TEXTEDITOR_FILE_SIZE } from '../components/texteditor-root';
import { TextEditorContent } from '../components/texteditor-content';
import { TextEditorContextToolbar, TextEditorContextToolbarMore, TextEditorContextToolbarDef, TextEditorToolbar, TextEditorToolbarDef } from '../components/texteditor-toolbar';
import { TextEditorMentionMenu, TextEditorMentionMenuDef, TextEditorSlashMenu, TextEditorSlashMenuDef } from '../components/texteditor-menus';
import { TextEditorBlockControls, TextEditorBlockControlsDef, TextEditorBlockMenu, TextEditorBlockMenuDef, TextEditorBlockSubmenu, TextEditorBlockSubmenuDef } from '../components/texteditor-block';
import {
    TextEditorTableCellMenu,
    TextEditorTableCellMenuDef,
    TextEditorTableCellSubmenu,
    TextEditorTableCellSubmenuDef,
    TextEditorTableColumnMenu,
    TextEditorTableColumnMenuDef,
    TextEditorTableColumnSubmenu,
    TextEditorTableColumnSubmenuDef,
    TextEditorTableControls,
    TextEditorTableControlsDef,
    TextEditorTableRowMenu,
    TextEditorTableRowMenuDef,
    TextEditorTableRowSubmenu,
    TextEditorTableRowSubmenuDef
} from '../components/texteditor-tables';
import {
    TextEditorDocumentUpload,
    TextEditorDocumentUploadDropzone,
    TextEditorDocumentUploadDropzoneDef,
    TextEditorDocumentUploadProgress,
    TextEditorDocumentUploadProgressDef,
    TextEditorImageUpload,
    TextEditorImageUploadDropzone,
    TextEditorImageUploadDropzoneDef,
    TextEditorImageUploadProgress,
    TextEditorImageUploadProgressDef
} from '../components/texteditor-uploads';
import { TextEditorNavigator, TextEditorNavigatorMenu, TextEditorNavigatorMenuDef, TextEditorNavigatorTrigger, TextEditorNavigatorTriggerDef } from '../components/texteditor-navigator';

export const TEXTEDITOR_PARTS = [
    TextEditorRoot,
    TextEditorContent,
    TextEditorToolbar,
    TextEditorToolbarDef,
    TextEditorContextToolbar,
    TextEditorContextToolbarDef,
    TextEditorContextToolbarMore,
    TextEditorSlashMenu,
    TextEditorSlashMenuDef,
    TextEditorMentionMenu,
    TextEditorMentionMenuDef,
    TextEditorBlockControls,
    TextEditorBlockControlsDef,
    TextEditorBlockMenu,
    TextEditorBlockMenuDef,
    TextEditorBlockSubmenu,
    TextEditorBlockSubmenuDef,
    TextEditorTableControls,
    TextEditorTableControlsDef,
    TextEditorTableColumnMenu,
    TextEditorTableColumnMenuDef,
    TextEditorTableColumnSubmenu,
    TextEditorTableColumnSubmenuDef,
    TextEditorTableRowMenu,
    TextEditorTableRowMenuDef,
    TextEditorTableRowSubmenu,
    TextEditorTableRowSubmenuDef,
    TextEditorTableCellMenu,
    TextEditorTableCellMenuDef,
    TextEditorTableCellSubmenu,
    TextEditorTableCellSubmenuDef,
    TextEditorImageUpload,
    TextEditorImageUploadDropzone,
    TextEditorImageUploadDropzoneDef,
    TextEditorImageUploadProgress,
    TextEditorImageUploadProgressDef,
    TextEditorDocumentUpload,
    TextEditorDocumentUploadDropzone,
    TextEditorDocumentUploadDropzoneDef,
    TextEditorDocumentUploadProgress,
    TextEditorDocumentUploadProgressDef,
    TextEditorNavigator,
    TextEditorNavigatorTrigger,
    TextEditorNavigatorTriggerDef,
    TextEditorNavigatorMenu,
    TextEditorNavigatorMenuDef
];

/**
 * Imports and exports every TextEditor part for NgModule-based consumers.
 * @group Modules
 */
@NgModule({
    imports: [...TEXTEDITOR_PARTS],
    exports: [...TEXTEDITOR_PARTS]
})
export class TextEditorModule {}

export { TEXTEDITOR_FILE_SIZE };
