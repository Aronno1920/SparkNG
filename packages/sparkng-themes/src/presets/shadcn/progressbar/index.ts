import type { ProgressBarDesignTokens, ProgressBarTokenSections } from '@bdspark/sparkng-themes/types/progressbar';

export const root: ProgressBarTokenSections.Root = {
    background: '{surface.100}',
    borderRadius: '9999px',
    height: '0.5rem'
};

export const value: ProgressBarTokenSections.Value = {
    background: '{primary.color}'
};

export const label: ProgressBarTokenSections.Label = {
    color: '{primary.contrast.color}',
    fontSize: '0.75rem',
    fontWeight: '500'
};

export const colorScheme: ProgressBarTokenSections.ColorScheme = {
    light: {
        root: {
            background: '{surface.100}'
        }
    },
    dark: {
        root: {
            background: '{surface.800}'
        }
    }
};

export default {
    root,
    value,
    label,
    colorScheme
} satisfies ProgressBarDesignTokens;
