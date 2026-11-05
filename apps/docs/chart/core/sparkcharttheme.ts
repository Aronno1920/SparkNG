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
 * across the color spectrum in light mode (Blue, Emerald, Orange, Violet, Cyan, Rose, Gold, Teal, Purple, Pink, Lime, Indigo, Sky, Fuchsia, Red, Green).
 */
export const VIBRANT_CHART_PALETTE: string[] = [
    '#3b82f6', // Blue
    '#10b981', // Emerald
    '#f97316', // Orange
    '#8b5cf6', // Violet
    '#06b6d4', // Cyan
    '#f43f5e', // Rose
    '#eab308', // Amber / Gold
    '#14b8a6', // Teal
    '#a855f7', // Purple
    '#ec4899', // Pink
    '#84cc16', // Lime
    '#6366f1', // Indigo
    '#0284c7', // Sky
    '#d946ef', // Fuchsia
    '#ef4444', // Red
    '#22c55e' // Green
];

/**
 * Curated pool of vibrant, luminous categorical hues optimized for dark mode
 * surfaces with high contrast, clarity and visual appeal.
 */
export const VIBRANT_CHART_PALETTE_DARK: string[] = [
    '#60a5fa', // Blue 400
    '#34d399', // Emerald 400
    '#fb923c', // Orange 400
    '#a78bfa', // Violet 400
    '#38bdf8', // Sky 400
    '#fb7185', // Rose 400
    '#facc15', // Yellow 400
    '#2dd4bf', // Teal 400
    '#c084fc', // Purple 400
    '#f472b6', // Pink 400
    '#a3e635', // Lime 400
    '#818cf8', // Indigo 400
    '#0ea5e9', // Deep Sky 500
    '#e879f9', // Fuchsia 400
    '#f87171', // Red 400
    '#4ade80' // Green 400
];

/**
 * Determines whether a color is chromatic (has vibrant hue/saturation)
 * rather than neutral/achromatic (grayscale, black, white, slate, noir).
 */
export function isChromatic(rgb: RGB): boolean {
    const [r, g, b] = rgb;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max === 0) return false;
    const saturation = (max - min) / max;
    // Low saturation (< 30%) or near black (max < 40) or pure white (min > 240 with low saturation)
    if (saturation < 0.3 || max < 40 || (min > 240 && saturation < 0.15)) {
        return false;
    }
    return true;
}

function colorDistance(a: RGB, b: RGB): number {
    const dr = a[0] - b[0];
    const dg = a[1] - b[1];
    const db = a[2] - b[2];
    return Math.sqrt(2 * dr * dr + 4 * dg * dg + 3 * db * db);
}

/**
 * Detects whether dark mode is currently active from the document or design tokens.
 */
export function isDarkMode(document?: Document | null, tokens?: SparkChartTokens): boolean {
    if (document?.documentElement?.classList?.contains('p-dark')) {
        return true;
    }
    if (document?.documentElement?.classList?.contains('dark')) {
        return true;
    }
    if (tokens?.contentBackground) {
        const bgRgb = parseColor(tokens.contentBackground);
        if (bgRgb) {
            const brightness = (bgRgb[0] * 299 + bgRgb[1] * 587 + bgRgb[2] * 114) / 1000;
            return brightness < 128;
        }
    }
    return false;
}

/**
 * Builds a vibrant multi-color categorical palette for charts.
 * When a chromatic primary color is provided, it anchors the first series/slice to the active
 * preset and fills subsequent positions with distinct, high-contrast hues across
 * the color spectrum. If the primary color is achromatic (e.g. Noir, Slate, black, white),
 * the curated vibrant palette is used directly to ensure colorful data visualization.
 *
 * @param primary - Optional primary color to anchor the palette to.
 * @param isDark - Whether dark mode palette should be used.
 * @returns An array of distinct hex color strings.
 */
