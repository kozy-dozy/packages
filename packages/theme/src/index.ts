/**
 * @kozydozy/theme — styled-components theme layer for the Kozy Dozy platform.
 *
 * - `PlatformTheme`  the `DefaultTheme` contract (with a `SportsTheme` alias)
 * - `createTheme`    build { light, dark } themes from a `BrandTokens` preset
 * - `GlobalStyle`    theme-aware base CSS + CSS-variable bridge
 *
 * The `declare module 'styled-components'` augmentation in `PlatformTheme.ts`
 * types `useTheme()` and every `${({ theme }) => ...}` across `@kozydozy/ui`.
 */

// Side-effect (non-type) import so the `declare module 'styled-components'`
// augmentation in PlatformTheme.ts is loaded by ANY value consumer of this
// package — a type-only re-export alone is elided and the augmentation is lost.
import './PlatformTheme'

export { createTheme } from './createTheme'
export { default as GlobalStyle } from './GlobalStyle'
export type {
    PlatformTheme,
    SportsTheme,
    ButtonTheme,
    SpinnerTheme,
} from './PlatformTheme'
