import type { TabViewDesignTokens, TabViewTokenSections } from '@bdspark/sparkng-themes/types/tabview';

export const root: TabViewTokenSections.Root = {
    transitionDuration: '{transition.duration}'
};

export const tabList: TabViewTokenSections.TabList = {
    background: 'transparent',
    borderColor: '{content.border.color}'
};

export const tab: TabViewTokenSections.Tab = {
    borderColor: '{content.border.color}',
    activeBorderColor: '{surface.950}',
    color: '{text.muted.color}',
    hoverColor: '{text.color}',
    activeColor: '{text.color}'
};

export const tabPanel: TabViewTokenSections.TabPanel = {
    background: '{content.background}',
    color: '{content.color}'
};

export const navButton: TabViewTokenSections.NavButton = {
    background: '{content.background}',
    color: '{text.muted.color}',
    hoverColor: '{text.color}'
};

export const colorScheme: TabViewTokenSections.ColorScheme = {
    light: {
        navButton: {
            shadow: '0px 0px 10px 50px rgba(255, 255, 255, 0.6)'
        }
    },
    dark: {
        tab: {
            activeBorderColor: '{surface.50}'
        },
        navButton: {
            shadow: '0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)'
        }
    }
};

export default {
    root,
    tabList,
    tab,
    tabPanel,
    navButton,
    colorScheme
} satisfies TabViewDesignTokens;
