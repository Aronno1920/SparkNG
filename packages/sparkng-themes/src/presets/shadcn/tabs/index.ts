import type { TabsDesignTokens, TabsTokenSections } from '@bdspark/sparkng-themes/types/tabs';

export const root: TabsTokenSections.Root = {
    transitionDuration: '{transition.duration}'
};

export const tablist: TabsTokenSections.Tablist = {
    borderWidth: '0 0 1px 0',
    background: 'transparent',
    borderColor: '{content.border.color}'
};

export const tab: TabsTokenSections.Tab = {
    background: 'transparent',
    hoverBackground: 'transparent',
    activeBackground: 'transparent',
    borderWidth: '0 0 1px 0',
    borderColor: 'transparent',
    hoverBorderColor: 'transparent',
    activeBorderColor: '{surface.950}',
    color: '{text.muted.color}',
    hoverColor: '{text.color}',
    activeColor: '{text.color}',
    padding: '0.75rem 1rem',
    fontWeight: '500',
    margin: '0 0 -1px 0',
    gap: '0.5rem',
    focusRing: {
        width: '{focus.ring.width}',
        style: '{focus.ring.style}',
        color: '{focus.ring.color}',
        offset: '-1px',
        shadow: '{focus.ring.shadow}'
    }
};

export const tabpanel: TabsTokenSections.Tabpanel = {
    background: 'transparent',
    color: '{content.color}',
    padding: '1rem 0',
    focusRing: {
        width: '{focus.ring.width}',
        style: '{focus.ring.style}',
        color: '{focus.ring.color}',
        offset: '{focus.ring.offset}',
        shadow: 'inset {focus.ring.shadow}'
    }
};

export const navButton: TabsTokenSections.NavButton = {
    background: 'transparent',
    color: '{text.muted.color}',
    hoverColor: '{text.color}',
    width: '2.5rem',
    focusRing: {
        width: '{focus.ring.width}',
        style: '{focus.ring.style}',
        color: '{focus.ring.color}',
        offset: '-1px',
        shadow: '{focus.ring.shadow}'
    }
};

export const activeBar: TabsTokenSections.ActiveBar = {
    height: '2px',
    bottom: '-1px',
    background: '{surface.950}'
};

export const colorScheme: TabsTokenSections.ColorScheme = {
    light: {
        tab: {
            activeBorderColor: '{surface.950}'
        },
        activeBar: {
            background: '{surface.950}'
        },
        navButton: {
            shadow: '0px 0px 10px 50px rgba(255, 255, 255, 0.6)'
        }
    },
    dark: {
        tab: {
            activeBorderColor: '{surface.50}'
        },
        activeBar: {
            background: '{surface.50}'
        },
        navButton: {
            shadow: '0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)'
        }
    }
};

export default {
    root,
    tablist,
    tab,
    tabpanel,
    navButton,
    activeBar,
    colorScheme
} satisfies TabsDesignTokens;
