import type { AvatarDesignTokens, AvatarTokenSections } from '@bdspark/sparkng-themes/types/avatar';

export const root: AvatarTokenSections.Root = {
    width: '2rem',
    height: '2rem',
    fontSize: '0.875rem',
    background: '{surface.100}',
    color: '{surface.950}',
    borderRadius: '9999px'
};

export const icon: AvatarTokenSections.Icon = {
    size: '1rem'
};

export const group: AvatarTokenSections.Group = {
    borderColor: '{content.background}',
    offset: '-0.75rem'
};

export const lg: AvatarTokenSections.Lg = {
    width: '3rem',
    height: '3rem',
    fontSize: '1.25rem',
    icon: {
        size: '1.5rem'
    },
    group: {
        offset: '-1rem'
    }
};

export const xl: AvatarTokenSections.Xl = {
    width: '4rem',
    height: '4rem',
    fontSize: '1.5rem',
    icon: {
        size: '2rem'
    },
    group: {
        offset: '-1.5rem'
    }
};

export const colorScheme: AvatarTokenSections.ColorScheme = {
    light: {
        root: {
            background: '{surface.100}',
            color: '{surface.950}'
        }
    },
    dark: {
        root: {
            background: '{surface.800}',
            color: '{surface.50}'
        }
    }
};

export default {
    root,
    icon,
    group,
    lg,
    xl,
    colorScheme
} satisfies AvatarDesignTokens;
