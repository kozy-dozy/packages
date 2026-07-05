# @kozydozy/tokens — Migration Notes

## What this package is

The single source of truth for design **values** across the Kozy Dozy platform.
Framework-agnostic on purpose: no React, no styled-components, no CSS-in-JS. It is
consumed by `@kozydozy/theme`, which turns tokens into styled-components themes.

## What was extracted (Phase 1)

| File | Source | Notes |
|---|---|---|
| `src/scale.ts` | Identical in both apps | `spacing`, `fontSize`, `transition`, `zIndex` were byte-identical across MK Equine and Michelle Points, so they live here once. |
| `src/types.ts` | New | The `BrandTokens` contract every brand implements. |
| `src/presets/mk-equine.ts` | `mk-equine/react/src/styles/theme.ts` | `colors` (light+dark), `typography`, `radius`, `shadow` copied verbatim. |
| `src/presets/michelle-points.ts` | `michelle-points/react/src/styles/theme.ts` | Same, verbatim. |

## Token contract expansion (`button`, `spinner`)

The one non-verbatim addition is the `button` and `spinner` descriptors on
`BrandTokens`. These exist so the shared Button/Spinner can reproduce each brand's
**current** look without a redesign (the "tokenize" decision). They are pure data:

- `button` — `radius`, `textTransform`, `letterSpacing`, `lineHeight`, `fontSizeLg`,
  `padding`, `elevated`, `activeOpacity`. Values were read directly out of each app's
  existing `Button.tsx` (e.g. MK Equine `elevated: false` + uppercase; Michelle
  `elevated: true` + pill radius).
- `spinner` — `colorSlot`, `size`, `duration`. **The spinner icon is deliberately not
  a token** (a React component is not a value); apps pass it via the `icon` prop when
  they adopt `@kozydozy/ui`.

## Not done here (by design)

- No app imports these tokens yet (Phase 2).
- Nursery's Tailwind tokens (`config/theme.tokens.ts`) are **not** represented here —
  Nursery is Phase 3.
- Varsity Spotlight's palette is **not** a preset yet — Phase 4.

## Verifying a preset stayed faithful

Compare a preset against its source app after any change:

```bash
# spot-check colours against the original theme.ts
diff <(grep -oE "#[0-9a-fA-F]{3,8}" packages/tokens/src/presets/mk-equine.ts | sort -u) \
     <(grep -oE "#[0-9a-fA-F]{3,8}" mk-equine/react/src/styles/theme.ts | sort -u)
```
