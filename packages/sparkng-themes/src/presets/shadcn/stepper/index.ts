import type { StepperDesignTokens, StepperTokenSections } from '@bdspark/sparkng-themes/types/stepper';

export const root: StepperTokenSections.Root = {
    transitionDuration: '{transition.duration}'
};

export const separator: StepperTokenSections.Separator = {
    background: '{content.border.color}',
    activeBackground: '{primary.color}',
    margin: '0 0 0 1.625rem',
    size: '2px'
};

export const step: StepperTokenSections.Step = {
    padding: '0.5rem',
    gap: '1rem'
};

export const stepHeader: StepperTokenSections.StepHeader = {
    padding: '0',
    borderRadius: '{content.border.radius}',
    focusRing: {
        width: '{focus.ring.width}',
        style: '{focus.ring.style}',
        color: '{focus.ring.color}',
        offset: '{focus.ring.offset}',
        shadow: '{focus.ring.shadow}'
    },
    gap: '0.5rem'
};

export const stepTitle: StepperTokenSections.StepTitle = {
    color: '{text.muted.color}',
    activeColor: '{primary.contrast.color}',
    fontWeight: '500'
};

export const stepNumber: StepperTokenSections.StepNumber = {
    background: '{content.background}',
    activeBackground: '{primary.color}',
    borderColor: '{content.border.color}',
    activeBorderColor: '{content.border.color}',
    color: '{text.muted.color}',
    activeColor: '{primary.contrast.color}',
    size: '2rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    borderRadius: '50%',
    shadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
};

export const steppanels: StepperTokenSections.Steppanels = {
    padding: '0.875rem 0.5rem 1.125rem 0.5rem'
};

export const steppanel: StepperTokenSections.Steppanel = {
    background: '{content.background}',
    color: '{content.color}',
    padding: '0',
    indent: '1rem'
};

export default {
    root,
    separator,
    step,
    stepHeader,
    stepTitle,
    stepNumber,
    steppanels,
    steppanel
} satisfies StepperDesignTokens;
