/**
 * Brand-invariant scales.
 *
 * These values are byte-identical across MK Equine and Michelle Points
 * (verified during Phase 1 extraction), so they live once here rather than
 * being repeated in every brand preset. Brands that need a different scale
 * can still override by supplying their own values when a preset is built.
 */

export interface SpacingScale {
    xxs: string // 2px
    xs: string // 4px
    sm: string // 8px
    md: string // 16px
    lg: string // 24px
    xl: string // 32px
    '2xl': string // 48px
    '3xl': string // 64px
}

export interface FontSizeScale {
    xs: string // 11px
    sm: string // 12px
    base: string // 14px
    md: string // 16px
    lg: string // 18px
    xl: string // 20px
    '2xl': string // 24px
    '3xl': string // 30px
}

export interface TransitionScale {
    fast: string
    base: string
}

export interface ZIndexScale {
    dropdown: number
    modal: number
    toast: number
}

export const spacing: SpacingScale = {
    xxs: '2px',
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
}

export const fontSize: FontSizeScale = {
    xs: '11px',
    sm: '12px',
    base: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
}

export const transition: TransitionScale = {
    fast: '0.15s ease',
    base: '0.25s ease',
}

export const zIndex: ZIndexScale = {
    dropdown: 100,
    modal: 200,
    toast: 300,
}
