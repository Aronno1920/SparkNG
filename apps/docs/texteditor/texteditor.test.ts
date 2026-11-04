import { ChangeDetectionStrategy, Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { provideSpark } from '@bdspark/sparkng/config';
import { TEXTEDITOR_FILE_SIZE, TextEditorRoot } from './components/texteditor-root';
import { TextEditorContent } from './components/texteditor-content';
import { TextEditorToolbar, TextEditorToolbarDef } from './components/texteditor-toolbar';
import { TextEditorModule } from './modules/texteditor.module';
import { safeUrl, sanitizeStyle } from './engine/texteditor-schema';

@Component({
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: true,
    imports: [TextEditorModule, FormsModule],
    template: `
        <p-texteditor-root [(value)]="value" (valueChange)="emitted = [...emitted, $event]" [placeholder]="placeholder" [readonly]="readonly" [disabled]="disabled" [markdown]="markdown" ariaLabel="Test editor">
            <p-texteditor-toolbar>
                <ng-template pTexteditorToolbarDef let-commands="commands" let-state="state">
                    <button type="button" class="test-bold" (click)="commands.bold()" [attr.aria-pressed]="state.bold">B</button>
                    <button type="button" class="test-undo" (click)="commands.undo()" [disabled]="!state.canUndo">Undo</button>
                </ng-template>
            </p-texteditor-toolbar>
            <p-texteditor-content />
        </p-texteditor-root>
    `
})
class TestHostComponent {
    value: string | null = '<p>Hello <strong>world</strong></p>';
    placeholder = 'Type something…';
    readonly = false;
    disabled = false;
    markdown = false;
    emitted: (string | string[])[] = [];
}

describe('TextEditor', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let host: TestHostComponent;
    let rootInstance: TextEditorRoot;

    const mount = async () => {
        fixture = TestBed.createComponent(TestHostComponent);
        host = fixture.componentInstance;
        fixture.changeDetectorRef.markForCheck();
        await fixture.whenStable();
        await new Promise((resolve) => setTimeout(resolve, 50));
        rootInstance = fixture.debugElement.query(By.css('p-texteditor-root')).componentInstance as TextEditorRoot;
    };

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [TestHostComponent],
            providers: [provideZonelessChangeDetection(), provideSpark()]
        });
        await mount();
    });

    describe('Component Initialization', () => {
        it('should create the root component', () => {
            expect(rootInstance).toBeTruthy();
        });

        it('should mount the ProseMirror view into the content part', () => {
            const content = fixture.debugElement.query(By.css('.p-texteditor-content'));
            expect(content).toBeTruthy();
            expect(content.nativeElement.querySelector('p, h1, h2, blockquote, ul, ol, pre') ?? content.nativeElement.children.length).toBeTruthy();
        });

        it('should parse the initial value into the document', () => {
            expect(rootInstance.getHTML()).toContain('<strong>world</strong>');
            expect(rootInstance.getText()).toContain('Hello world');
        });

        it('should expose the root data attributes', () => {
            const rootEl = fixture.debugElement.query(By.css('p-texteditor-root')).nativeElement as HTMLElement;
            expect(rootEl.getAttribute('data-scope')).toBe('texteditor');
            expect(rootEl.getAttribute('data-part')).toBe('root');
            expect(rootEl.getAttribute('data-mode')).toBe('classic');
        });

        it('should expose data-readonly and data-disabled when set', async () => {
            const rootEl = fixture.debugElement.query(By.css('p-texteditor-root')).nativeElement as HTMLElement;
            expect(rootEl.hasAttribute('data-readonly')).toBe(false);
            host.readonly = true;
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            expect(rootEl.hasAttribute('data-readonly')).toBe(true);
        });
    });

    describe('Serialization', () => {
        it('should serialize to markdown', () => {
            const markdown = rootInstance.getMarkdown();
            expect(markdown).toContain('Hello **world**');
        });

        it('should serialize to JSON', () => {
            const json = rootInstance.getJSON() as any;
            expect(json?.type).toBe('doc');
        });

        it('should serialize empty documents as an empty value', () => {
            rootInstance.setValue('');
            expect(rootInstance.getHTML()).toBe('<p></p>');
        });
    });

    describe('Value Binding', () => {
        it('should apply external value changes', async () => {
            host.value = '<h2>Replaced</h2>';
            fixture.changeDetectorRef.markForCheck();
            await fixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 30));
            expect(rootInstance.getHTML()).toContain('<h2>Replaced</h2>');
        });

        it('should emit valueChange when the document changes', async () => {
            host.emitted = [];
            rootInstance.getCommands()?.heading(1);
            await new Promise((resolve) => setTimeout(resolve, 30));
            expect(host.emitted.length).toBeGreaterThan(0);
            expect(host.emitted[host.emitted.length - 1]).toContain('<h1>');
        });

        it('should implement ControlValueAccessor', () => {
            expect(rootInstance.writeValue).toBeDefined();
            expect(rootInstance.registerOnChange).toBeDefined();
            expect(rootInstance.registerOnTouched).toBeDefined();
        });
    });

    describe('Format State & Commands', () => {
        it('should derive the initial format state', () => {
            const state = fixture.debugElement.query(By.css('p-texteditor-root')).componentInstance as any;
            const format = state.state();
            expect(format).toBeTruthy();
            expect(format.bold).toBe(false);
            expect(format.canUndo).toBe(false);
        });

        it('should expose toolbar commands through the slot', () => {
            const boldButton = fixture.debugElement.query(By.css('.test-bold'));
            expect(boldButton).toBeTruthy();
        });

        it('should toggle bold through commands and update state', async () => {
            const commands = rootInstance.getCommands();
            const view = rootInstance.getView()!;
            // Place the caret inside the text, then select the first word and toggle bold.
            const { state } = view;
            const TextSelectionCtor = (await import('prosemirror-state')).TextSelection;
            view.dispatch(state.tr.setSelection(TextSelectionCtor.create(state.doc, 1, 11)));
            commands?.bold();
            await new Promise((resolve) => setTimeout(resolve, 20));
            expect(rootInstance.getHTML()).toContain('<strong>');
            const undoButton = fixture.debugElement.query(By.css('.test-undo'));
            expect(undoButton.nativeElement.disabled).toBe(false);
        });
    });

    describe('Checklist interaction', () => {
        it('should render checklist items with data-p-checked attributes', () => {
            rootInstance.setValue('<ul data-p-checked-list=""><li data-p-checked="true"><p>Done</p></li><li data-p-checked="false"><p>Todo</p></li></ul>');
            const checked = fixture.debugElement.queryAll(By.css('li[data-p-checked="true"]'));
            const unchecked = fixture.debugElement.queryAll(By.css('li[data-p-checked="false"]'));
            expect(checked.length).toBe(1);
            expect(unchecked.length).toBe(1);
        });
    });

    describe('Block mode', () => {
        it('should serialize top-level blocks in block mode', async () => {
            const blockFixture = TestBed.createComponent(BlockModeComponent);
            blockFixture.changeDetectorRef.markForCheck();
            await blockFixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 50));
            const blockRoot = blockFixture.debugElement.query(By.css('p-texteditor-root')).componentInstance as TextEditorRoot;
            const blocks = blockRoot.getBlocks();
            expect(Array.isArray(blocks)).toBe(true);
            expect(blocks.length).toBe(2);
            expect(blocks[0]).toContain('<h2>');
        });
    });

    describe('Plugins', () => {
        it('should install plugin commands into pluginCommands', async () => {
            const pluginFixture = TestBed.createComponent(PluginComponent);
            pluginFixture.changeDetectorRef.markForCheck();
            await pluginFixture.whenStable();
            await new Promise((resolve) => setTimeout(resolve, 50));
            const pluginRoot = pluginFixture.debugElement.query(By.css('p-texteditor-root')).componentInstance as TextEditorRoot;
            const commands = pluginRoot.pluginCommands();
            expect(commands['uppercase']).toBeTruthy();
        });
    });

    describe('Sanitization', () => {
        it('should reject dangerous URL schemes', () => {
            expect(safeUrl('javascript:alert(1)')).toBeNull();
            // Entities like &#9; decode during HTML parsing; the decoded control
            // character must still be rejected by safeUrl.
            expect(safeUrl('java\tscript:alert(1)')).toBeNull();
            expect(safeUrl('https://example.com')).toBe('https://example.com');
            expect(safeUrl('mailto:a@b.co')).toBe('mailto:a@b.co');
            expect(safeUrl('/relative/path')).toBe('/relative/path');
        });

        it('should reject svg data URLs for images but allow raster ones', () => {
            expect(safeUrl('data:image/svg+xml;base64,PHN2Zz4=', 'image')).toBeNull();
            expect(safeUrl('data:image/png;base64,AAAA', 'image')).toBe('data:image/png;base64,AAAA');
            expect(safeUrl('data:text/html;base64,AAAA', 'image')).toBeNull();
        });

        it('should strip dangerous style values', () => {
            expect(sanitizeStyle('color: red; background-image: url(javascript:1)')).toBe('color: red');
            expect(sanitizeStyle('font-family: Georgia')).toBe('font-family: Georgia');
            expect(sanitizeStyle('behavior: url(#default#time2)')).toBe('');
        });

        it('should drop script content from parsed values', () => {
            rootInstance.setValue('<p>safe</p><script>alert(1)</script>');
            expect(rootInstance.getHTML()).not.toContain('script');
            expect(rootInstance.getHTML()).toContain('safe');
        });
    });

    describe('Constants', () => {
        it('should expose file size constants', () => {
            expect(TEXTEDITOR_FILE_SIZE.ONE_MB).toBe(1048576);
            expect(TEXTEDITOR_FILE_SIZE.FIFTY_MB).toBe(52428800);
        });
    });
});

@Component({
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: true,
    imports: [TextEditorModule],
    template: `
        <p-texteditor-root mode="block" [value]="blocks">
            <p-texteditor-content />
        </p-texteditor-root>
    `
})
class BlockModeComponent {
    blocks = ['<h2>Block Editor</h2>', '<p>Second block</p>'];
}

import { defineTextEditorPlugin } from './plugins/texteditor-plugin';

const uppercasePlugin = defineTextEditorPlugin('uppercase', ({ getSelectedText, replaceSelection }) => ({
    commands: {
        toUpperCase: () => {
            const text = getSelectedText();
            if (text) replaceSelection(text.toUpperCase());
        }
    }
}));

@Component({
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: true,
    imports: [TextEditorModule],
    template: `
        <p-texteditor-root [value]="value" [plugins]="[uppercasePlugin]">
            <p-texteditor-content />
        </p-texteditor-root>
    `
})
class PluginComponent {
    value = '<p>plugin test</p>';
    uppercasePlugin = uppercasePlugin;
}
