import type { SliderDesignTokens, SliderTokenSections } from '@bdspark/sparkng-themes/types/slider';

export const root: SliderTokenSections.Root = {
    transitionDuration: '{transition.duration}'
};

export const track: SliderTokenSections.Track = {
    background: '{surface.100}',
    borderRadius: '9999px',
    size: '0.375rem'
};

export const range: SliderTokenSections.Range = {
    background: '{primary.color}'
};

export const handle: SliderTokenSections.Handle = {
    width: '1.25rem',
    height: '1.25rem',
    borderRadius: '50%',
    background: '{primary.color}',
    hoverBackground: '{primary.hover.color}',
    content: {
        borderRadius: '50%',
        hoverBackground: '{surface.0}',
        width: '1rem',
        height: '1rem',
        shadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1)'
    },
    focusRing: {
        width: '{focus.ring.width}',
        style: '{focus.ring.style}',
        color: '{focus.ring.color}',
        offset: '{focus.ring.offset}',
        shadow: '{focus.ring.shadow}'
    }
};

export const colorScheme: SliderTokenSections.ColorScheme = {
    light: {
        track: {
            background: '{surface.100}'
        },
        handle: {
            content: {
                background: '{surface.0}'
            }
        }
    },
    dark: {
        track: {
            background: '{surface.800}'
        },
        handle: {
            content: {
                background: '{surface.950}'
            }
        }
    }
};

export default {
    root,
    track,
    range,
    handle,
    colorScheme
} satisfies SliderDesignTokens;
