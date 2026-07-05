# @kozydozy/theme — Migration Notes

## What this package is

The styled-components layer. It turns a `BrandTokens` preset into the concrete
`{ light, dark }` themes that flow through `<ThemeProvider>`, and it owns the
`DefaultTheme` type augmentation that types every `${({ theme }) => ...}` in
`@kozydozy/ui`.

## What was extracted (Phase 1)

| File | Source | Notes |
|---|---|---|
| `src/PlatformTheme.ts` | The `SportsTheme` interface, identical in all three styled apps | Renamed to `PlatformTheme`; adds `components.{button,spinner}`. Carries the `declare module 'styled-components'` augmentation. |
| `src/GlobalStyle.ts` | `*/react/src/styles/GlobalStyle.ts` (brand-invariant) | Verbatim; reads the theme, incl. the `--sc-*` CSS-variable bridge for plain-CSS primitives. |
| `src/createTheme.ts` | New | Builds light+dark themes from a preset. Replaces the hand-written `lightTheme`/`darkTheme` exports each app kept in its `theme.ts`. |

## Key decisions

### `PlatformTheme` is a superset of the old `SportsTheme`
The first nine members are shape-identical to the per-app `SportsTheme`, so every
extracted primitive keeps working unchanged. The only addition is `components`, which
carries the tokenised Button/Spinner styling. **Additive only** — nothing that read the
old shape breaks.

### `SportsTheme` alias kept for a frictionless Phase 2
`export type SportsTheme = PlatformTheme` is provided (deprecated) so that when the apps
are migrated, call sites like `useTheme() as SportsTheme` only need their **import path**
swapped (`@/styles/theme` → `@kozydozy/theme`), not their code.

### `createTheme` resolves the button/spinner descriptors
`createTheme` reads a brand's compact `button`/`spinner` descriptor and expands it into
concrete, mode-aware CSS (e.g. `elevated: true` → base shadow `shadow.sm`, hover shadow
`shadow.md`, `translateY(-2px)`; `elevated: false` → `none` everywhere, which is
byte-identical to a flat button). This is what lets one shared component render both
brands without a redesign.

## Not done here (by design)

- No app calls `createTheme` yet — apps still ship their own `styles/theme.ts` (Phase 2).
- The apps' `index.css` still owns the font `@import`, box-sizing reset, and keyframes —
  those don't need theme access and were intentionally left in place.

## Phase 2 wiring sketch

```ts
// providers/StyledThemeProvider.tsx (app)
import { createTheme, GlobalStyle } from '@kozydozy/theme'
import { mkEquineTokens } from '@kozydozy/tokens'

const themes = createTheme(mkEquineTokens)
const theme = mode === 'dark' ? themes.dark : themes.light
// <ThemeProvider theme={theme}><GlobalStyle />…</ThemeProvider>
```
