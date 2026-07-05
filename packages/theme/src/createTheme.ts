import { fontSize, spacing, transition, zIndex } from '@kozydozy/tokens'

import type {
    BrandTokens,
    ButtonTokens,
    ColorScheme,
    ShadowScale,
    SpinnerTokens,
} from '@kozydozy/tokens'
import type { ButtonTheme, PlatformTheme, SpinnerTheme } from './PlatformTheme'

type Mode = 'light' | 'dark'

/** A brand's compact button descriptor -> concrete, mode-aware CSS values. */
function resolveButton(
    button: ButtonTokens,
    radius: BrandTokens['radius'],
    shadow: ShadowScale,
): ButtonTheme {
    return {
        radius: radius[button.radius],
        textTransform: button.textTransform,
        letterSpacing: button.letterSpacing,
        lineHeight: button.lineHeight,
        fontSizeLg: button.fontSizeLg,
        padding: button.padding,
        solid: {
            // A non-elevated brand (MK Equine) gets `none`, which is identical to
            // its current button (no shadow / no transform); an elevated brand
            // (Michelle Points) gets its shadow scale and a lift.
            shadow: button.elevated ? shadow.sm : 'none',
            hoverShadow: button.elevated ? shadow.md : 'none',
            hoverTransform: button.elevated ? 'translateY(-2px)' : 'none',
            activeTransform: button.elevated ? 'translateY(0)' : 'none',
            activeOpacity: button.activeOpacity,
        },
    }
}

function resolveSpinner(spinner: SpinnerTokens, colors: ColorScheme): SpinnerTheme {
    return {
        color: colors[spinner.colorSlot],
        size: spinner.size,
        duration: spinner.duration,
    }
}

function buildMode(brand: BrandTokens, mode: Mode): PlatformTheme {
    const colors = brand.colors[mode]
    const shadow = brand.shadow[mode]

    return {
        isDark: mode === 'dark',
        spacing,
        fontSize,
        transition,
        zIndex,
        colors,
        typography: brand.typography,
        radius: brand.radius,
        shadow,
        components: {
            button: resolveButton(brand.button, brand.radius, shadow),
            spinner: resolveSpinner(brand.spinner, colors),
        },
    }
}

/**
 * Build the light and dark styled-components themes for a brand.
 *
 * ```ts
 * import { createTheme } from '@kozydozy/theme'
 * import { mkEquineTokens } from '@kozydozy/tokens'
 * const { light, dark } = createTheme(mkEquineTokens)
 * ```
 */
export function createTheme(brand: BrandTokens): {
    light: PlatformTheme
    dark: PlatformTheme
} {
    return {
        light: buildMode(brand, 'light'),
        dark: buildMode(brand, 'dark'),
    }
}
