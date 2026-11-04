import type { ToggleSwitchDesignTokens, ToggleSwitchTokenSections } from '@bdspark/sparkng-themes/types/toggleswitch';

export const root: ToggleSwitchTokenSections.Root = {
    width: '2.25rem',
    height: '1.25rem',
    borderRadius: '9999px',
    gap: '0.125rem',
    shadow: 'none',
    focusRing: {
        width: '{focus.ring.width}',
        style: '{focus.ring.style}',
        color: '{focus.ring.color}',
        offset: '{focus.ring.offset}',
        shadow: '{focus.ring.shadow}'
    },
    borderWidth: '0',
    borderColor: 'transparent',
    hoverBorderColor: 'transparent',
    checkedBorderColor: 'transparent',
    checkedHoverBorderColor: 'transparent',
    invalidBorderColor: '{form.field.invalid.border.color}',
    transitionDuration: '{form.field.transition.duration}',
    slideDuration: '0.2s'
};

export const handle: ToggleSwitchTokenSections.Handle = {
    borderRadius: '50%',
    size: '1rem'
};

export const colorScheme: ToggleSwitchTokenSections.ColorScheme = {
    light: {
        root: {
            background: '{form.field.border.color}',
            disabledBackground: '{form.field.disabled.background}',
            hoverBackground: '{form.field.hover.border.color}',
            checkedBackground: '{primary.color}',
            checkedHoverBackground: '{primary.hover.color}'
        },
        handle: {
            background: '{surface.0}',
            disabledBackground: '{form.field.disabled.color}',
            hoverBackground: '{surface.0}',
            checkedBackground: '{surface.0}',
            checkedHoverBackground: '{surface.0}',
            color: '{text.muted.color}',
            hoverColor: '{text.color}',
            checkedColor: '{primary.contrast.color}',
            checkedHoverColor: '{primary.contrast.color}'
        }
    },
    dark: {
        root: {
            background: '{form.field.border.color}',
            disabledBackground: '{surface.800}',
            hoverBackground: '{form.field.hover.border.color}',
            checkedBackground: '{primary.color}',
            checkedHoverBackground: '{primary.hover.color}'
        },
        handle: {
            background: '{surface.950}',
            disabledBackground: '{surface.700}',
            hoverBackground: '{surface.950}',
            checkedBackground: '{surface.950}',
            checkedHoverBackground: '{surface.950}',
            color: '{surface.500}',
            hoverColor: '{surface.400}',
            checkedColor: '{primary.contrast.color}',
            checkedHoverColor: '{primary.contrast.color}'
        }
    }
};

export default {
    root,
    handle,
    colorScheme
} satisfies ToggleSwitchDesignTokens;
