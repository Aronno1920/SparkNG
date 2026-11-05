/**
 * @file
 * Builds a chart theme from the SparkNG design tokens so charts match the
 * active preset (Aura, Lara, Material, Nora, custom) without any manual wiring.
 *
 * The tokens are read from the CSS custom properties that the styled-mode theme
 * engine injects on the document root (e.g. `--p-text-color`). Colors are
 * normalized through a canvas context, which supports every CSS color format
 * including `oklch()` used by modern presets.
 *
 * @module sparkcharttheme
 */
import type { SparkChartTheme } from '../types/chart.types';

/**
 * Design tokens read from the active SparkNG theme.
 * @group Interface
 */
export interface SparkChartTokens {
    /**
     * Primary color of the active preset (`--p-primary-color`).
     */
    primary?: string;
    /**
     * Main text color (`--p-text-color`).
     */
    textColor?: string;
    /**
     * Muted text color (`--p-text-muted-color`).
     */
    mutedColor?: string;
    /**
     * Content surface background (`--p-content-background`).
     */
    contentBackground?: string;
    /**
     * Content surface border (`--p-content-border-color`).
     */
    contentBorderColor?: string;
    /**
     * Font family applied to the document body.
     */
    fontFamily?: string;
}

/**
 * A `[r, g, b]` tuple with each channel in the `0-255` range.
 * @group Interface
 */
export type RGB = [number, number, number];

let canvasContext: CanvasRenderingContext2D | null | undefined;

function getCanvasContext(): CanvasRenderingContext2D | null {
    if (canvasContext !== undefined) return canvasContext;
    canvasContext = null;
    try {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        canvasContext = canvas.getContext('2d');
    } catch {
        canvasContext = null;
    }
    return canvasContext;
}

/**
 * Parses any CSS color string (hex, rgb(), rgba(), hsl(), oklch(), named
 * colors...) into an RGB tuple. Uses a canvas context to normalize the value,
 * falling back to `null` when the color cannot be resolved.
 * @param color - The CSS color value.
 * @returns The RGB tuple or `null`.
 */
export function parseColor(color: string): RGB | null {
    if (!color) return null;
    const trimmed = color.trim();
    if (trimmed.startsWith('#')) {
        const hex = trimmed.slice(1);
        if (hex.length === 3) {
            return [parseInt(hex[0] + hex[0], 16), parseInt(hex[1] + hex[1], 16), parseInt(hex[2] + hex[2], 16)];
        }
        if (hex.length === 6 || hex.length === 8) {
            return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
        }
        return null;
    }
    const match = trimmed.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
    if (match) {
        return [parseFloat(match[1]), parseFloat(match[2]), parseFloat(match[3])];
    }
    const ctx = getCanvasContext();
    if (!ctx) return null;
    try {
        ctx.fillStyle = '#000000';
        ctx.fillStyle = trimmed;
        const normalized = ctx.fillStyle as string;
        if (normalized.startsWith('#')) {
            const hex = normalized.slice(1);
            if (hex.length === 3) {
                return [parseInt(hex[0] + hex[0], 16), parseInt(hex[1] + hex[1], 16), parseInt(hex[2] + hex[2], 16)];
            }
            if (hex.length === 6 || hex.length === 8) {
                return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
            }
            return null;
        }
        const rgbaMatch = normalized.match(/rgba?\(([^)]+)\)/i);
        if (rgbaMatch) {
            const parts = rgbaMatch[1].split(',').map((part) => parseFloat(part));
            if (parts.length >= 3) {
                return [parts[0], parts[1], parts[2]];
            }
        }
    } catch {
        return null;
    }
    return null;
}

function toHex([r, g, b]: RGB): string {
    const channel = (value: number) =>
        Math.max(0, Math.min(255, Math.round(value)))
            .toString(16)
            .padStart(2, '0');
    return `#${channel(r)}${channel(g)}${channel(b)}`;
}

/**
 * Mixes two colors. A weight of `0` returns `a`, `1` returns `b`.
 * @param a - First color as an RGB tuple.
 * @param b - Second color as an RGB tuple.
 * @param weight - Weight of the second color between `0` and `1`.
 * @returns The mixed color as a hex string.
 */
export function mixColors(a: RGB, b: RGB, weight: number): string {
    const w = Math.max(0, Math.min(1, weight));
    return toHex([a[0] + (b[0] - a[0]) * w, a[1] + (b[1] - a[1]) * w, a[2] + (b[2] - a[2]) * w]);
}

