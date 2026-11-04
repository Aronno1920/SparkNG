import type { InputOtpDesignTokens, InputOtpTokenSections } from '@bdspark/sparkng-themes/types/inputotp';

export const root: InputOtpTokenSections.Root = {
    gap: '0.5rem'
};

export const input: InputOtpTokenSections.Input = {
    width: '2.25rem',
    sm: {
        width: '2rem'
    },
    lg: {
        width: '2.75rem'
    }
};

export default {
    root,
    input
} satisfies InputOtpDesignTokens;
