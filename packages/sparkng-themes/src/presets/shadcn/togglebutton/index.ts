import type { ToggleButtonDesignTokens, ToggleButtonTokenSections } from '@bdspark/sparkng-themes/types/togglebutton';

export const root: ToggleButtonTokenSections.Root = {
    padding: '0.1875rem',
    borderRadius: '{border.radius.md}',
    gap: '0.5rem',
    fontWeight: '500',
    disabledBackground: '{form.field.disabled.background}',
    disabledBorderColor: '{form.field.disabled.background}',
    disabledColor: '{form.field.disabled.color}',
    invalidBorderColor: '{form.field.invalid.border.color}',
    focusRing: {
        width: '{focus.ring.width}',
        style: '{focus.ring.style}',
        color: '{focus.ring.color}',
        offset: '{focus.ring.offset}',
        shadow: '{focus.ring.shadow}'
    },
    transitionDuration: '{form.field.transition.duration}',
    sm: {
        fontSize: '{form.field.sm.font.size}',
        padding: '0.1875rem'
    },
    lg: {
        fontSize: '{form.field.lg.font.size}',
        padding: '0.1875rem'
    }
};

export const icon: ToggleButtonTokenSections.Icon = {
    disabledColor: '{form.field.disabled.color}'
};

export const content: ToggleButtonTokenSections.Content = {
    padding: '0.375rem 0.75rem',
    borderRadius: 'calc({border.radius.md} - 3px)',
    checkedShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: {
        padding: '0.25rem 0.5rem'
    },
    lg: {
        padding: '0.5rem 1rem'
    }
};

export const colorScheme: ToggleButtonTokenSections.ColorScheme = {
    light: {
        root: {
            background: '{surface.100}',
            checkedBackground: '{surface.100}',
            hoverBackground: '{surface.100}',
            borderColor: '{surface.100}',
            color: '{surface.500}',
            hoverColor: '{surface.700}',
            checkedColor: '{surface.950}',
            checkedBorderColor: '{surface.100}'
        },
        content: {
            checkedBackground: '{surface.0}'
        },
        icon: {
            color: '{surface.500}',
            hoverColor: '{surface.700}',
            checkedColor: '{surface.950}'
        }
    },
    dark: {
        root: {
            background: '{surface.800}',
            checkedBackground: '{surface.800}',
            hoverBackground: '{surface.800}',
            borderColor: '{surface.800}',
            color: '{surface.400}',
            hoverColor: '{surface.300}',
            checkedColor: '{surface.50}',
            checkedBorderColor: '{surface.800}'
        },
        content: {
            checkedBackground: '{surface.950}'
        },
        icon: {
            color: '{surface.400}',
            hoverColor: '{surface.300}',
            checkedColor: '{surface.50}'
        }
    }
};

export default {
    root,
    icon,
    content,
    colorScheme
} satisfies ToggleButtonDesignTokens;
