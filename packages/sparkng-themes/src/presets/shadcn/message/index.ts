import type { MessageDesignTokens, MessageTokenSections } from '@bdspark/sparkng-themes/types/message';

export const root: MessageTokenSections.Root = {
    borderRadius: '{content.border.radius}',
    borderWidth: '1px',
    transitionDuration: '{transition.duration}'
};

export const content: MessageTokenSections.Content = {
    padding: '0.75rem 1rem',
    gap: '0.5rem',
    sm: {
        padding: '0.375rem 0.625rem'
    },
    lg: {
        padding: '0.625rem 0.875rem'
    }
};

export const text: MessageTokenSections.Text = {
    fontSize: '0.875rem',
    fontWeight: '400',
    sm: {
        fontSize: '0.875rem'
    },
    lg: {
        fontSize: '1.125rem'
    }
};

export const icon: MessageTokenSections.Icon = {
    size: '1rem',
    sm: {
        size: '1rem'
    },
    lg: {
        size: '1.25rem'
    }
};

export const closeButton: MessageTokenSections.CloseButton = {
    width: '1.75rem',
    height: '1.75rem',
    borderRadius: '50%',
    focusRing: {
        width: '{focus.ring.width}',
        style: '{focus.ring.style}',
        offset: '{focus.ring.offset}'
    }
};

export const closeIcon: MessageTokenSections.CloseIcon = {
    size: '1rem',
    sm: {
        size: '0.875rem'
    },
    lg: {
        size: '1.125rem'
    }
};

export const outlined: MessageTokenSections.Outlined = {
    root: {
        borderWidth: '1px'
    }
};

export const simple: MessageTokenSections.Simple = {
    content: {
        padding: '0'
    }
};