export function buildChartPalette(primary?: string | null, isDark: boolean = false): string[] {
    const basePalette = isDark ? VIBRANT_CHART_PALETTE_DARK : VIBRANT_CHART_PALETTE;
    const primaryRgb = primary ? parseColor(primary) : null;

    if (!primaryRgb || !isChromatic(primaryRgb)) {
        return [...basePalette];
    }

    const primaryHex = toHex(primaryRgb);
    const result: string[] = [primaryHex];

    for (const hex of basePalette) {
        if (result.length >= basePalette.length) break;
        const rgb = parseColor(hex);
        if (rgb && colorDistance(primaryRgb, rgb) >= 80) {
            result.push(hex);
        }
    }

    for (const hex of basePalette) {
        if (result.length >= basePalette.length) break;
        if (!result.includes(hex)) {
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
    const isDark = isDarkMode(document, tokens);
    const theme: SparkChartTheme = { backgroundColor: 'transparent' };

    const textColor = tokens.textColor || (isDark ? '#f1f5f9' : '#0f172a');
    const mutedColor = tokens.mutedColor || (isDark ? '#94a3b8' : '#64748b');
    const axisLineColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)';
    const splitLineColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
    const tooltipBg = tokens.contentBackground || (isDark ? 'rgba(24, 24, 27, 0.95)' : 'rgba(255, 255, 255, 0.95)');
    const tooltipBorder = tokens.contentBorderColor || (isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)');

    const textStyle: Record<string, any> = { color: textColor };
    if (tokens.fontFamily) textStyle.fontFamily = tokens.fontFamily;
    theme.textStyle = textStyle;

    const palette = buildChartPalette(tokens.primary, isDark);
    if (palette.length) theme.color = palette;

    theme.title = {
        textStyle: { color: textColor, ...(tokens.fontFamily ? { fontFamily: tokens.fontFamily } : {}) },
        subtextStyle: { color: mutedColor, ...(tokens.fontFamily ? { fontFamily: tokens.fontFamily } : {}) }
    };

    theme.legend = {
        textStyle: { color: textColor, ...(tokens.fontFamily ? { fontFamily: tokens.fontFamily } : {}) },
        pageTextStyle: { color: mutedColor },
        pageIconColor: mutedColor,
        pageIconInactiveColor: isDark ? '#475569' : '#cbd5e1'
    };

    theme.tooltip = {
        backgroundColor: tooltipBg,
        borderColor: tooltipBorder,
        borderWidth: 1,
        padding: [8, 12],
        textStyle: { color: textColor, ...(tokens.fontFamily ? { fontFamily: tokens.fontFamily } : {}), fontSize: 12 },
        axisPointer: {
            lineStyle: { color: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.2)', width: 1 },
            crossStyle: { color: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.2)', width: 1 },
            shadowStyle: { color: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)' }
        }
    };

    const axisCommon = {
        axisLine: { show: true, lineStyle: { color: axisLineColor } },
        axisTick: { show: true, lineStyle: { color: axisLineColor } },
        axisLabel: { color: mutedColor, ...(tokens.fontFamily ? { fontFamily: tokens.fontFamily } : {}) },
        splitLine: { show: true, lineStyle: { color: splitLineColor } },
        splitArea: { show: false }
    };

    theme.categoryAxis = { ...axisCommon };
    theme.valueAxis = { ...axisCommon };
    theme.logAxis = { ...axisCommon };
    theme.timeAxis = { ...axisCommon };

    theme.visualMap = {
        color: isDark ? ['#f43f5e', '#fb923c', '#facc15', '#34d399', '#60a5fa'] : ['#ef4444', '#f97316', '#eab308', '#10b981', '#3b82f6'],
        textStyle: { color: mutedColor }
    };

    theme.dataZoom = {
        backgroundColor: 'transparent',
        dataBackground: {
            lineStyle: { color: isDark ? '#60a5fa' : '#3b82f6', width: 1 },
            areaStyle: { color: isDark ? 'rgba(96, 165, 250, 0.2)' : 'rgba(59, 130, 246, 0.15)' }
        },
        selectedDataBackground: {
            lineStyle: { color: isDark ? '#38bdf8' : '#2563eb', width: 1.5 },
            areaStyle: { color: isDark ? 'rgba(56, 189, 248, 0.35)' : 'rgba(37, 99, 235, 0.25)' }
        },
        fillerColor: isDark ? 'rgba(96, 165, 250, 0.15)' : 'rgba(59, 130, 246, 0.1)',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.1)',
        handleStyle: {
            color: isDark ? '#60a5fa' : '#3b82f6',
            borderColor: isDark ? '#0f172a' : '#ffffff'
        },
        moveHandleStyle: {
            color: mutedColor
        },
        textStyle: { color: mutedColor }
    };

    theme.radar = {
        axisLine: { lineStyle: { color: axisLineColor } },
        splitLine: { lineStyle: { color: splitLineColor } },
        splitArea: {
            show: true,
            areaStyle: {
                color: isDark ? ['rgba(255, 255, 255, 0.02)', 'rgba(255, 255, 255, 0.05)'] : ['rgba(0, 0, 0, 0.01)', 'rgba(0, 0, 0, 0.03)']
            }
        },
        axisName: { color: mutedColor }
    };

    theme.candlestick = {
        itemStyle: {
            color: isDark ? '#f87171' : '#ef4444',
            color0: isDark ? '#34d399' : '#10b981',
            borderColor: isDark ? '#f87171' : '#ef4444',
            borderColor0: isDark ? '#34d399' : '#10b981'
        }
    };

    theme.timeline = {
        lineStyle: { color: axisLineColor, width: 2 },
        itemStyle: { color: isDark ? '#60a5fa' : '#3b82f6', borderWidth: 1 },
        controlStyle: { color: mutedColor, borderColor: mutedColor },
        checkpointStyle: { color: isDark ? '#38bdf8' : '#2563eb', borderColor: isDark ? '#0f172a' : '#ffffff' },
        label: { color: mutedColor }
    };

    theme.gauge = {
        title: {
            color: textColor,
            ...(tokens.fontFamily ? { fontFamily: tokens.fontFamily } : {})
        },
        detail: {
            color: 'auto',
            ...(tokens.fontFamily ? { fontFamily: tokens.fontFamily } : {})
        },
        axisLabel: {
            color: mutedColor,
            ...(tokens.fontFamily ? { fontFamily: tokens.fontFamily } : {})
        }
    };

    return theme;
}
