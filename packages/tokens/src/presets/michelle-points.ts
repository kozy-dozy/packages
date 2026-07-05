import type { BrandTokens } from '../types'

/**
 * Michelle Points — "premium family travel concierge" palette.
 * Primary #1D3557 (deep navy) · Secondary #4F8A8B (muted teal) · Accents coral/gold.
 *
 * Values extracted verbatim from michelle-points/react/src/styles/theme.ts
 * during Phase 1. The `button`/`spinner` descriptors encode the app's current
 * look so the shared components render identically once adopted (no redesign).
 */
export const michellePointsTokens: BrandTokens = {
    name: 'michelle-points',
    colors: {
        light: {
            primary: '#1D3557',
            primaryHover: '#162A46',
            primaryLight: '#E7EEF6',
            primaryLightAlt: '#F0F5FA',
            secondary: '#4F8A8B',
            secondaryHover: '#3F7071',
            secondaryLight: '#E4EEEE',
            brandRed: '#E07A5F',
            accentGold: '#D9A441',
            text: {
                primary: '#263238',
                secondary: '#55606E',
                inverse: '#ffffff',
                dark: '#1D3557',
                muted: '#6B7280',
                inverseMuted: 'rgba(255,255,255,0.80)',
                disabled: '#A6AEB8',
            },
            bg: {
                page: '#FFFDF8',
                card: '#ffffff',
                input: '#ffffff',
                hover: '#F6EFE6',
                muted: '#FBF7F0',
                overlay: 'rgba(29, 53, 87, 0.55)',
            },
            border: {
                default: '#E8DED2',
                strong: '#D8CBB8',
                dark: '#B7AA96',
            },
            status: {
                success: '#2E9E6B',
                error: '#E05555',
                warning: '#E0A02A',
                info: '#6FA8DC',
                successBg: '#D8F0E4',
                errorBg: '#FBE0E0',
            },
        },
        dark: {
            primary: '#7FB3E0',
            primaryHover: '#9AC4E8',
            primaryLight: '#22344C',
            primaryLightAlt: '#26384F',
            secondary: '#6FA8A9',
            secondaryHover: '#82B7B8',
            secondaryLight: '#1E2E2E',
            brandRed: '#E8917A',
            accentGold: '#E3B85C',
            text: {
                primary: '#F1F5F9',
                secondary: '#A3ADBC',
                inverse: '#1D3557',
                dark: '#FFFFFF',
                muted: '#94A3B8',
                inverseMuted: 'rgba(255,255,255,0.70)',
                disabled: '#64748B',
            },
            bg: {
                page: '#14202F',
                card: '#1B2A3D',
                input: '#1B2A3D',
                hover: '#253750',
                muted: '#253750',
                overlay: 'rgba(0,0,0,0.7)',
            },
            border: {
                default: '#2E4056',
                strong: '#3F5470',
                dark: '#1B2A3D',
            },
            status: {
                success: '#34d399',
                error: '#f87171',
                warning: '#fbbf24',
                info: '#8FC0E8',
                successBg: '#134e4a',
                errorBg: '#7f1d1d',
            },
        },
    },
    typography: {
        fontPrimary: "'Fraunces', 'Cormorant Garamond', Georgia, serif",
        fontSecondary: "'Inter', system-ui, -apple-system, sans-serif",
    },
    radius: {
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '20px',
        full: '9999px',
    },
    shadow: {
        light: {
            sm: '0 1px 3px rgba(29,53,87,0.08)',
            md: '0 6px 16px rgba(29,53,87,0.10)',
            lg: '0 14px 40px rgba(29,53,87,0.14)',
        },
        dark: {
            sm: '0 1px 3px rgba(0,0,0,0.3)',
            md: '0 6px 16px rgba(0,0,0,0.4)',
            lg: '0 14px 40px rgba(0,0,0,0.5)',
        },
    },
    // Pill, mixed-case, elevated (lifts on hover) — the current Michelle Points button.
    button: {
        radius: 'full',
        textTransform: 'none',
        letterSpacing: 'normal',
        lineHeight: '1.2',
        fontSizeLg: '16px',
        padding: {
            sm: '9px 18px',
            md: '13px 26px',
            lg: '17px 34px',
        },
        elevated: true,
        activeOpacity: 0.9,
    },
    // Shared spinner covers the single-icon case. Michelle's animated multi-sport
    // icon-cycler is app-specific — see ui/MIGRATION-NOTES.md for how it's handled.
    spinner: {
        colorSlot: 'secondary',
        size: 30,
        duration: '0.8s',
    },
}

export default michellePointsTokens
