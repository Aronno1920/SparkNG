/**
 * @file
 * Upload parts: `p-texteditor-image-upload` and `p-texteditor-document-upload`,
 * each with `-dropzone` and `-progress` sub-parts. Both descend from the same
 * upload surface and share one context (`UPLOAD_CONTEXT`).
 */

import { ChangeDetectionStrategy, Component, ContentChild, Directive, ElementRef, TemplateRef, ViewEncapsulation, computed, effect, forwardRef, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { TextEditorFileRejectEvent, TextEditorUploadDropzoneSlotContext, TextEditorUploadProgressSlotContext, UploadSlotEntry } from '@bdspark/sparkng/types/texteditor';
import { TEXTEDITOR_CONTEXT, UPLOAD_CONTEXT } from '../context/texteditor.context';

/* ------------------------------------------------------------------ */
/* Slot directives                                                     */
/* ------------------------------------------------------------------ */

/** Slot directive for the image upload dropzone template. @group Directives */
@Directive({ selector: '[pTexteditorImageUploadDropzoneDef]', standalone: true })
export class TextEditorImageUploadDropzoneDef {
    static ngTemplateContextGuard(_dir: TextEditorImageUploadDropzoneDef, ctx: unknown): TextEditorUploadDropzoneSlotContext {
        return ctx as TextEditorUploadDropzoneSlotContext;
    }
}

/** Slot directive for the image upload progress template. @group Directives */
@Directive({ selector: '[pTexteditorImageUploadProgressDef]', standalone: true })
export class TextEditorImageUploadProgressDef {
    static ngTemplateContextGuard(_dir: TextEditorImageUploadProgressDef, ctx: unknown): TextEditorUploadProgressSlotContext {
        return ctx as TextEditorUploadProgressSlotContext;
    }
}

/** Slot directive for the document upload dropzone template. @group Directives */
@Directive({ selector: '[pTexteditorDocumentUploadDropzoneDef]', standalone: true })
export class TextEditorDocumentUploadDropzoneDef {
    static ngTemplateContextGuard(_dir: TextEditorDocumentUploadDropzoneDef, ctx: unknown): TextEditorUploadDropzoneSlotContext {
        return ctx as TextEditorUploadDropzoneSlotContext;
    }
}

/** Slot directive for the document upload progress template. @group Directives */
@Directive({ selector: '[pTexteditorDocumentUploadProgressDef]', standalone: true })
export class TextEditorDocumentUploadProgressDef {
    static ngTemplateContextGuard(_dir: TextEditorDocumentUploadProgressDef, ctx: unknown): TextEditorUploadProgressSlotContext {
        return ctx as TextEditorUploadProgressSlotContext;
    }
}

/* ------------------------------------------------------------------ */
/* Shared behavior                                                     */
/* ------------------------------------------------------------------ */

abstract class UploadPartBase {
    readonly editor = inject(TEXTEDITOR_CONTEXT);
    readonly elementRef = inject(ElementRef);

    readonly uploadsSignal = signal<UploadSlotEntry[]>([]);

    get uploads() {
        return this.uploadsSignal;
    }
    readonly kind: 'image' | 'document';

    protected abstract uploadConfig(): {
        handler?: ((file: File, options: { onProgress: (percent: number) => void; signal: AbortSignal }) => Promise<string>) | null;
        maxFileCount?: number | null;
        maxFileSize?: number | null;
        allowedTypes?: string | null;
    };
    protected abstract emitReject(event: TextEditorFileRejectEvent): void;

    constructor(kind: 'image' | 'document') {
        this.kind = kind;
        effect(() => {
            const config = this.uploadConfig();
            this.editor.registerUploadConfig(kind, {
                handler: config.handler ?? undefined,
                maxFileCount: config.maxFileCount ?? undefined,
                maxFileSize: config.maxFileSize ?? undefined,
                allowedTypes: config.allowedTypes ?? undefined
            });
        });
        effect(() => {
            this.uploadsSignal.set(this.editor.uploadEntries(kind));
        });
        this.editor.registerPart(kind === 'image' ? 'imageUpload' : 'documentUpload');
        this.editor.registerUploadRejectHandler(kind, (event) => this.emitReject(event));
    }

    selectFiles(): void {
        this.editor.openUploadPicker(this.kind);
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        const files = Array.from(event.dataTransfer?.files ?? []);
        if (files.length) this.editor.startUploads(this.kind, files);
    }

    dismiss(): void {
        this.editor.dismissUpload(this.kind);
    }
}

/* ------------------------------------------------------------------ */
/* Image upload                                                        */
/* ------------------------------------------------------------------ */

/**
 * Image upload overlay: dropzone plus progress sub-parts. Images are inserted
 * with an upload placeholder that resolves to the uploaded URL.
 * @group Components
 */
@Component({
    selector: 'p-texteditor-image-upload',
    standalone: true,
    imports: [CommonModule],
    providers: [{ provide: UPLOAD_CONTEXT, useExisting: forwardRef(() => TextEditorImageUpload) }],
    template: `
        @if (visible() || uploadsSignal().length > 0) {
            <div class="p-texteditor-upload" [attr.data-scope]="'texteditor'" (click)="$event.stopPropagation()">
                <ng-content select="p-texteditor-image-upload-dropzone" />
                <ng-content select="p-texteditor-image-upload-progress" />
                <ng-content />
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorImageUpload extends UploadPartBase {
    /**
     * Upload transport: '(file, { onProgress, signal }) => Promise<url>'; takes precedence over the root handlers.
     * @group Props
     */
    readonly handler = input<((file: File, options: { onProgress: (percent: number) => void; signal: AbortSignal }) => Promise<string>) | null>(null);
    /**
     * Maximum files per selection.
     * @group Props
     */
    readonly maxFileCount = input<number | null>(null);
    /**
     * Maximum file size in bytes.
     * @group Props
     */
    readonly maxFileSize = input<number | null>(null);
    /**
     * Accepted file types (UX guard only; the server must re-validate).
     * @group Props
     */
    readonly allowedTypes = input<string | null>(null);
    /**
     * Whether the upload surface (dropzone/progress) should render even without active uploads.
     * @group Props
     */
    readonly visible = input<boolean>(false);

    /**
     * Files rejected by validation.
     * @group Emits
     */
    readonly reject = output<TextEditorFileRejectEvent>();

    constructor() {
        super('image');
    }

    protected override uploadConfig() {
        return { handler: this.handler(), maxFileCount: this.maxFileCount(), maxFileSize: this.maxFileSize(), allowedTypes: this.allowedTypes() };
    }

    protected override emitReject(event: TextEditorFileRejectEvent): void {
        this.reject.emit(event);
    }
}

/**
 * Image upload dropzone sub-part; hands `selectFiles` and `onDrop` to its slot.
 * @group Components
 */
@Component({
    selector: 'p-texteditor-image-upload-dropzone',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (context(); as ctx) {
            <div class="p-texteditor-upload-dropzone" [attr.data-scope]="'texteditor'" [attr.data-part]="'image-upload-dropzone'">
                <ng-container *ngTemplateOutlet="template()!; context: ctx" />
            </div>
        }
        <ng-content />
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorImageUploadDropzone {
    readonly upload = inject(UPLOAD_CONTEXT, { optional: true });

    @ContentChild(TextEditorImageUploadDropzoneDef, { read: TemplateRef }) dropzoneDef?: TemplateRef<any>;

    readonly template = signal<TemplateRef<any> | null>(null);

    readonly context = computed<TextEditorUploadDropzoneSlotContext | null>(() => {
        if (!this.upload) return null;
        return { selectFiles: () => this.upload!.selectFiles(), onDrop: (event: DragEvent) => this.upload!.onDrop(event) };
    });

    ngAfterContentInit(): void {
        this.template.set(this.dropzoneDef ?? null);
    }
}

/**
 * Image upload progress sub-part; hands `uploads` and `dismiss` to its slot.
 * @group Components
 */
@Component({
    selector: 'p-texteditor-image-upload-progress',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (context(); as ctx) {
            <div class="p-texteditor-upload-progress" role="status" aria-live="polite" [attr.data-scope]="'texteditor'" [attr.data-part]="'image-upload-progress'">
                <ng-container *ngTemplateOutlet="template()!; context: ctx" />
            </div>
        }
        <ng-content />
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorImageUploadProgress {
    readonly upload = inject(UPLOAD_CONTEXT, { optional: true });

    @ContentChild(TextEditorImageUploadProgressDef, { read: TemplateRef }) progressDef?: TemplateRef<any>;

    readonly template = signal<TemplateRef<any> | null>(null);

    readonly context = computed<TextEditorUploadProgressSlotContext | null>(() => {
        if (!this.upload) return null;
        return { uploads: this.upload!.uploads(), dismiss: () => this.upload!.dismiss() };
    });

    ngAfterContentInit(): void {
        this.template.set(this.progressDef ?? null);
    }
}

/* ------------------------------------------------------------------ */
/* Document upload                                                     */
/* ------------------------------------------------------------------ */

/**
 * Document upload overlay mirroring the image part for non-image files; each
 * uploaded file is inserted into the content as a link.
 * @group Components
 */
@Component({
    selector: 'p-texteditor-document-upload',
    standalone: true,
    imports: [CommonModule],
    providers: [{ provide: UPLOAD_CONTEXT, useExisting: forwardRef(() => TextEditorDocumentUpload) }],
    template: `
        @if (visible() || uploadsSignal().length > 0) {
            <div class="p-texteditor-upload" [attr.data-scope]="'texteditor'" (click)="$event.stopPropagation()">
                <ng-content select="p-texteditor-document-upload-dropzone" />
                <ng-content select="p-texteditor-document-upload-progress" />
                <ng-content />
            </div>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorDocumentUpload extends UploadPartBase {
    /**
     * Upload transport: '(file, { onProgress, signal }) => Promise<url>'; takes precedence over the root handlers.
     * @group Props
     */
    readonly handler = input<((file: File, options: { onProgress: (percent: number) => void; signal: AbortSignal }) => Promise<string>) | null>(null);
    /**
     * Maximum files per selection.
     * @group Props
     */
    readonly maxFileCount = input<number | null>(null);
    /**
     * Maximum file size in bytes.
     * @group Props
     */
    readonly maxFileSize = input<number | null>(null);
    /**
     * Accepted file types (UX guard only; the server must re-validate).
     * @group Props
     */
    readonly allowedTypes = input<string | null>(null);
    /**
     * Whether the upload surface (dropzone/progress) should render even without active uploads.
     * @group Props
     */
    readonly visible = input<boolean>(false);

    /**
     * Files rejected by validation.
     * @group Emits
     */
    readonly reject = output<TextEditorFileRejectEvent>();

    constructor() {
        super('document');
    }

    protected override uploadConfig() {
        return { handler: this.handler(), maxFileCount: this.maxFileCount(), maxFileSize: this.maxFileSize(), allowedTypes: this.allowedTypes() };
    }

    protected override emitReject(event: TextEditorFileRejectEvent): void {
        this.reject.emit(event);
    }
}

/**
 * Document upload dropzone sub-part.
 * @group Components
 */
@Component({
    selector: 'p-texteditor-document-upload-dropzone',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (context(); as ctx) {
            <div class="p-texteditor-upload-dropzone" [attr.data-scope]="'texteditor'" [attr.data-part]="'document-upload-dropzone'">
                <ng-container *ngTemplateOutlet="template()!; context: ctx" />
            </div>
        }
        <ng-content />
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorDocumentUploadDropzone {
    readonly upload = inject(UPLOAD_CONTEXT, { optional: true });

    @ContentChild(TextEditorDocumentUploadDropzoneDef, { read: TemplateRef }) dropzoneDef?: TemplateRef<any>;

    readonly template = signal<TemplateRef<any> | null>(null);

    readonly context = computed<TextEditorUploadDropzoneSlotContext | null>(() => {
        if (!this.upload) return null;
        return { selectFiles: () => this.upload!.selectFiles(), onDrop: (event: DragEvent) => this.upload!.onDrop(event) };
    });

    ngAfterContentInit(): void {
        this.template.set(this.dropzoneDef ?? null);
    }
}

/**
 * Document upload progress sub-part.
 * @group Components
 */
@Component({
    selector: 'p-texteditor-document-upload-progress',
    standalone: true,
    imports: [CommonModule],
    template: `
        @if (context(); as ctx) {
            <div class="p-texteditor-upload-progress" role="status" aria-live="polite" [attr.data-scope]="'texteditor'" [attr.data-part]="'document-upload-progress'">
                <ng-container *ngTemplateOutlet="template()!; context: ctx" />
            </div>
        }
        <ng-content />
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { '[attr.data-scope]': '"texteditor"' }
})
export class TextEditorDocumentUploadProgress {
    readonly upload = inject(UPLOAD_CONTEXT, { optional: true });

    @ContentChild(TextEditorDocumentUploadProgressDef, { read: TemplateRef }) progressDef?: TemplateRef<any>;

    readonly template = signal<TemplateRef<any> | null>(null);

    readonly context = computed<TextEditorUploadProgressSlotContext | null>(() => {
        if (!this.upload) return null;
        return { uploads: this.upload!.uploads(), dismiss: () => this.upload!.dismiss() };
    });

    ngAfterContentInit(): void {
        this.template.set(this.progressDef ?? null);
    }
}
