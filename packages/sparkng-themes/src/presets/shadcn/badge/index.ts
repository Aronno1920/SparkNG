import type { BadgeDesignTokens, BadgeTokenSections } from '@bdspark/sparkng-themes/types/badge';

export const root: BadgeTokenSections.Root = {
    borderRadius: '{border.radius.md}',
    padding: '0 0.5rem',
    fontSize: '0.75rem',
    fontWeight: '500',
    minWidth: '1.25rem',
    height: '1.25rem'
};
export const dot: BadgeTokenSections.Dot = {
    size: '0.375rem'
};

export const sm: BadgeTokenSections.Sm = {
    fontSize: '0.625rem',
    minWidth: '1.125rem',
    height: '1.125rem'
};

export const lg: BadgeTokenSections.Lg = {
    fontSize: '0.875rem',
    minWidth: '1.5rem',
    height: '1.5rem'
};

export const xl: BadgeTokenSections.Xl = {
    fontSize: '1rem',
    minWidth: '2rem',
    height: '2rem'
};

export const colorScheme: BadgeTokenSections.ColorScheme = {
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
            background: '{green.600}',
            color: '#ffffff'
        },
        info: {
            background: '{sky.600}',
            color: '#ffffff'
        },
        warn: {
            background: '{amber.600}',
            color: '#ffffff'
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
            background: '{green.500}',
            color: '#ffffff'
        },
        info: {
            background: '{sky.500}',
            color: '#ffffff'
        },
        warn: {
            background: '{amber.500}',
            color: '#ffffff'
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
    dot,
    sm,
    lg,
    xl,
    colorScheme
} satisfies BadgeDesignTokens;
