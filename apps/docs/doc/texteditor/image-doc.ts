import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component, signal } from '@angular/core';
import {
    TEXTEDITOR_FILE_SIZE,
    TextEditorContent,
    TextEditorImageUpload,
    TextEditorImageUploadDropzone,
    TextEditorImageUploadDropzoneDef,
    TextEditorImageUploadProgress,
    TextEditorImageUploadProgressDef,
    TextEditorRoot,
    TextEditorToolbar,
    TextEditorToolbarDef
} from '@bdspark/sparkng/texteditor';
import type { TextEditorFileRejectEvent } from '@bdspark/sparkng/types/texteditor';
import { TeIcon } from './demo/texteditor-demo-toolbar';

@Component({
    selector: 'image-doc',
    standalone: true,
    imports: [
        AppDocSectionText,
        TextEditorRoot,
        TextEditorToolbar,
        TextEditorContent,
        TextEditorImageUpload,
        TextEditorImageUploadDropzone,
        TextEditorImageUploadProgress,
        AppCode,
        TextEditorToolbarDef,
        TextEditorImageUploadDropzoneDef,
        TextEditorImageUploadProgressDef,
        TeIcon
    ],
    template: `
        <app-docsectiontext>
            <p>
                Images enter the document two ways: <code>commands.insertImage(src)</code> inserts directly from a URL, while <code>commands.uploadImages()</code> — or dropping an image on the content — opens the upload surface. The handler contract
                is <code>(file, {{ '{' }}onProgress, signal{{ '}' }}) =&gt; Promise&lt;url&gt;</code>; forward the <code>AbortSignal</code> to <code>fetch</code> so dismissing cancels the in-flight request. Validation (<code>maxFileCount</code>,
                <code>maxFileSize</code>, <code>allowedTypes</code>) is a UX guard — the server must re-validate. Data URLs accept raster images but never SVG.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-texteditor-root [(value)]="value" placeholder="Insert or upload an image…">
                <p-texteditor-toolbar>
                    <ng-template pTexteditorToolbarDef let-commands="commands">
                        <button type="button" (click)="commands.insertImage(demoImage)"><te-icon name="image" /> Insert URL</button>
                        <button type="button" (click)="commands.uploadImages()"><te-icon name="upload" /> Upload image</button>
                    </ng-template>
                </p-texteditor-toolbar>
                <p-texteditor-content />
                <p-texteditor-image-upload [handler]="uploadHandler" [maxFileCount]="3" [maxFileSize]="oneMB" (reject)="onFileReject($event)">
                    <p-texteditor-image-upload-dropzone>
                        <ng-template pTexteditorImageUploadDropzoneDef let-selectFiles="selectFiles" let-onDrop="onDrop">
                            <div (dragover)="$event.preventDefault()" (drop)="onDrop($event)">
                                <button type="button" (click)="selectFiles()"><te-icon name="upload" /> Choose image</button>
                            </div>
                        </ng-template>
                    </p-texteditor-image-upload-dropzone>
                    <p-texteditor-image-upload-progress>
                        <ng-template pTexteditorImageUploadProgressDef let-uploads="uploads" let-dismiss="dismiss">
                            @for (entry of uploads; track entry.id) {
                                <div class="te-upload-row">
                                    <span>{{ entry.fileName }}</span>
                                    <span class="te-upload-bar"><span [style.width.%]="entry.progress"></span></span>
                                    <span>{{ entry.progress }}%</span>
                                </div>
                            }
                            <button type="button" (click)="dismiss()">Cancel</button>
                        </ng-template>
                    </p-texteditor-image-upload-progress>
                </p-texteditor-image-upload>
            </p-texteditor-root>
        </div>
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    `,
    styles: [
        `
            .te-upload-row {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                min-width: 260px;
            }
            .p-texteditor-upload-dropzone button {
                display: inline-flex;
                align-items: center;
                gap: 0.375rem;
            }
            .te-upload-bar {
                flex: 1;
                height: 4px;
                border-radius: 2px;
                background: #e2e8f0;
                overflow: hidden;
            }
            .te-upload-bar > span {
                display: block;
                height: 100%;
                background: #3b82f6;
            }
        `
    ]
})
export class ImageDoc {
    readonly value = signal<string | undefined>('<p>Insert from a URL or upload a local image — uploads render a placeholder that resolves to the uploaded URL.</p>');
    readonly demoImage = 'https://primefaces.org/cdn/primevue/images/nature/nature4.jpg';
    readonly oneMB = TEXTEDITOR_FILE_SIZE.ONE_MB;

    readonly uploadHandler = async (_file: File, { onProgress }: { onProgress: (percent: number) => void }): Promise<string> => {
        for (let i = 0; i <= 100; i += 10) {
            await new Promise((resolve) => setTimeout(resolve, 200));
            onProgress(i);
        }
        return this.demoImage;
    };

    onFileReject({ files, reason }: TextEditorFileRejectEvent): void {
        if (reason === 'max-file-count') alert(`Too many files (max 3). You selected ${files.length}.`);
        else if (reason === 'max-file-size') alert(`Files too large (max 1MB): ${files.map((f) => f.name).join(', ')}`);
        else alert(`Unsupported file type: ${files.map((f) => f.name).join(', ')}`);
    }

    code = {
        typescript: `import { TEXTEDITOR_FILE_SIZE, TextEditorModule } from '@bdspark/sparkng/texteditor';

readonly oneMB = TEXTEDITOR_FILE_SIZE.ONE_MB;

readonly uploadHandler = async (file: File, { onProgress, signal }: any): Promise<string> => {
    return uploadToServer(file, { signal, onProgress }); // forward the AbortSignal
};

onFileReject({ files, reason }: { files: File[]; reason: string }) {
    // reason: 'max-file-count' | 'max-file-size' | 'file-type'
}`
    };
}
