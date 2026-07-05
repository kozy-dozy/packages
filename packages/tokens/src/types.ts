/**
 * Token type contracts.
 *
 * A `BrandTokens` object is the single source of truth for one brand's visual
 * identity. The `@kozydozy/theme` package consumes it (via `createTheme`) to
 * produce the concrete styled-components themes; the `@kozydozy/ui` primitives
 * never read a preset directly — they read the assembled theme.
 */

/** Per-mode colour palette. Shape matches the original per-app `SportsTheme.colors`. */
export interface ColorScheme {
    primary: string
    primaryHover: string
    primaryLight: string
    primaryLightAlt: string
    secondary: string
    secondaryHover: string
    secondaryLight: string
    brandRed: string
    accentGold: string
    text: {
        primary: string
        secondary: string
        inverse: string
        dark: string
        muted: string
        inverseMuted: string
        disabled: string
    }
    bg: {
        page: string
        card: string
        input: string
        hover: string
        muted: string
        overlay: string
    }
    border: {
        default: string
        strong: string
        dark: string
    }
    status: {
        success: string
        error: string
        warning: string
        info: string
        successBg: string
        errorBg: string
    }
}

export interface RadiusScale {
    sm: string
    md: string
    lg: string
    xl: string
    full: string
}

export interface ShadowScale {
    sm: string
    md: string
    lg: string
}

export interface Typography {
    fontPrimary: string
    fontSecondary: string
}

/** Colour slots a spinner may point at (resolved per-mode into a concrete colour). */
export type ColorSlot = 'primary' | 'secondary' | 'accentGold' | 'brandRed'

/**
 * Compact, semantic description of a brand's Button personality. Kept as data
 * (not CSS) so `createTheme` can resolve it against the brand's radius/shadow
 * scales. This is the "token contract expansion" that lets one shared Button
 * reproduce both the MK Equine (square/uppercase) and Michelle Points
 * (pill/elevated) designs without a redesign.
 */
export interface ButtonTokens {
    /** Key into the brand `RadiusScale` (MK Equine: `sm`; Michelle: `full`). */
    radius: keyof RadiusScale
    /** CSS `text-transform` (MK Equine: `uppercase`; Michelle: `none`). */
    textTransform: string
    /** CSS `letter-spacing` (MK Equine: `1.5px`; Michelle: `normal`). */
    letterSpacing: string
    /** CSS `line-height` (MK Equine: `normal`; Michelle: `1.2`). */
    lineHeight: string
    /** Font size for the `lg` size (MK Equine: `15px`; Michelle: `16px`). */
    fontSizeLg: string
    /** Full `padding` shorthand per size, resolved to concrete values. */
    padding: { sm: string; md: string; lg: string }
    /**
     * Whether the solid variant lifts on hover (base + hover shadow, translateY).
     * MK Equine: `false` (flat). Michelle Points: `true` (elevated).
     */
    elevated: boolean
    /** Opacity applied to the solid variant on `:active`. */
    activeOpacity: number
}

/**
 * Spinner values that are genuine tokens. NOTE: the spinner *icon* itself is a
 * brand asset (a React component), not a token — apps pass it via the `icon`
 * prop when they adopt `@kozydozy/ui` in Phase 2. See the ui package
 * MIGRATION-NOTES for the Michelle Points multi-icon-cycler exception.
 */
export interface SpinnerTokens {
    /** Colour slot resolved per-mode (MK Equine: `accentGold`; Michelle: `secondary`). */
    colorSlot: ColorSlot
    /** Default pixel size of the spinner icon. */
    size: number
    /** Rotation duration (MK Equine: `0.9s`; Michelle: `0.8s`). */
    duration: string
}

/** Everything that varies between brands. */
export interface BrandTokens {
    name: string
    colors: { light: ColorScheme; dark: ColorScheme }
    typography: Typography
    radius: RadiusScale
    shadow: { light: ShadowScale; dark: ShadowScale }
    button: ButtonTokens
    spinner: SpinnerTokens
}
