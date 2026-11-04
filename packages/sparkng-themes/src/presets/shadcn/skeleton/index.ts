import type { SkeletonDesignTokens, SkeletonTokenSections } from '@bdspark/sparkng-themes/types/skeleton';

export const root: SkeletonTokenSections.Root = {
    borderRadius: '{border.radius.md}'
};

export const colorScheme: SkeletonTokenSections.ColorScheme = {
    light: {
        root: {
            background: '{surface.100}',
            animationBackground: 'rgba(255,255,255,0.5)'
        }
    },
    dark: {
        root: {
            background: '{surface.800}',
            animationBackground: 'rgba(255, 255, 255, 0.06)'
        }
    }
};

export default {
    root,
    colorScheme
} satisfies SkeletonDesignTokens;