/**
 * Curated pool of vibrant, distinct categorical hues for data visualization
 * across the color spectrum (Blue, Orange, Emerald, Violet, Amber, Cyan, Rose, Lime, Indigo, Pink, Teal, Slate).
 */
export const VIBRANT_CHART_PALETTE: string[] = [
    '#3b82f6', // Blue
    '#f97316', // Orange
    '#10b981', // Emerald
    '#8b5cf6', // Violet
    '#f59e0b', // Amber
    '#06b6d4', // Cyan
    '#f43f5e', // Rose
    '#84cc16', // Lime
    '#6366f1', // Indigo
    '#ec4899', // Pink
    '#14b8a6', // Teal
    '#64748b' // Slate
];

function colorDistance(a: RGB, b: RGB): number {
    const dr = a[0] - b[0];
    const dg = a[1] - b[1];
    const db = a[2] - b[2];
    return Math.sqrt(2 * dr * dr + 4 * dg * dg + 3 * db * db);
}

/**
 * Builds a vibrant multi-color categorical palette for charts.
 * When a primary color is provided, it anchors the first series/slice to the active
 * preset and fills subsequent positions with distinct, high-contrast hues across
 * the color spectrum.
 *
 * @param primary - Optional primary color to anchor the palette to.
 * @returns An array of distinct hex color strings.
 */
export function buildChartPalette(primary?: string | null): string[] {
    const primaryRgb = primary ? parseColor(primary) : null;
    if (!primaryRgb) {
        return [...VIBRANT_CHART_PALETTE.slice(0, 10)];
    }

    const primaryHex = toHex(primaryRgb);
    const result: string[] = [primaryHex];

    for (const hex of VIBRANT_CHART_PALETTE) {
        if (result.length >= 10) break;
        const rgb = parseColor(hex);
        if (rgb && colorDistance(primaryRgb, rgb) >= 80) {
            result.push(hex);
        }
    }

    return result;
}

/**
 * Reads the SparkNG design tokens from the document root.
 * @param document - The document to read from; defaults to the global document.
 * @returns The tokens that could be resolved.
 */
export function readChartTokens(document?: Document | null): SparkChartTokens {
    const tokens: SparkChartTokens = {};
    if (!document) return tokens;
    try {
        const rootStyle = document.defaultView?.getComputedStyle(document.documentElement);
        const bodyStyle = document.defaultView?.getComputedStyle(document.body);
        const read = (name: string): string | undefined => {
            const value = rootStyle?.getPropertyValue(name)?.trim();
            return value ? value : undefined;
        };
        tokens.primary = read('--p-primary-color');
        tokens.textColor = read('--p-text-color');
        tokens.mutedColor = read('--p-text-muted-color');
        tokens.contentBackground = read('--p-content-background');
        tokens.contentBorderColor = read('--p-content-border-color');
        tokens.fontFamily = bodyStyle?.fontFamily?.trim() || undefined;
    } catch {
        return tokens;
    }
    return tokens;
}

/**
 * Builds a chart theme object from the active SparkNG design tokens. Charts
 * initialize with this theme automatically whenever no explicit `theme` is
 * provided, and they are re-initialized when the SparkNG theme changes.
 * @param document - The document to read the tokens from.
 * @returns The theme object; empty when no tokens could be resolved.
 */
export function buildSparkChartTheme(document?: Document | null): SparkChartTheme {
    const tokens = readChartTokens(document);
    const theme: SparkChartTheme = { backgroundColor: 'transparent' };

    if (tokens.textColor || tokens.fontFamily) {
        const textStyle: Record<string, any> = {};
        if (tokens.textColor) textStyle.color = tokens.textColor;
        if (tokens.fontFamily) textStyle.fontFamily = tokens.fontFamily;
        theme.textStyle = textStyle;
    }

    const palette = buildChartPalette(tokens.primary);
    if (palette.length) theme.color = palette;

    if (tokens.textColor) {
        theme.title = { textStyle: { color: tokens.textColor }, subtextStyle: { color: tokens.mutedColor || tokens.textColor } };
        theme.legend = { textStyle: { color: tokens.textColor } };
    }

    theme.tooltip = {
        backgroundColor: tokens.contentBackground || '#ffffff',
        borderColor: tokens.contentBorderColor || 'rgba(0,0,0,0.1)',
        textStyle: { color: tokens.textColor || '#1f2937' }
    };

    return theme;
}
