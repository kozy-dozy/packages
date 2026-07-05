import type { BrandTokens } from '../types'

/**
 * Nursery — emerald/amber garden palette, authored to match Nursery's existing
 * Tailwind brand (primary = emerald-600, accents amber). Nursery is still a
 * Tailwind app; this styled-components theme is wired in alongside Tailwind and
 * is consumed only by shared `@kozydozy/*` styled components as pages are
 * migrated later. It does NOT affect the current Tailwind UI.
 */
export const nurseryTokens: BrandTokens = {
    name: 'nursery',
    colors: {
        light: {
            primary: '#059669', // emerald-600
            primaryHover: '#047857', // emerald-700
            primaryLight: '#ecfdf5', // emerald-50
            primaryLightAlt: '#d1fae5', // emerald-100
            secondary: '#d97706', // amber-600
            secondaryHover: '#b45309', // amber-700
            secondaryLight: '#fffbeb', // amber-50
            brandRed: '#dc2626',
            accentGold: '#f59e0b',
            text: {
                primary: '#111827',
                secondary: '#6b7280',
                inverse: '#ffffff',
                dark: '#111827',
                muted: '#6b7280',
                inverseMuted: 'rgba(255,255,255,0.7)',
                disabled: '#9ca3af',
            },
            bg: {
                page: '#ffffff',
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
            primary: '#34d399', // emerald-400
            primaryHover: '#6ee7b7',
            primaryLight: '#064e3b',
            primaryLightAlt: '#065f46',
            secondary: '#f59e0b',
            secondaryHover: '#fbbf24',
            secondaryLight: '#422006',
            brandRed: '#f87171',
            accentGold: '#fbbf24',
            text: {
                primary: '#f1f5f9',
                secondary: '#94a3b8',
                inverse: '#111827',
                dark: '#ffffff',
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
        fontPrimary: "'Inter', system-ui, sans-serif",
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
    // Future default for the shared styled Button (Nursery's current Button is
    // Tailwind; this only applies once pages adopt @kozydozy/ui).
    button: {
        radius: 'md',
        textTransform: 'none',
        letterSpacing: 'normal',
        lineHeight: 'normal',
        fontSizeLg: '16px',
        padding: {
            sm: '8px 16px',
            md: '10px 20px',
            lg: '12px 24px',
        },
        elevated: false,
        activeOpacity: 0.9,
    },
    spinner: {
        colorSlot: 'primary',
        size: 30,
        duration: '0.9s',
    },
}

export default nurseryTokens
