import type { BrandTokens } from '../types'

/**
 * Varsity Spotlight — blue/gold athletics palette.
 * Primary #025add (blue) · Secondary #fbb702 (gold) · brandRed #c8102e.
 *
 * Values extracted verbatim from varsity-spotlight/react/src/styles/theme.ts.
 * The `button` descriptor matches MK Equine's (their Button components were
 * byte-identical); the cycling sport-icon spinner is supplied app-side via
 * `configureSpinnerIcon` (the token here only sets size/duration/fallback).
 */
export const varsitySpotlightTokens: BrandTokens = {
    name: 'varsity-spotlight',
    colors: {
        light: {
            primary: '#025add',
            primaryHover: '#0147b5',
            primaryLight: '#e8f0fd',
            primaryLightAlt: '#dbeafe',
            secondary: '#fbb702',
            secondaryHover: '#e0a500',
            secondaryLight: '#fff8e1',
            brandRed: '#c8102e',
            accentGold: '#fbb702',
            text: {
                primary: '#1a1f36',
                secondary: '#6b7280',
                inverse: '#ffffff',
                dark: '#111',
                muted: '#777',
                inverseMuted: 'rgba(255,255,255,0.7)',
                disabled: '#9ca3af',
            },
            bg: {
                page: '#f5f6f6',
                card: '#ffffff',
                input: '#ffffff',
                hover: '#f3f4f6',
                muted: '#f9fafb',
                overlay: 'rgba(0, 0, 0, 0.5)',
            },
            border: {
                default: '#e5e7eb',
                strong: '#d1d5db',
                dark: '#4b5563',
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
            primary: '#4a8ff5',
            primaryHover: '#6aa3f7',
            primaryLight: '#1a2a4a',
            primaryLightAlt: '#1e293b',
            secondary: '#fbb702',
            secondaryHover: '#e0a500',
            secondaryLight: '#2a200a',
            brandRed: '#c8102e',
            accentGold: '#fbb702',
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
        fontPrimary: "'Titillium Web', sans-serif",
        fontSecondary: "'Roboto', sans-serif",
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
    // Square, uppercase, flat — identical to MK Equine's button.
    button: {
        radius: 'sm',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        lineHeight: 'normal',
        fontSizeLg: '15px',
        padding: {
            sm: '4px 24px',
            md: '8px 32px',
            lg: '16px 48px',
        },
        elevated: false,
        activeOpacity: 0.88,
    },
    // Shared Spinner covers size/duration/fallback; the cycling sport icons are
    // supplied app-side via configureSpinnerIcon (BrandSpinnerIcon).
    spinner: {
        colorSlot: 'primary',
        size: 30,
        duration: '0.8s',
    },
}

export default varsitySpotlightTokens
