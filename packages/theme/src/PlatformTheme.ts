import type {
    ColorScheme,
    FontSizeScale,
    RadiusScale,
    ShadowScale,
    SpacingScale,
    TransitionScale,
    Typography,
    ZIndexScale,
} from '@kozydozy/tokens'

/**
 * Concrete, resolved Button styling read by the shared `Button` primitive.
 * Produced by `createTheme` from a brand's compact `ButtonTokens` descriptor.
 */
export interface ButtonTheme {
    radius: string
    textTransform: string
    letterSpacing: string
    lineHeight: string
    fontSizeLg: string
    padding: { sm: string; md: string; lg: string }
    solid: {
        shadow: string
        hoverShadow: string
        hoverTransform: string
        activeTransform: string
        activeOpacity: number
    }
}

/** Resolved Spinner values (colour resolved for the active mode). */
export interface SpinnerTheme {
    color: string
    size: number
    duration: string
}

/**
 * The styled-components `DefaultTheme` for every Kozy Dozy app.
 *
 * The first nine members are shape-identical to the original per-app
 * `SportsTheme`, so every extracted `ui/` primitive keeps working unchanged.
 * `components` is the additive part that carries the tokenised Button/Spinner
 * styling — additive only, so nothing that read the old theme shape breaks.
 */
export interface PlatformTheme {
    isDark: boolean
    spacing: SpacingScale
    fontSize: FontSizeScale
    colors: ColorScheme
    typography: Typography
    radius: RadiusScale
    shadow: ShadowScale
    transition: TransitionScale
    zIndex: ZIndexScale
    components: {
        button: ButtonTheme
        spinner: SpinnerTheme
    }
}

/**
 * Back-compat alias. The three styled apps type their local theme as
 * `SportsTheme`; keeping the name available lets Phase 2 swap the import path
 * (`@/styles/theme` -> `@kozydozy/theme`) without touching call sites.
 * @deprecated Prefer `PlatformTheme`.
 */
export type SportsTheme = PlatformTheme

declare module 'styled-components' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface DefaultTheme extends PlatformTheme {}
}
