import type { BrandTokens } from '../types'

/**
 * MK Equine — "luxury ranch" equestrian palette.
 * Primary #4a3426 (espresso brown) · Secondary #6f7a58 (sage) · Accent #a55b3a (terracotta).
 *
 * Values extracted verbatim from mk-equine/react/src/styles/theme.ts during
 * Phase 1. The `button`/`spinner` descriptors encode the app's current look so
 * the shared components render identically once adopted (no redesign).
 */
export const mkEquineTokens: BrandTokens = {
    name: 'mk-equine',
    colors: {
        light: {
            primary: '#4a3426',
            primaryHover: '#3a2a1e',
            primaryLight: '#f3ece2',
            primaryLightAlt: '#ede3d6',
            secondary: '#6f7a58',
            secondaryHover: '#5b6448',
            secondaryLight: '#eef0e7',
            brandRed: '#a55b3a',
            accentGold: '#a55b3a',
            text: {
                primary: '#3d2e22',
                secondary: '#6f6356',
                inverse: '#ffffff',
                dark: '#4a3426',
                muted: '#8f8069',
                inverseMuted: 'rgba(255,255,255,0.78)',
                disabled: '#bda98c',
            },
            bg: {
                page: '#fffdf8',
                card: '#ffffff',
                input: '#ffffff',
                hover: '#f7f1e7',
                muted: '#f7f1e7',
                overlay: 'rgba(40, 28, 18, 0.55)',
            },
            border: {
                default: '#e7ddd1',
                strong: '#d8ccba',
                dark: '#bda98c',
            },
            status: {
                success: '#10b981',
                error: '#ef4444',
                warning: '#f59e0b',
                info: '#3b82f6',
                successBg: '#d1fae5',
                errorBg: '#fee2e2',
            },
        },
        dark: {
            primary: '#d8b48f',
            primaryHover: '#e3c4a3',
            primaryLight: '#2a2018',
            primaryLightAlt: '#2e2419',
            secondary: '#9aa67d',
            secondaryHover: '#abb88e',
            secondaryLight: '#23291a',
            brandRed: '#c47a55',
            accentGold: '#c47a55',
            text: {
                primary: '#f1f5f9',
                secondary: '#94a3b8',
                inverse: '#1a1f36',
                dark: '#fff',
                muted: '#94a3b8',
                inverseMuted: 'rgba(255,255,255,0.7)',
                disabled: '#64748b',
            },
            bg: {
                page: '#0f172a',
                card: '#1e293b',
                input: '#1e293b',
                hover: '#334155',
                muted: '#334155',
                overlay: 'rgba(0, 0, 0, 0.7)',
            },
            border: {
                default: '#334155',
                strong: '#475569',
                dark: '#1e293b',
            },
            status: {
                success: '#34d399',
                error: '#f87171',
                warning: '#fbbf24',
                info: '#60a5fa',
                successBg: '#134e4a',
                errorBg: '#7f1d1d',
            },
        },
    },
    typography: {
        fontPrimary: "'Playfair Display', Georgia, serif",
        fontSecondary: "'Inter', system-ui, sans-serif",
    },
    radius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px',
    },
    shadow: {
        light: {
            sm: '0 1px 3px rgba(0,0,0,0.08)',
            md: '0 4px 12px rgba(0,0,0,0.10)',
            lg: '0 8px 24px rgba(0,0,0,0.12)',
        },
        dark: {
            sm: '0 1px 3px rgba(0,0,0,0.3)',
            md: '0 4px 12px rgba(0,0,0,0.4)',
            lg: '0 8px 24px rgba(0,0,0,0.5)',
        },
    },
    // Square, uppercase, flat — the current MK Equine button.
    button: {
        radius: 'sm',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        lineHeight: 'normal',
        fontSizeLg: '15px',
        padding: {
            sm: '4px 24px', // spacing.xs / spacing.lg
            md: '8px 32px', // spacing.sm / spacing.xl
            lg: '16px 48px', // spacing.md / spacing.2xl
        },
        elevated: false,
        activeOpacity: 0.88,
    },
    // Single rotating horseshoe (icon supplied by the app via the `icon` prop).
    spinner: {
        colorSlot: 'accentGold',
        size: 30,
        duration: '0.9s',
    },
}

export default mkEquineTokens
