import {
    Direction,
    Mode,
    ColorLevel,
    NavMode,
    ControlSize,
    LayoutType,
} from '../types/theme'
import { THEME_ENUM } from '../constants/theme.constant'

export type ThemeConfig = {
    themeColor: string
    direction: Direction
    mode: Mode
    primaryColorLevel: ColorLevel
    panelExpand: boolean
    navMode: NavMode
    controlSize: ControlSize
    cardBordered: boolean
    layout: {
        type: LayoutType
        sideNavCollapse: boolean
    }
}

export type ThemeConfigOverrides = Partial<
    Pick<ThemeConfig, 'themeColor' | 'primaryColorLevel' | 'mode'>
>

/**
 * Platform-wide theme defaults.
 *
 * `themeColor` / `primaryColorLevel` / `mode` were previously read from each
 * app's `config/theme.tokens`. In the styled-components apps those only feed the
 * legacy ConfigProvider colour-level system — the actual colours come from
 * `@kozydozy/theme` (`createTheme`) — so brand-neutral defaults are safe here.
 * An app that wants a different initial mode/brand hue can override via
 * `createThemeConfig(...)` or, at store build time, via `preloadedState`.
 */
export function createThemeConfig(
    overrides: ThemeConfigOverrides = {},
): ThemeConfig {
    return {
        themeColor: overrides.themeColor ?? '#2a85ff',
        primaryColorLevel: overrides.primaryColorLevel ?? 600,
        direction: THEME_ENUM.DIR_LTR,
        mode: overrides.mode ?? THEME_ENUM.MODE_LIGHT,
        cardBordered: true,
        panelExpand: false,
        controlSize: 'md',
        navMode: THEME_ENUM.NAV_MODE_LIGHT,
        layout: {
            type: THEME_ENUM.LAYOUT_TYPE_MODERN,
            sideNavCollapse: false,
        },
    }
}

export const themeConfig: ThemeConfig = createThemeConfig()
