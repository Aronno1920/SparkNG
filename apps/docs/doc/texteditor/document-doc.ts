import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, signal } from '@angular/core';
import {
    TEXTEDITOR_FILE_SIZE,
    TextEditorContent,
    TextEditorDocumentUpload,
    TextEditorDocumentUploadDropzone,
    TextEditorDocumentUploadDropzoneDef,
    TextEditorDocumentUploadProgress,
    TextEditorDocumentUploadProgressDef,
    TextEditorRoot,
    TextEditorToolbar,
    TextEditorToolbarDef
} from '@bdspark/sparkng/texteditor';
import { TeIcon } from './demo/texteditor-demo-toolbar';

@Component({
    selector: 'document-doc',
    standalone: true,
    imports: [
        AppDocSectionText,
        TextEditorRoot,
        TextEditorToolbar,
        TextEditorContent,
        TextEditorDocumentUpload,
        TextEditorDocumentUploadDropzone,
        TextEditorDocumentUploadProgress,
        AppCode,
        TextEditorToolbarDef,
        TextEditorDocumentUploadDropzoneDef,
        TextEditorDocumentUploadProgressDef,
        TeIcon
    ],
    template: `
        <app-docsectiontext>
            <p>
                <code>p-texteditor-document-upload</code> mirrors the image part for non-image files: every uploaded file is inserted into the content <strong>as a link</strong>. Drop a non-image file on the content or call
                <code>commands.uploadDocuments()</code>. Defaults accept <code>.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip</code> with a 10MB ceiling; both are configurable through the part inputs.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-texteditor-root [(value)]="value" placeholder="Attach a document…">
                <p-texteditor-toolbar>
                    <ng-template pTexteditorToolbarDef let-commands="commands">
                        <button type="button" (click)="commands.uploadDocuments()"><te-icon name="upload" /> Attach document</button>
                    </ng-template>
                </p-texteditor-toolbar>
                <p-texteditor-content />
                <p-texteditor-document-upload [handler]="uploadHandler" [maxFileCount]="3" [maxFileSize]="oneMB">
                    <p-texteditor-document-upload-dropzone>
                        <ng-template pTexteditorDocumentUploadDropzoneDef let-selectFiles="selectFiles" let-onDrop="onDrop">
                            <div (dragover)="$event.preventDefault()" (drop)="onDrop($event)">
                                <button type="button" (click)="selectFiles()"><te-icon name="upload" /> Choose file</button>
                            </div>
                        </ng-template>
                    </p-texteditor-document-upload-dropzone>
                    <p-texteditor-document-upload-progress>
                        <ng-template pTexteditorDocumentUploadProgressDef let-uploads="uploads" let-dismiss="dismiss">
                            @for (entry of uploads; track entry.id) {
                                <div class="te-upload-row">
                                    <span>{{ entry.fileName }}</span>
                                    <span>{{ entry.progress }}%</span>
                                </div>
                            }
                            <button type="button" (click)="dismiss()">Cancel</button>
                        </ng-template>
                    </p-texteditor-document-upload-progress>
                </p-texteditor-document-upload>
            </p-texteditor-root>
        </div>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `,
    styles: [
        `
            .te-upload-row {
                display: flex;
                justify-content: space-between;
                min-width: 260px;
            }
            .p-texteditor-upload-dropzone button {
                display: inline-flex;
                align-items: center;
                gap: 0.375rem;
            }
        `
    ]
})
export class DocumentDoc {
    readonly value = signal<string | undefined>('<p>Uploaded documents land here as download links.</p>');
    readonly oneMB = TEXTEDITOR_FILE_SIZE.ONE_MB;

    readonly uploadHandler = async (_file: File, { onProgress }: { onProgress: (percent: number) => void }): Promise<string> => {
        for (let i = 0; i <= 100; i += 20) {
            await new Promise((resolve) => setTimeout(resolve, 150));
            onProgress(i);
        }
        return 'https://files.example.com/' + encodeURIComponent(_file.name);
    };

    code = {
        typescript: `// mirrors the image part; inserts each uploaded file as a link
<p-texteditor-document-upload [handler]="uploadHandler"
                              [maxFileCount]="3"
                              [maxFileSize]="TEXTEDITOR_FILE_SIZE.TEN_MB">
    <p-texteditor-document-upload-dropzone />
    <p-texteditor-document-upload-progress />
</p-texteditor-document-upload>`
    };
}
