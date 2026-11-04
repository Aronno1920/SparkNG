import type { ChipDesignTokens, ChipTokenSections } from '@bdspark/sparkng-themes/types/chip';

export const root: ChipTokenSections.Root = {
    borderRadius: '{border.radius.md}',
    paddingX: '0.625rem',
    paddingY: '0.25rem',
    gap: '0.5rem',
    transitionDuration: '{transition.duration}'
};

export const image: ChipTokenSections.Image = {
    width: '1.5rem',
    height: '1.5rem'
};

export const icon: ChipTokenSections.Icon = {
    size: '0.875rem'
};

export const removeIcon: ChipTokenSections.RemoveIcon = {
    size: '0.875rem',
    focusRing: {
        width: '{focus.ring.width}',
        style: '{focus.ring.style}',
        color: '{focus.ring.color}',
        offset: '{focus.ring.offset}',
        shadow: '{focus.ring.shadow}'
    }
};

export const colorScheme: ChipTokenSections.ColorScheme = {
    light: {
        root: {
            background: '{surface.100}',
            color: '{surface.950}'
        },
        icon: {
            color: '{surface.500}'
        },
        removeIcon: {
            color: '{surface.500}'
        }
    },
    dark: {
        root: {
            background: '{surface.800}',
            color: '{surface.50}'
        },
        icon: {
            color: '{surface.400}'
        },
        removeIcon: {
            color: '{surface.400}'
        }
    }
};

export default {
    root,
    image,
    icon,
    removeIcon,
    colorScheme
} satisfies ChipDesignTokens;
