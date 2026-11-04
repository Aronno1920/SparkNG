import type { ToastDesignTokens, ToastTokenSections } from '@bdspark/sparkng-themes/types/toast';

export const root: ToastTokenSections.Root = {
    width: '25rem',
    borderRadius: '{content.border.radius}',
    borderWidth: '1px',
    transitionDuration: '{transition.duration}'
};

export const icon: ToastTokenSections.Icon = {
    size: '1.125rem'
};

export const content: ToastTokenSections.Content = {
    padding: '{overlay.popover.padding}',
    gap: '0.5rem'
};

export const text: ToastTokenSections.Text = {
    gap: '0.5rem'
};

export const summary: ToastTokenSections.Summary = {
    fontWeight: '400',
    fontSize: '0.875rem'
};

export const detail: ToastTokenSections.Detail = {
    fontWeight: '400',
    fontSize: '0.875rem'
};

export const closeButton: ToastTokenSections.CloseButton = {
    width: '1.75rem',
    height: '1.75rem',
    borderRadius: '50%',
    focusRing: {
        width: '{focus.ring.width}',
        style: '{focus.ring.style}',
        offset: '{focus.ring.offset}'
    }
};

export const closeIcon: ToastTokenSections.CloseIcon = {
    size: '1rem'
};

export const colorScheme: ToastTokenSections.ColorScheme = {
    light: {
        root: {
            blur: '1.5px'
        },
        info: {
            background: 'color-mix(in srgb, {sky.600}, transparent 96%)',
            borderColor: '{sky.200}',
            color: '{sky.700}',
            detailColor: '{surface.500}',
            shadow: 'none',
            closeButton: {
                hoverBackground: '{sky.100}',
                focusRing: {
                    color: '{sky.700}',
                    shadow: 'none'
                }
            }
        },
        success: {
            background: 'color-mix(in srgb, {green.700}, transparent 96%)',
            borderColor: '{green.200}',
            color: '{green.700}',
            detailColor: '{surface.500}',
            shadow: 'none',
            closeButton: {
                hoverBackground: '{green.100}',
                focusRing: {
                    color: '{green.700}',
                    shadow: 'none'
                }
            }
        },
        warn: {
            background: 'color-mix(in srgb, {amber.600}, transparent 96%)',
            borderColor: '{amber.200}',
            color: '{amber.700}',
            detailColor: '{surface.500}',
            shadow: 'none',
            closeButton: {
                hoverBackground: '{amber.100}',
                focusRing: {
                    color: '{amber.700}',
                    shadow: 'none'
                }
            }
        },
        error: {
            background: 'color-mix(in srgb, {red.600}, transparent 96%)',
            borderColor: '{red.200}',
            color: '{red.600}',
            detailColor: '{surface.500}',
            shadow: 'none',
            closeButton: {
                hoverBackground: '{red.100}',
                focusRing: {
                    color: '{red.600}',
                    shadow: 'none'
                }
            }
        },
        secondary: {
            background: '{surface.100}',
            borderColor: '{surface.200}',
            color: '{surface.950}',
            detailColor: '{surface.500}',
            shadow: 'none',
            closeButton: {
                hoverBackground: '{surface.200}',
                focusRing: {
                    color: '{surface.950}',
                    shadow: 'none'
                }
            }
        },
        contrast: {
            background: '{surface.900}',
            borderColor: '{surface.950}',
            color: '{surface.50}',
            detailColor: '{surface.0}',
            shadow: 'none',
            closeButton: {
                hoverBackground: '{surface.800}',
                focusRing: {
                    color: '{surface.50}',
                    shadow: 'none'
                }
            }
        }
    },
    dark: {
        root: {
            blur: '10px'
        },
        info: {
            background: 'color-mix(in srgb, {sky.500}, transparent 92%)',
            borderColor: 'color-mix(in srgb, {sky.500}, transparent 82%)',
            color: '{sky.400}',
            detailColor: '{surface.0}',
            shadow: 'none',
            closeButton: {
                hoverBackground: 'rgba(255, 255, 255, 0.05)',
                focusRing: {
                    color: '{sky.400}',
                    shadow: 'none'
                }
            }
        },
        success: {
            background: 'color-mix(in srgb, {green.500}, transparent 92%)',
            borderColor: 'color-mix(in srgb, {green.500}, transparent 82%)',
            color: '{green.400}',
            detailColor: '{surface.0}',
            shadow: 'none',
            closeButton: {
                hoverBackground: 'rgba(255, 255, 255, 0.05)',
                focusRing: {
                    color: '{green.400}',
                    shadow: 'none'
                }
            }
        },
        warn: {
            background: 'color-mix(in srgb, {amber.500}, transparent 92%)',
            borderColor: 'color-mix(in srgb, {amber.500}, transparent 82%)',
            color: '{amber.400}',
            detailColor: '{surface.0}',
            shadow: 'none',
            closeButton: {
                hoverBackground: 'rgba(255, 255, 255, 0.05)',
                focusRing: {
                    color: '{amber.400}',
                    shadow: 'none'
                }
            }
        },
        error: {
            background: 'color-mix(in srgb, {red.500}, transparent 92%)',
            borderColor: 'color-mix(in srgb, {red.500}, transparent 82%)',
            color: '{red.400}',
            detailColor: '{surface.0}',
            shadow: 'none',
            closeButton: {
                hoverBackground: 'rgba(255, 255, 255, 0.05)',
                focusRing: {
                    color: '{red.400}',
                    shadow: 'none'
                }
            }
        },
        secondary: {
            background: '{surface.800}',
            borderColor: '{surface.700}',
            color: '{surface.50}',
            detailColor: '{surface.0}',
            shadow: 'none',
            closeButton: {
                hoverBackground: '{surface.700}',
                focusRing: {
                    color: '{surface.50}',
                    shadow: 'none'
                }
            }
        },
        contrast: {
            background: '{surface.0}',
            borderColor: '{surface.100}',
            color: '{surface.950}',
            detailColor: '{surface.950}',
            shadow: 'none',
            closeButton: {
                hoverBackground: '{surface.100}',
                focusRing: {
                    color: '{surface.950}',
                    shadow: 'none'
                }
            }
        }
    }
};

export default {
    root,
    icon,
    content,
    text,
    summary,
    detail,
    closeButton,
    closeIcon,
    colorScheme
} satisfies ToastDesignTokens;
