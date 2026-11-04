import type { TagDesignTokens, TagTokenSections } from '@bdspark/sparkng-themes/types/tag';

export const root: TagTokenSections.Root = {
    fontSize: '0.75rem',
    fontWeight: '500',
    padding: '0.125rem 0.5rem',
    gap: '0.25rem',
    borderRadius: '{border.radius.md}',
    roundedBorderRadius: '9999px'
};

export const icon: TagTokenSections.Icon = {
    size: '0.75rem'
};

export const colorScheme: TagTokenSections.ColorScheme = {
    light: {
        primary: {
            background: '{primary.color}',
            color: '{primary.contrast.color}'
        },
        secondary: {
            background: '{surface.100}',
            color: '{surface.950}'
        },
        success: {
            background: '{green.100}',
            color: '{green.800}'
        },
        info: {
            background: '{sky.100}',
            color: '{sky.800}'
        },
        warn: {
            background: '{amber.100}',
            color: '{amber.800}'
        },
        danger: {
            background: '{red.600}',
            color: '#ffffff'
        },
        contrast: {
            background: '{surface.950}',
            color: '{surface.50}'
        }
    },
    dark: {
        primary: {
            background: '{primary.color}',
            color: '{primary.contrast.color}'
        },
        secondary: {
            background: '{surface.800}',
            color: '{surface.50}'
        },
        success: {
            background: 'color-mix(in srgb, {green.500}, transparent 85%)',
            color: '{green.300}'
        },
        info: {
            background: 'color-mix(in srgb, {sky.500}, transparent 85%)',
            color: '{sky.300}'
        },
        warn: {
            background: 'color-mix(in srgb, {amber.500}, transparent 85%)',
            color: '{amber.300}'
        },
        danger: {
            background: '{red.500}',
            color: '#ffffff'
        },
        contrast: {
            background: '{surface.50}',
            color: '{surface.950}'
        }
    }
};

export default {
    root,
    icon,
    colorScheme
} satisfies TagDesignTokens;
