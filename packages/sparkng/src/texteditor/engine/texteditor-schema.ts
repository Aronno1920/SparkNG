/**
 * @file
 * ProseMirror document schema and HTML sanitization for the TextEditor.
 *
 * All incoming content (value, setValue, paste, replaceSelection) is treated as
 * untrusted: HTML is parsed inside an inert template fragment, disallowed
 * elements never match the schema, URL schemes are validated, and inline style
 * values are restricted to a safe subset.
 */

import { Schema, DOMParser as PMDOMParser, DOMSerializer, Node as PMNode, Mark } from 'prosemirror-model';
import { tableNodes } from 'prosemirror-tables';

/* ------------------------------------------------------------------ */
/* Sanitization                                                        */
/* ------------------------------------------------------------------ */

const SAFE_URL_SCHEMES = ['http:', 'https:', 'mailto:', 'tel:', 'ftp:'];

/**
 * Validates a URL. Relative URLs, fragments and anchors are allowed; images
 * additionally accept `data:image/*` except SVG.
 */
export function safeUrl(url: string | null | undefined, kind: 'link' | 'image' = 'link'): string | null {
    if (!url) return null;
    // Reject control characters used to obfuscate schemes (e.g. `java\tscript:`).
    if (/[\u0000-\u0020\u007f\u200b-\u200f\u2028\u2029]/.test(url)) return null;
    let parsed: URL;
    try {
        parsed = new URL(url, 'http://texteditor.local');
    } catch {
        return null;
    }
    const href = url.trim();
    const isRelative = parsed.hostname === 'texteditor.local';
    if (isRelative) {
        if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(href)) return null; // scheme we failed to whitelist (e.g. javascript:, vbscript:)
        return href;
    }
    if (kind === 'image' && parsed.protocol === 'data:') {
        return /^data:image\/(?!svg)/i.test(href) ? href : null;
    }
    if (kind === 'link' && parsed.protocol === 'data:') return null;
    return SAFE_URL_SCHEMES.includes(parsed.protocol) ? href : null;
}

