import type { TooltipDesignTokens, TooltipTokenSections } from '@bdspark/sparkng-themes/types/tooltip';

export const root: TooltipTokenSections.Root = {
    maxWidth: '12.5rem',
    gutter: '0.25rem',
    shadow: '{overlay.popover.shadow}',
    padding: '0.25rem 0.5rem',
    borderRadius: '{border.radius.md}'
};

export const colorScheme: TooltipTokenSections.ColorScheme = {
    light: {
        root: {
            background: '{primary.color}',
            color: '{primary.contrast.color}'
        }
    },
    dark: {
        root: {
            background: '{primary.color}',
            color: '{primary.contrast.color}'
        }
    }
};

export default {
    root,
    colorScheme
} satisfies TooltipDesignTokens;
