import type { InplaceTokenSections } from '@bdspark/sparkng-themes/types/inplace';

export * from '@bdspark/sparkng-themes/types/inplace';

declare const root: InplaceTokenSections.Root;
declare const display: InplaceTokenSections.Display;
declare const _default: {
    root: InplaceTokenSections.Root;
    display: InplaceTokenSections.Display;
};

export { _default as default, display, root };
