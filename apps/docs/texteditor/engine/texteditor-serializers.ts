/**
 * @file
 * Document serializers: HTML (sanitized round-trip), blocks, plain text and a
 * Markdown projection.
 */

import { Schema, Node as PMNode } from 'prosemirror-model';
import { docToHtml, htmlToDoc } from './texteditor-schema';

/**
 * Serializes a document node to HTML using the schema's DOM serializer.
 */
export function serializeHtml(schema: Schema, doc: PMNode): string {
    return docToHtml(schema, doc);
}

/**
 * Parses untrusted HTML into a document.
 */
export function parseHtml(schema: Schema, html: string): PMNode {
    return htmlToDoc(schema, html);
}

/**
 * Splits the document into one HTML string per top-level block (block mode).
 */
export function serializeBlocks(schema: Schema, doc: PMNode): string[] {
    const blocks: string[] = [];
    doc.forEach((node) => {
        blocks.push(serializeHtml(schema, node));
    });
    return blocks;
}

/**
 * Joins block HTML strings back into a document (block mode).
 */
export function parseBlocks(schema: Schema, blocks: string[]): PMNode {
    return parseHtml(schema, blocks.join(''));
}

/**
 * Plain-text projection of the document.
 */
export function serializeText(doc: PMNode): string {
    return doc.textBetween(0, doc.content.size, '\n\n', '\n');
}

function inlineToMarkdown(node: PMNode): string {
    let out = '';
    node.forEach((child) => {
        if (child.isText && child.text) {
            let text = child.text;
            for (const mark of child.marks) {
                switch (mark.type.name) {
                    case 'bold':
                        text = `**${text}**`;
                        break;
                    case 'italic':
                        text = `*${text}*`;
                        break;
                    case 'strikethrough':
                        text = `~~${text}~~`;
                        break;
                    case 'code':
                        text = `\`${text}\``;
                        break;
                    case 'link':
                        text = `[${text}](${mark.attrs.href})`;
                        break;
                    default:
                        break;
                }
            }
            out += text;
        } else if (child.type.name === 'image') {
            out += `![${child.attrs.alt ?? ''}](${child.attrs.src})`;
        } else if (child.type.name === 'hard_break') {
            out += '\n';
        } else if (child.type.name === 'mention') {
            out += child.attrs.label;
        }
    });
    return out;
}

function childrenOf(node: PMNode): PMNode[] {
    const children: PMNode[] = [];
    node.content.forEach((child) => children.push(child));
    return children;
}

function blockToMarkdown(node: PMNode, indent = ''): string {
    switch (node.type.name) {
        case 'heading':
            return `${'#'.repeat(node.attrs.level)} ${inlineToMarkdown(node)}`;
        case 'paragraph':
            return inlineToMarkdown(node);
        case 'blockquote':
            return childrenOf(node)
                .map((child) => `${indent}> ${blockToMarkdown(child, indent)}`)
                .join('\n');
        case 'code_block':
            return `\`\`\`\n${node.textContent}\n\`\`\``;
        case 'horizontal_rule':
            return '---';
        case 'bullet_list':
        case 'check_list':
        case 'ordered_list': {
            const lines: string[] = [];
            let index = 1;
            node.forEach((item) => {
                let prefix = `${indent}- `;
                if (node.type.name === 'ordered_list') prefix = `${indent}${index++}. `;
                if (node.type.name === 'check_list') {
                    prefix = `${indent}- [${item.attrs.checked ? 'x' : ' '}] `;
                }
                const content = childrenOf(item)
                    .map((child) => blockToMarkdown(child, `${indent}  `))
                    .join('\n');
                lines.push(prefix + content);
            });
            return lines.join('\n');
        }
        case 'table': {
            const rows: string[][] = [];
            node.forEach((row) => {
                const cells: string[] = [];
                row.forEach((cell) => cells.push(inlineToMarkdown(cell.firstChild ?? cell)));
                rows.push(cells);
            });
            if (!rows.length) return '';
            const widths = rows[0].map((_, i) => Math.max(...rows.map((r) => (r[i] ?? '').length), 3));
            const header = `| ${rows[0].map((c, i) => c.padEnd(widths[i])).join(' | ')} |`;
            const divider = `| ${widths.map((w) => '-'.repeat(w)).join(' | ')} |`;
            const body = rows.slice(1).map((r) => `| ${r.map((c, i) => (c ?? '').padEnd(widths[i])).join(' | ')} |`);
            return [header, divider, ...body].join('\n');
        }
        default:
            return node.textContent;
    }
}

/**
 * Markdown projection of the document (headings, emphasis, lists, links,
 * code fences, images and tables).
 */
export function serializeMarkdown(doc: PMNode): string {
    const parts: string[] = [];
    doc.forEach((node) => {
        const projected = blockToMarkdown(node);
        if (projected) parts.push(projected);
    });
    return parts.join('\n\n');
}
