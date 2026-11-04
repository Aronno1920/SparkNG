import type { CardDesignTokens, CardTokenSections } from '@bdspark/sparkng-themes/types/card';

export const root: CardTokenSections.Root = {
    background: '{content.background}',
    borderRadius: '{border.radius.xl}',
    color: '{content.color}',
    shadow: '0 0 0 1px {surface.200}, 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)'
};

export const body: CardTokenSections.Body = {
    padding: '1.5rem',
    gap: '1.5rem'
};

export const caption: CardTokenSections.Caption = {
    gap: '0.5rem'
};

export const title: CardTokenSections.Title = {
    fontSize: '1.125rem',
    fontWeight: '600'
};

export const subtitle: CardTokenSections.Subtitle = {
    color: '{text.muted.color}'
};

export const colorScheme: CardTokenSections.ColorScheme = {
    light: {
        root: {
            shadow: '0 0 0 1px {surface.200}, 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)'
        }
    },
    dark: {
        root: {
            background: '{surface.900}',
            shadow: '0 0 0 1px rgba(255,255,255,0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.4)'
        }
    }
};

export default {
    root,
    body,
    caption,
    title,
    subtitle,
    colorScheme
} satisfies CardDesignTokens;
