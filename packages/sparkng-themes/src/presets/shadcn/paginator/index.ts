import type { PaginatorDesignTokens, PaginatorTokenSections } from '@bdspark/sparkng-themes/types/paginator';

export const root: PaginatorTokenSections.Root = {
    padding: '0.5rem 1rem',
    gap: '0.25rem',
    borderRadius: '{content.border.radius}',
    background: '{content.background}',
    color: '{content.color}',
    transitionDuration: '{transition.duration}'
};

export const navButton: PaginatorTokenSections.NavButton = {
    background: 'transparent',
    hoverBackground: '{content.hover.background}',
    selectedBackground: '{primary.color}',
    color: '{text.muted.color}',
    hoverColor: '{text.hover.muted.color}',
    selectedColor: '{primary.contrast.color}',
    width: '2.25rem',
    height: '2.25rem',
    borderRadius: '{border.radius.sm}',
    focusRing: {
        width: '{focus.ring.width}',
        style: '{focus.ring.style}',
        color: '{focus.ring.color}',
        offset: '{focus.ring.offset}',
        shadow: '{focus.ring.shadow}'
    }
};

export const currentPageReport: PaginatorTokenSections.CurrentPageReport = {
    color: '{text.muted.color}'
};

export const jumpToPageInput: PaginatorTokenSections.JumpToPageInput = {
    maxWidth: '2.5rem'
};

export default {
    root,
    navButton,
    currentPageReport,
    jumpToPageInput
} satisfies PaginatorDesignTokens;
