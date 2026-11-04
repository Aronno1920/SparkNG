import type { ButtonDesignTokens, ButtonTokenSections } from '@bdspark/sparkng-themes/types/button';

export const root: ButtonTokenSections.Root = {
    borderRadius: '{form.field.border.radius}',
    roundedBorderRadius: '{form.field.border.radius}',
    gap: '0.5rem',
    paddingX: '1rem',
    paddingY: '0.4375rem',
    iconOnlyWidth: '2.25rem',
    sm: {
        fontSize: '{form.field.sm.font.size}',
        paddingX: '0.75rem',
        paddingY: '0.3125rem',
        iconOnlyWidth: '2rem'
    },
    lg: {
        fontSize: '{form.field.lg.font.size}',
        paddingX: '1.5rem',
        paddingY: '0.5625rem',
        iconOnlyWidth: '2.5rem'
    },
    label: {
        fontWeight: '500'
    },
    raisedShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    focusRing: {
        width: '{focus.ring.width}',
        style: '{focus.ring.style}',
        offset: '{focus.ring.offset}'
    },
    badgeSize: '1rem',
    transitionDuration: '{form.field.transition.duration}'
};

export const colorScheme: ButtonTokenSections.ColorScheme = {
    light: {
        root: {
            primary: {
                background: '{primary.color}',
                hoverBackground: 'color-mix(in srgb, {primary.color}, transparent 10%)',
                activeBackground: 'color-mix(in srgb, {primary.color}, transparent 20%)',
                borderColor: '{primary.color}',
                hoverBorderColor: 'color-mix(in srgb, {primary.color}, transparent 10%)',
                activeBorderColor: 'color-mix(in srgb, {primary.color}, transparent 20%)',
                color: '{primary.contrast.color}',
                hoverColor: '{primary.contrast.color}',
                activeColor: '{primary.contrast.color}',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: 'none'
                }
            },
            secondary: {
                background: '{surface.100}',
                hoverBackground: 'color-mix(in srgb, {surface.100}, transparent 20%)',
                activeBackground: 'color-mix(in srgb, {surface.100}, transparent 30%)',
                borderColor: '{surface.100}',
                hoverBorderColor: 'color-mix(in srgb, {surface.100}, transparent 20%)',
                activeBorderColor: 'color-mix(in srgb, {surface.100}, transparent 30%)',
                color: '{surface.950}',
                hoverColor: '{surface.950}',
                activeColor: '{surface.950}',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: 'none'
                }
            },
            info: {
                background: '{sky.600}',
                hoverBackground: 'color-mix(in srgb, {sky.600}, transparent 10%)',
                activeBackground: 'color-mix(in srgb, {sky.600}, transparent 20%)',
                borderColor: '{sky.600}',
                hoverBorderColor: 'color-mix(in srgb, {sky.600}, transparent 10%)',
                activeBorderColor: 'color-mix(in srgb, {sky.600}, transparent 20%)',
                color: '#ffffff',
                hoverColor: '#ffffff',
                activeColor: '#ffffff',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: 'none'
                }
            },
            success: {
                background: '{green.600}',
                hoverBackground: 'color-mix(in srgb, {green.600}, transparent 10%)',
                activeBackground: 'color-mix(in srgb, {green.600}, transparent 20%)',
                borderColor: '{green.600}',
                hoverBorderColor: 'color-mix(in srgb, {green.600}, transparent 10%)',
                activeBorderColor: 'color-mix(in srgb, {green.600}, transparent 20%)',
                color: '#ffffff',
                hoverColor: '#ffffff',
                activeColor: '#ffffff',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: 'none'
                }
            },
            warn: {
                background: '{amber.600}',
                hoverBackground: 'color-mix(in srgb, {amber.600}, transparent 10%)',
                activeBackground: 'color-mix(in srgb, {amber.600}, transparent 20%)',
                borderColor: '{amber.600}',
                hoverBorderColor: 'color-mix(in srgb, {amber.600}, transparent 10%)',
                activeBorderColor: 'color-mix(in srgb, {amber.600}, transparent 20%)',
                color: '#ffffff',
                hoverColor: '#ffffff',
                activeColor: '#ffffff',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: 'none'
                }
            },
            help: {
                background: '{violet.600}',
                hoverBackground: 'color-mix(in srgb, {violet.600}, transparent 10%)',
                activeBackground: 'color-mix(in srgb, {violet.600}, transparent 20%)',
                borderColor: '{violet.600}',
                hoverBorderColor: 'color-mix(in srgb, {violet.600}, transparent 10%)',
                activeBorderColor: 'color-mix(in srgb, {violet.600}, transparent 20%)',
                color: '#ffffff',
                hoverColor: '#ffffff',
                activeColor: '#ffffff',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: 'none'
                }
            },
            danger: {
                background: '{red.600}',
                hoverBackground: 'color-mix(in srgb, {red.600}, transparent 10%)',
                activeBackground: 'color-mix(in srgb, {red.600}, transparent 20%)',
                borderColor: '{red.600}',
                hoverBorderColor: 'color-mix(in srgb, {red.600}, transparent 10%)',
                activeBorderColor: 'color-mix(in srgb, {red.600}, transparent 20%)',
                color: '#ffffff',
                hoverColor: '#ffffff',
                activeColor: '#ffffff',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: 'none'
                }
            },
            contrast: {
                background: '{surface.950}',
                hoverBackground: '{surface.900}',
                activeBackground: '{surface.800}',
                borderColor: '{surface.950}',
                hoverBorderColor: '{surface.900}',
                activeBorderColor: '{surface.800}',
                color: '{surface.50}',
                hoverColor: '{surface.50}',
                activeColor: '{surface.50}',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: 'none'
                }
            }
        },
        outlined: {
            primary: {
                hoverBackground: 'color-mix(in srgb, {primary.color}, transparent 94%)',
                activeBackground: 'color-mix(in srgb, {primary.color}, transparent 88%)',
                borderColor: '{surface.200}',
                color: '{primary.color}'
            },
            secondary: {
                hoverBackground: '{surface.100}',
                activeBackground: '{surface.200}',
                borderColor: '{surface.200}',
                color: '{surface.950}'
            },
            success: {
                hoverBackground: 'color-mix(in srgb, {green.600}, transparent 94%)',
                activeBackground: 'color-mix(in srgb, {green.600}, transparent 88%)',
                borderColor: '{surface.200}',
                color: '{green.700}'
            },
            info: {
                hoverBackground: 'color-mix(in srgb, {sky.600}, transparent 94%)',
                activeBackground: 'color-mix(in srgb, {sky.600}, transparent 88%)',
                borderColor: '{surface.200}',
                color: '{sky.700}'
            },
            warn: {
                hoverBackground: 'color-mix(in srgb, {amber.600}, transparent 94%)',
                activeBackground: 'color-mix(in srgb, {amber.600}, transparent 88%)',
                borderColor: '{surface.200}',
                color: '{amber.700}'
            },
            help: {
                hoverBackground: 'color-mix(in srgb, {violet.600}, transparent 94%)',
                activeBackground: 'color-mix(in srgb, {violet.600}, transparent 88%)',
                borderColor: '{surface.200}',
                color: '{violet.700}'
            },
            danger: {
                hoverBackground: 'color-mix(in srgb, {red.600}, transparent 94%)',
                activeBackground: 'color-mix(in srgb, {red.600}, transparent 88%)',
                borderColor: '{surface.200}',
                color: '{red.700}'
            },
            contrast: {
                hoverBackground: '{surface.100}',
                activeBackground: '{surface.200}',
                borderColor: '{surface.300}',
                color: '{surface.950}'
            },
            plain: {
                hoverBackground: '{surface.100}',
                activeBackground: '{surface.200}',
                borderColor: '{surface.200}',
                color: '{surface.950}'
            }
        },
        text: {
            primary: {
                hoverBackground: 'color-mix(in srgb, {primary.color}, transparent 94%)',
                activeBackground: 'color-mix(in srgb, {primary.color}, transparent 88%)',
                color: '{primary.color}'
            },
            secondary: {
                hoverBackground: '{surface.100}',
                activeBackground: '{surface.200}',
                color: '{surface.500}'
            },
            success: {
                hoverBackground: 'color-mix(in srgb, {green.600}, transparent 94%)',
                activeBackground: 'color-mix(in srgb, {green.600}, transparent 88%)',
                color: '{green.700}'
            },
            info: {
                hoverBackground: 'color-mix(in srgb, {sky.600}, transparent 94%)',
                activeBackground: 'color-mix(in srgb, {sky.600}, transparent 88%)',
                color: '{sky.700}'
            },
            warn: {
                hoverBackground: 'color-mix(in srgb, {amber.600}, transparent 94%)',
                activeBackground: 'color-mix(in srgb, {amber.600}, transparent 88%)',
                color: '{amber.700}'
            },
            help: {
                hoverBackground: 'color-mix(in srgb, {violet.600}, transparent 94%)',
                activeBackground: 'color-mix(in srgb, {violet.600}, transparent 88%)',
                color: '{violet.700}'
            },
            danger: {
                hoverBackground: 'color-mix(in srgb, {red.600}, transparent 94%)',
                activeBackground: 'color-mix(in srgb, {red.600}, transparent 88%)',
                color: '{red.700}'
            },
            contrast: {
                hoverBackground: '{surface.100}',
                activeBackground: '{surface.200}',
                color: '{surface.950}'
            },
            plain: {
                hoverBackground: '{surface.100}',
                activeBackground: '{surface.200}',
                color: '{surface.950}'
            }
        },
        link: {
            color: '{primary.color}',
            hoverColor: '{primary.color}',
            activeColor: '{primary.color}'
        }
    },
    dark: {
        root: {
            primary: {
                background: '{primary.color}',
                hoverBackground: 'color-mix(in srgb, {primary.color}, transparent 10%)',
                activeBackground: 'color-mix(in srgb, {primary.color}, transparent 20%)',
                borderColor: '{primary.color}',
                hoverBorderColor: 'color-mix(in srgb, {primary.color}, transparent 10%)',
                activeBorderColor: 'color-mix(in srgb, {primary.color}, transparent 20%)',
                color: '{primary.contrast.color}',
                hoverColor: '{primary.contrast.color}',
                activeColor: '{primary.contrast.color}',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: 'none'
                }
            },
            secondary: {
                background: '{surface.800}',
                hoverBackground: 'color-mix(in srgb, {surface.800}, transparent 20%)',
                activeBackground: 'color-mix(in srgb, {surface.800}, transparent 30%)',
                borderColor: '{surface.800}',
                hoverBorderColor: 'color-mix(in srgb, {surface.800}, transparent 20%)',
                activeBorderColor: 'color-mix(in srgb, {surface.800}, transparent 30%)',
                color: '{surface.50}',
                hoverColor: '{surface.50}',
                activeColor: '{surface.50}',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: 'none'
                }
            },
            info: {
                background: '{sky.500}',
                hoverBackground: 'color-mix(in srgb, {sky.500}, transparent 10%)',
                activeBackground: 'color-mix(in srgb, {sky.500}, transparent 20%)',
                borderColor: '{sky.500}',
                hoverBorderColor: 'color-mix(in srgb, {sky.500}, transparent 10%)',
                activeBorderColor: 'color-mix(in srgb, {sky.500}, transparent 20%)',
                color: '#ffffff',
                hoverColor: '#ffffff',
                activeColor: '#ffffff',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: 'none'
                }
            },
            success: {
                background: '{green.500}',
                hoverBackground: 'color-mix(in srgb, {green.500}, transparent 10%)',
                activeBackground: 'color-mix(in srgb, {green.500}, transparent 20%)',
                borderColor: '{green.500}',
                hoverBorderColor: 'color-mix(in srgb, {green.500}, transparent 10%)',
                activeBorderColor: 'color-mix(in srgb, {green.500}, transparent 20%)',
                color: '#ffffff',
                hoverColor: '#ffffff',
                activeColor: '#ffffff',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: 'none'
                }
            },
            warn: {
                background: '{amber.500}',
                hoverBackground: 'color-mix(in srgb, {amber.500}, transparent 10%)',
                activeBackground: 'color-mix(in srgb, {amber.500}, transparent 20%)',
                borderColor: '{amber.500}',
                hoverBorderColor: 'color-mix(in srgb, {amber.500}, transparent 10%)',
                activeBorderColor: 'color-mix(in srgb, {amber.500}, transparent 20%)',
                color: '#ffffff',
                hoverColor: '#ffffff',
                activeColor: '#ffffff',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: 'none'
                }
            },
            help: {
                background: '{violet.500}',
                hoverBackground: 'color-mix(in srgb, {violet.500}, transparent 10%)',
                activeBackground: 'color-mix(in srgb, {violet.500}, transparent 20%)',
                borderColor: '{violet.500}',
                hoverBorderColor: 'color-mix(in srgb, {violet.500}, transparent 10%)',
                activeBorderColor: 'color-mix(in srgb, {violet.500}, transparent 20%)',
                color: '#ffffff',
                hoverColor: '#ffffff',
                activeColor: '#ffffff',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: 'none'
                }
            },
            danger: {
                background: '{red.600}',
                hoverBackground: 'color-mix(in srgb, {red.600}, transparent 10%)',
                activeBackground: 'color-mix(in srgb, {red.600}, transparent 20%)',
                borderColor: '{red.600}',
                hoverBorderColor: 'color-mix(in srgb, {red.600}, transparent 10%)',
                activeBorderColor: 'color-mix(in srgb, {red.600}, transparent 20%)',
                color: '#ffffff',
                hoverColor: '#ffffff',
                activeColor: '#ffffff',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: 'none'
                }
            },
            contrast: {
                background: '{surface.50}',
                hoverBackground: '{surface.100}',
                activeBackground: '{surface.200}',
                borderColor: '{surface.50}',
                hoverBorderColor: '{surface.100}',
                activeBorderColor: '{surface.200}',
                color: '{surface.950}',
                hoverColor: '{surface.950}',
                activeColor: '{surface.950}',
                focusRing: {
                    color: '{focus.ring.color}',
                    shadow: 'none'
                }
            }
        },
        outlined: {
            primary: {
                hoverBackground: 'color-mix(in srgb, {primary.color}, transparent 94%)',
                activeBackground: 'color-mix(in srgb, {primary.color}, transparent 88%)',
                borderColor: 'rgba(255,255,255,0.15)',
                color: '{primary.color}'
            },
            secondary: {
                hoverBackground: '{surface.800}',
                activeBackground: '{surface.700}',
                borderColor: 'rgba(255,255,255,0.15)',
                color: '{surface.50}'
            },
            success: {
                hoverBackground: 'color-mix(in srgb, {green.500}, transparent 94%)',
                activeBackground: 'color-mix(in srgb, {green.500}, transparent 88%)',
                borderColor: 'rgba(255,255,255,0.15)',
                color: '{green.400}'
            },
            info: {
                hoverBackground: 'color-mix(in srgb, {sky.500}, transparent 94%)',
                activeBackground: 'color-mix(in srgb, {sky.500}, transparent 88%)',
                borderColor: 'rgba(255,255,255,0.15)',
                color: '{sky.400}'
            },
            warn: {
                hoverBackground: 'color-mix(in srgb, {amber.500}, transparent 94%)',
                activeBackground: 'color-mix(in srgb, {amber.500}, transparent 88%)',
                borderColor: 'rgba(255,255,255,0.15)',
                color: '{amber.400}'
            },
            help: {
                hoverBackground: 'color-mix(in srgb, {violet.500}, transparent 94%)',
                activeBackground: 'color-mix(in srgb, {violet.500}, transparent 88%)',
                borderColor: 'rgba(255,255,255,0.15)',
                color: '{violet.400}'
            },
            danger: {
                hoverBackground: 'color-mix(in srgb, {red.500}, transparent 94%)',
                activeBackground: 'color-mix(in srgb, {red.500}, transparent 88%)',
                borderColor: 'rgba(255,255,255,0.15)',
                color: '{red.400}'
            },
            contrast: {
                hoverBackground: '{surface.800}',
                activeBackground: '{surface.700}',
                borderColor: 'rgba(255,255,255,0.25)',
                color: '{surface.50}'
            },
            plain: {
                hoverBackground: '{surface.800}',
                activeBackground: '{surface.700}',
                borderColor: 'rgba(255,255,255,0.15)',
                color: '{surface.50}'
            }
        },
        text: {
            primary: {
                hoverBackground: 'color-mix(in srgb, {primary.color}, transparent 92%)',
                activeBackground: 'color-mix(in srgb, {primary.color}, transparent 84%)',
                color: '{primary.color}'
            },
            secondary: {
                hoverBackground: '{surface.800}',
                activeBackground: '{surface.700}',
                color: '{surface.400}'
            },
            success: {
                hoverBackground: 'color-mix(in srgb, {green.500}, transparent 92%)',
                activeBackground: 'color-mix(in srgb, {green.500}, transparent 84%)',
                color: '{green.400}'
            },
            info: {
                hoverBackground: 'color-mix(in srgb, {sky.500}, transparent 92%)',
                activeBackground: 'color-mix(in srgb, {sky.500}, transparent 84%)',
                color: '{sky.400}'
            },
            warn: {
                hoverBackground: 'color-mix(in srgb, {amber.500}, transparent 92%)',
                activeBackground: 'color-mix(in srgb, {amber.500}, transparent 84%)',
                color: '{amber.400}'
            },
            help: {
                hoverBackground: 'color-mix(in srgb, {violet.500}, transparent 92%)',
                activeBackground: 'color-mix(in srgb, {violet.500}, transparent 84%)',
                color: '{violet.400}'
            },
            danger: {
                hoverBackground: 'color-mix(in srgb, {red.500}, transparent 92%)',
                activeBackground: 'color-mix(in srgb, {red.500}, transparent 84%)',
                color: '{red.400}'
            },
            contrast: {
                hoverBackground: '{surface.800}',
                activeBackground: '{surface.700}',
                color: '{surface.50}'
            },
            plain: {
                hoverBackground: '{surface.800}',
                activeBackground: '{surface.700}',
                color: '{surface.50}'
            }
        },
        link: {
            color: '{primary.color}',
            hoverColor: '{primary.color}',
            activeColor: '{primary.color}'
        }
    }
};

export default {
    root,
    colorScheme
} satisfies ButtonDesignTokens;
