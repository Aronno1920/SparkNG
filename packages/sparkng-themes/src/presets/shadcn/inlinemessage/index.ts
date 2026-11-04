import type { InlineMessageDesignTokens, InlineMessageTokenSections } from '@bdspark/sparkng-themes/types/inlinemessage';

export const root: InlineMessageTokenSections.Root = {
    padding: '{form.field.padding.y} {form.field.padding.x}',
    borderRadius: '{content.border.radius}',
    gap: '0.5rem'
};

export const text: InlineMessageTokenSections.Text = {
    fontWeight: '400'
};

export const icon: InlineMessageTokenSections.Icon = {
    size: '1rem'
};

export const colorScheme: InlineMessageTokenSections.ColorScheme = {
    light: {
        info: {
            background: 'color-mix(in srgb, {sky.600}, transparent 96%)',
            borderColor: '{sky.200}',
            color: '{sky.700}',
            shadow: 'none'
        },
        success: {
            background: 'color-mix(in srgb, {green.700}, transparent 96%)',
            borderColor: '{green.200}',
            color: '{green.700}',
            shadow: 'none'
        },
        warn: {
            background: 'color-mix(in srgb, {amber.600}, transparent 96%)',
            borderColor: '{amber.200}',
            color: '{amber.700}',
            shadow: 'none'
        },
        error: {
            background: 'color-mix(in srgb, {red.600}, transparent 96%)',
            borderColor: '{red.200}',
            color: '{red.600}',
            shadow: 'none'
        },
        secondary: {
            background: '{surface.100}',
            borderColor: '{surface.200}',
            color: '{surface.950}',
            shadow: 'none'
        },
        contrast: {
            background: '{surface.900}',
            borderColor: '{surface.950}',
            color: '{surface.50}',
            shadow: 'none'
        }
    },
    dark: {
        info: {
            background: 'color-mix(in srgb, {sky.500}, transparent 92%)',
            borderColor: 'color-mix(in srgb, {sky.500}, transparent 82%)',
            color: '{sky.400}',
            shadow: 'none'
        },
        success: {
            background: 'color-mix(in srgb, {green.500}, transparent 92%)',
            borderColor: 'color-mix(in srgb, {green.500}, transparent 82%)',
            color: '{green.400}',
            shadow: 'none'
        },
        warn: {
            background: 'color-mix(in srgb, {amber.500}, transparent 92%)',
            borderColor: 'color-mix(in srgb, {amber.500}, transparent 82%)',
            color: '{amber.400}',
            shadow: 'none'
        },
        error: {
            background: 'color-mix(in srgb, {red.500}, transparent 92%)',
            borderColor: 'color-mix(in srgb, {red.500}, transparent 82%)',
            color: '{red.400}',
            shadow: 'none'
        },
        secondary: {
            background: '{surface.800}',
            borderColor: '{surface.700}',
            color: '{surface.50}',
            shadow: 'none'
        },
        contrast: {
            background: '{surface.0}',
            borderColor: '{surface.100}',
            color: '{surface.950}',
            shadow: 'none'
        }
    }
};

export default {
    root,
    text,
    icon,
    colorScheme
} satisfies InlineMessageDesignTokens;