const SAFE_STYLE_PROPS: Record<string, RegExp> = {
    color: /^[#()%,.\-\s\da-zA-Z]+$/,
    'background-color': /^[#()%,.\-\s\da-zA-Z]+$/,
    'font-family': /^[^;{}<>]*$/,
    'font-size': /^[0-9.]+(px|pt|rem|em|%)?$/,
    'text-align': /^(left|center|right|justify)$/
};

/**
 * Restricts an inline style string to the supported properties and rejects
 * dangerous constructs such as `url(...)`, `expression(...)` or braces.
 */
export function sanitizeStyle(style: string | null | undefined): string {
    if (!style) return '';
    const kept: string[] = [];
    for (const declaration of style.split(';')) {
        const sep = declaration.indexOf(':');
        if (sep === -1) continue;
        const prop = declaration.slice(0, sep).trim().toLowerCase();
        const value = declaration.slice(sep + 1).trim();
        const pattern = SAFE_STYLE_PROPS[prop];
        if (!pattern || !value) continue;
        // Drop declarations carrying dangerous constructs instead of the whole string.
        if (/url\(|expression|behavior|-moz-binding|@import|[{}<>`\\]/i.test(value)) continue;
        if (pattern.test(value)) kept.push(`${prop}: ${value}`);
    }
    return kept.join('; ');
}

function stylePropOf(style: string | null | undefined, prop: string): string | null {
    if (!style) return null;
    for (const declaration of style.split(';')) {
        const sep = declaration.indexOf(':');
        if (sep === -1) continue;
        if (declaration.slice(0, sep).trim().toLowerCase() === prop) {
            const value = declaration.slice(sep + 1).trim();
            return value || null;
        }
    }
    return null;
}

const DISALLOWED_TAGS = ['script', 'iframe', 'object', 'embed', 'svg', 'form', 'meta', 'link'];

/**
 * Parses untrusted HTML inside an inert template fragment and strips elements
 * the schema deliberately drops. No live elements are created during parse.
 * Returns a detached wrapper element owning the full parsed content.
 */
export function parseInertHtml(html: string): HTMLElement {
    const template = document.createElement('template');
    template.innerHTML = html;
    for (const el of Array.from(template.content.querySelectorAll(DISALLOWED_TAGS.join(',')))) {
        el.remove();
    }
    const wrapper = document.createElement('div');
    while (template.content.firstChild) {
        wrapper.appendChild(template.content.firstChild);
    }
    return wrapper;
}

/* ------------------------------------------------------------------ */
/* Schema                                                              */
/* ------------------------------------------------------------------ */

const PARAGRAPH_LIKE_DOM = ['p', 0] as const;

function alignToDOM(node: PMNode): Record<string, string> {
    return node.attrs.align ? { style: `text-align: ${node.attrs.align}` } : {};
}

function alignFromDOM(el: HTMLElement | string): { align?: string } {
    const style = typeof el === 'string' ? '' : el.getAttribute('style') || '';
    const align = stylePropOf(style, 'text-align');
    return align && SAFE_STYLE_PROPS['text-align'].test(align) ? { align } : {};
}

/**
 * Assembles the TextEditor ProseMirror schema. Exported for tests and plugins
 * that need to reference the exact node/mark specs.
 */
export function buildTextEditorSchema(): Schema {
    const nodes = {
        doc: { content: 'block+' },
        paragraph: {
            content: 'inline*',
            group: 'block',
            attrs: { align: { default: null } },
            parseDOM: [{ tag: 'p', getAttrs: (el) => alignFromDOM(el as HTMLElement) }],
            toDOM: (node: PMNode) => ['p', alignToDOM(node), 0]
        },
        heading: {
            content: 'inline*',
            group: 'block',
            attrs: { level: { default: 1 }, align: { default: null } },
            // getAttrs overrides `attrs` when both are present — fold the level in.
            parseDOM: [1, 2, 3, 4, 5, 6].map((level) => ({ tag: `h${level}`, getAttrs: (el) => ({ level, ...alignFromDOM(el as HTMLElement) }) })),
            toDOM: (node: PMNode) => [`h${node.attrs.level}`, alignToDOM(node), 0]
        },
        blockquote: {
            content: 'block+',
            group: 'block',
            defining: true,
            parseDOM: [{ tag: 'blockquote' }],
            toDOM: () => ['blockquote', 0]
        },
        code_block: {
            content: 'text*',
            group: 'block',
            code: true,
            defining: true,
            parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' as const }],
            toDOM: () => ['pre', ['code', 0]]
        },
        horizontal_rule: {
            group: 'block',
            parseDOM: [{ tag: 'hr' }],
            toDOM: () => ['hr']
        },
        // Checklist rules must precede the generic ul/li rules or plain 'ul'
        // would capture checklists first.
        check_list: {
            content: 'check_item+',
            group: 'block',
            parseDOM: [{ tag: 'ul[data-p-checked-list]' }],
            toDOM: () => ['ul', { 'data-p-checked-list': '' }, 0]
        },
        check_item: {
            content: 'paragraph block*',
            attrs: { checked: { default: false } },
            defining: true,
            parseDOM: [
                {
                    tag: 'li[data-p-checked]',
                    getAttrs: (el) => ({ checked: (el as HTMLElement).getAttribute('data-p-checked') === 'true' })
                }
            ],
            toDOM: (node: PMNode) => [
                'li',
                { 'data-p-checked': node.attrs.checked ? 'true' : 'false' },
                ['label', { contenteditable: 'false', class: 'p-texteditor-check' }, ['input', { type: 'checkbox', ...(node.attrs.checked ? { checked: '' } : {}) }]],
                ['div', { class: 'p-texteditor-check-content' }, 0]
            ]
        },
        bullet_list: { content: 'list_item+', group: 'block', parseDOM: [{ tag: 'ul' }], toDOM: () => ['ul', 0] },
        ordered_list: {
            content: 'list_item+',
            group: 'block',
            attrs: { start: { default: 1 } },
            parseDOM: [{ tag: 'ol' }],
            toDOM: (node: PMNode) => (node.attrs.start === 1 ? ['ol', 0] : ['ol', { start: node.attrs.start }, 0])
        },
        list_item: { content: 'paragraph block*', parseDOM: [{ tag: 'li' }], toDOM: () => ['li', 0] },
        image: {
            inline: true,
            attrs: {
                src: { default: '' },
                alt: { default: null },
                title: { default: null },
                width: { default: null },
                height: { default: null },
                uploadId: { default: null }
            },
            group: 'inline',
            draggable: true,
            parseDOM: [
                {
                    tag: 'img[src]',
                    getAttrs: (el) => {
                        const img = el as HTMLImageElement;
                        const src = safeUrl(img.getAttribute('src'), 'image');
                        if (!src) return false;
                        return {
                            src,
                            alt: img.getAttribute('alt'),
                            title: img.getAttribute('title'),
                            width: Number(img.getAttribute('width')) || null,
                            height: Number(img.getAttribute('height')) || null
                        };
                    }
                }
            ],
            toDOM: (node: PMNode) => ['img', { src: node.attrs.src, alt: node.attrs.alt ?? '', title: node.attrs.title ?? undefined, width: node.attrs.width ?? undefined, height: node.attrs.height ?? undefined }]
        },
        mention: {
            inline: true,
            group: 'inline',
            atom: true,
            attrs: { label: { default: '' }, data: { default: '' } },
            parseDOM: [{ tag: 'span.p-texteditor-mention', getAttrs: (el) => ({ label: (el as HTMLElement).getAttribute('data-mention-label') || '', data: (el as HTMLElement).getAttribute('data-mention-data') || '' }) }],
            toDOM: (node: PMNode) => ['span', { class: 'p-texteditor-mention', 'data-mention-label': node.attrs.label, 'data-mention-data': node.attrs.data }, node.attrs.label]
        },
        hard_break: {
            inline: true,
            group: 'inline',
            selectable: false,
            parseDOM: [{ tag: 'br' }],
            toDOM: () => ['br']
        },
        text: { group: 'inline' }
    };

    const marks = {
        link: {
            attrs: { href: {}, target: { default: '_blank' } },
            inclusive: false,
            parseDOM: [
                {
                    tag: 'a[href]',
                    getAttrs: (el) => {
                        const anchor = el as HTMLAnchorElement;
                        const href = safeUrl(anchor.getAttribute('href'), 'link');
                        if (!href) return false;
                        const target = anchor.getAttribute('target');
                        return { href, target: ['_blank', '_self', '_parent', '_top'].includes(target ?? '') ? target : '_blank' };
                    }
                }
            ],
            toDOM: (mark: Mark) => ['a', { href: mark.attrs.href, target: mark.attrs.target, rel: 'noopener noreferrer' }, 0]
        },
        bold: { parseDOM: [{ tag: 'strong' }, { tag: 'b' }, { style: 'font-weight', getAttrs: (v: string) => /^(bold(er)?|[5-9]\d{2})$/.test(v) && null }], toDOM: () => ['strong', 0] },
        italic: { parseDOM: [{ tag: 'em' }, { tag: 'i' }, { style: 'font-style', getAttrs: (v: string) => v === 'italic' && null }], toDOM: () => ['em', 0] },
        underline: { parseDOM: [{ tag: 'u' }, { style: 'text-decoration', getAttrs: (v: string) => v === 'underline' && null }], toDOM: () => ['u', 0] },
        strikethrough: { parseDOM: [{ tag: 's' }, { tag: 'del' }, { style: 'text-decoration', getAttrs: (v: string) => v === 'line-through' && null }], toDOM: () => ['s', 0] },
        code: {
            parseDOM: [{ tag: 'code' }],
            toDOM: () => ['code', 0]
        },
        subscript: { parseDOM: [{ tag: 'sub' }], toDOM: () => ['sub', 0], excludes: 'superscript' },
        superscript: { parseDOM: [{ tag: 'sup' }], toDOM: () => ['sup', 0], excludes: 'subscript' },
        textColor: {
            attrs: { color: {} },
            parseDOM: [
                {
                    tag: 'span',
                    getAttrs: (el) => {
                        const color = stylePropOf(sanitizeStyle((el as HTMLElement).getAttribute('style')), 'color');
                        return color ? { color } : false;
                    }
                }
            ],
            toDOM: (mark: Mark) => ['span', { style: `color: ${mark.attrs.color}` }, 0]
        },
        backgroundColor: {
            attrs: { color: {} },
            parseDOM: [
                {
                    tag: 'span',
                    getAttrs: (el) => {
                        const color = stylePropOf(sanitizeStyle((el as HTMLElement).getAttribute('style')), 'background-color');
                        return color ? { color } : false;
                    }
                }
            ],
            toDOM: (mark: Mark) => ['span', { style: `background-color: ${mark.attrs.color}` }, 0]
        },
        fontFamily: {
            attrs: { family: {} },
            parseDOM: [
                {
                    tag: 'span',
                    getAttrs: (el) => {
                        const family = stylePropOf(sanitizeStyle((el as HTMLElement).getAttribute('style')), 'font-family');
                        return family ? { family } : false;
                    }
                }
            ],
            toDOM: (mark: Mark) => ['span', { style: `font-family: ${mark.attrs.family}` }, 0]
        },
        fontSize: {
            attrs: { size: {} },
            parseDOM: [
                {
                    tag: 'span',
                    getAttrs: (el) => {
                        const size = stylePropOf(sanitizeStyle((el as HTMLElement).getAttribute('style')), 'font-size');
                        return size ? { size } : false;
                    }
                }
            ],
            toDOM: (mark: Mark) => ['span', { style: `font-size: ${mark.attrs.size}` }, 0]
        }
    };

    const tablePart = tableNodes({
        tableGroup: 'block',
        cellContent: 'block+',
        cellAttributes: {
            colwidth: {
                default: null,
                getFromDOM: (el) => {
                    const width = Number((el as HTMLElement).getAttribute('data-colwidth')) || (el as HTMLElement).offsetWidth || null;
                    return width && width > 0 ? [width] : null;
                },
                setDOMAttr: (width, attrs) => {
                    if (width) attrs['data-colwidth'] = String(width[0]);
                }
            },
            align: {
                default: null,
                getFromDOM: (el) => stylePropOf((el as HTMLElement).getAttribute('style'), 'text-align'),
                setDOMAttr: (align: string | null, attrs) => {
                    if (align) attrs.style = `text-align: ${align}`;
                }
            }
        }
    });

    return new Schema({
        nodes: { ...nodes, ...tablePart } as any,
        marks: marks as any
    });
}

/* ------------------------------------------------------------------ */
/* Parsing / serialization helpers                                     */
/* ------------------------------------------------------------------ */

/**
 * Parses a (possibly untrusted) HTML string into a ProseMirror document.
 */
export function htmlToDoc(schema: Schema, html: string): PMNode {
    const host = document.createElement('div');
    const inert = parseInertHtml(html);
    host.appendChild(inert);
    return PMDOMParser.fromSchema(schema).parse(host);
}

/**
 * Serializes a ProseMirror node back to sanitized HTML.
 */
export function docToHtml(schema: Schema, doc: PMNode): string {
    const serializer = DOMSerializer.fromSchema(schema);
    if (doc.type.name === 'doc') {
        const wrapper = document.createElement('div');
        wrapper.appendChild(serializer.serializeFragment(doc.content));
        return wrapper.innerHTML;
    }
    const dom = serializer.serializeNode(doc);
    return dom.nodeType === 1 ? (dom as HTMLElement).outerHTML : (dom.textContent ?? '');
}

export { PARAGRAPH_LIKE_DOM };