export const colorScheme: MessageTokenSections.ColorScheme = {
    light: {
        info: {
            background: 'color-mix(in srgb, {sky.600}, transparent 96%)',
            borderColor: '{sky.200}',
            color: '{sky.700}',
            shadow: 'none',
            closeButton: {
                hoverBackground: '{sky.100}',
                focusRing: {
                    color: '{sky.700}',
                    shadow: 'none'
                }
            },
            outlined: {
                color: '{sky.700}',
                borderColor: '{sky.700}'
            },
            simple: {
                color: '{sky.700}'
            }
        },
        success: {
            background: 'color-mix(in srgb, {green.700}, transparent 96%)',
            borderColor: '{green.200}',
            color: '{green.700}',
            shadow: 'none',
            closeButton: {
                hoverBackground: '{green.100}',
                focusRing: {
                    color: '{green.700}',
                    shadow: 'none'
                }
            },
            outlined: {
                color: '{green.700}',
                borderColor: '{green.700}'
            },
            simple: {
                color: '{green.700}'
            }
        },
        warn: {
            background: 'color-mix(in srgb, {amber.600}, transparent 96%)',
            borderColor: '{amber.200}',
            color: '{amber.700}',
            shadow: 'none',
            closeButton: {
                hoverBackground: '{amber.100}',
                focusRing: {
                    color: '{amber.700}',
                    shadow: 'none'
                }
            },
            outlined: {
                color: '{amber.700}',
                borderColor: '{amber.700}'
            },
            simple: {
                color: '{amber.700}'
            }
        },
        error: {
            background: 'color-mix(in srgb, {red.600}, transparent 96%)',
            borderColor: '{red.200}',
            color: '{red.600}',
            shadow: 'none',
            closeButton: {
                hoverBackground: '{red.100}',
                focusRing: {
                    color: '{red.600}',
                    shadow: 'none'
                }
            },
            outlined: {
                color: '{red.600}',
                borderColor: '{red.600}'
            },
            simple: {
                color: '{red.600}'
            }
        },
        secondary: {
            background: '{surface.100}',
            borderColor: '{surface.200}',
            color: '{surface.950}',
            shadow: 'none',
            closeButton: {
                hoverBackground: '{surface.200}',
                focusRing: {
                    color: '{surface.950}',
                    shadow: 'none'
                }
            },
            outlined: {
                color: '{surface.500}',
                borderColor: '{surface.500}'
            },
            simple: {
                color: '{surface.500}'
            }
        },
        contrast: {
            background: '{surface.900}',
            borderColor: '{surface.950}',
            color: '{surface.50}',
            shadow: 'none',
            closeButton: {
                hoverBackground: '{surface.800}',
                focusRing: {
                    color: '{surface.50}',
                    shadow: 'none'
                }
            },
            outlined: {
                color: '{surface.950}',
                borderColor: '{surface.950}'
            },
            simple: {
                color: '{surface.950}'
            }
        }
    },
    dark: {
        info: {
            background: 'color-mix(in srgb, {sky.500}, transparent 92%)',
            borderColor: 'color-mix(in srgb, {sky.500}, transparent 82%)',
            color: '{sky.400}',
            shadow: 'none',
            closeButton: {
                hoverBackground: 'rgba(255, 255, 255, 0.05)',
                focusRing: {
                    color: '{sky.400}',
                    shadow: 'none'
                }
            },
            outlined: {
                color: '{sky.400}',
                borderColor: '{sky.500}'
            },
            simple: {
                color: '{sky.400}'
            }
        },
        success: {
            background: 'color-mix(in srgb, {green.500}, transparent 92%)',
            borderColor: 'color-mix(in srgb, {green.500}, transparent 82%)',
            color: '{green.400}',
            shadow: 'none',
            closeButton: {
                hoverBackground: 'rgba(255, 255, 255, 0.05)',
                focusRing: {
                    color: '{green.400}',
                    shadow: 'none'
                }
            },
            outlined: {
                color: '{green.400}',
                borderColor: '{green.500}'
            },
            simple: {
                color: '{green.400}'
            }
        },
        warn: {
            background: 'color-mix(in srgb, {amber.500}, transparent 92%)',
            borderColor: 'color-mix(in srgb, {amber.500}, transparent 82%)',
            color: '{amber.400}',
            shadow: 'none',
            closeButton: {
                hoverBackground: 'rgba(255, 255, 255, 0.05)',
                focusRing: {
                    color: '{amber.400}',
                    shadow: 'none'
                }
            },
            outlined: {
                color: '{amber.400}',
                borderColor: '{amber.500}'
            },
            simple: {
                color: '{amber.400}'
            }
        },
        error: {
            background: 'color-mix(in srgb, {red.500}, transparent 92%)',
            borderColor: 'color-mix(in srgb, {red.500}, transparent 82%)',
            color: '{red.400}',
            shadow: 'none',
            closeButton: {
                hoverBackground: 'rgba(255, 255, 255, 0.05)',
                focusRing: {
                    color: '{red.400}',
                    shadow: 'none'
                }
            },
            outlined: {
                color: '{red.400}',
                borderColor: '{red.500}'
            },
            simple: {
                color: '{red.400}'
            }
        },
        secondary: {
            background: '{surface.800}',
            borderColor: '{surface.700}',
            color: '{surface.50}',
            shadow: 'none',
            closeButton: {
                hoverBackground: '{surface.700}',
                focusRing: {
                    color: '{surface.50}',
                    shadow: 'none'
                }
            },
            outlined: {
                color: '{surface.400}',
                borderColor: '{surface.400}'
            },
            simple: {
                color: '{surface.400}'
            }
        },
        contrast: {
            background: '{surface.0}',
            borderColor: '{surface.100}',
            color: '{surface.950}',
            shadow: 'none',
            closeButton: {
                hoverBackground: '{surface.100}',
                focusRing: {
                    color: '{surface.950}',
                    shadow: 'none'
                }
            },
            outlined: {
                color: '{surface.0}',
                borderColor: '{surface.0}'
            },
            simple: {
                color: '{surface.0}'
            }
        }
    }
};

export default {
    root,
    content,
    text,
    icon,
    closeButton,
    closeIcon,
    outlined,
    simple,
    colorScheme
} satisfies MessageDesignTokens;
