# @kozydozy/shared — Migration Notes

## What this package is

App-agnostic UI helper components extracted from the styled-components apps.
Phase 1b deliberately took only the **Tier-A** subset: components that depend
solely on `@kozydozy/ui` (+ react / react-router). **Varsity Spotlight is the
canonical source.**

## Files moved (9)

| File | Dependency |
|---|---|
| `ActionLink` | react-router-dom (`Link`) |
| `ConfirmDialog` | `@kozydozy/ui` (Avatar, Button, Dialog) |
| `Container` | `CommonProps` only |
| `GrowShrinkTag` | `@kozydozy/ui` (Tag) |
| `IconText` | `CommonProps` only |
| `Loading` | `@kozydozy/ui` (Spinner) |
| `PageTransition` | `@kozydozy/ui` (Spinner) |
| `StickyFooter` | `CommonProps` only |
| `NavToggle` | react-icons (a11y variant is canonical) |

## Deferred (NOT moved) — and why

| File | Reason | Unblocks when |
|---|---|---|
| `DataTable`, `loaders/TableRow` | Brand-named public props (`mkEquineAvatarProps` vs `varsitySpotlightAvatarProps`) + brand-component import; neutralizing touches call sites | A dedicated prop-neutralization step |
| `AdaptableCard`, `DoubleSidedImage` | Couple to `@/store` + `@/constants/theme.constant` | Phase 1c foundation |
| `AuthorityCheck` | Couples to `@/utils/hooks/useAuthority` | Phase 1c foundation |
| `Chart` | Couples to `@/configs/chart.config` + `theme.constant` | Phase 1c foundation |
| `FormButton` | MK Equine-only orphan (not shared) | stays app-local |

## Changes made during extraction

- **Import rewrite (path-only):** `@/components/ui/X` → `@kozydozy/ui/X`.
- **`CommonProps`:** was imported from the app's `@/@types/common`; now imported
  from `@kozydozy/ui`, which re-exports an identical `CommonProps` (single source
  of truth). `TableQueries` (used only by the deferred DataTable) was not needed.
- **`theme-augment.d.ts`:** one-line `import '@kozydozy/theme'` to load the
  `DefaultTheme` augmentation (subpath ui imports don't pull it in transitively).
- **Barrel is a subset:** `index.ts` exports only the 9 moved components; the
  deferred `DataTable`/`AdaptableCard`/etc. exports were dropped from it.
- No component logic, props, or styling changed. `NavToggle` uses the
  a11y-improved variant (`aria-hidden` on the icons) already present in Varsity /
  Michelle — this is the canonical version, not a new change.

## Nursery equivalents to replace later (Phase 3)

Nursery has **Tailwind** versions of 8 of these (`ActionLink`, `ConfirmDialog`,
`Container`, `IconText`, `Loading`, `PageTransition`, `StickyFooter`,
`NavToggle`). Phase 3 **replaces** those with these shared styled-components
components. `GrowShrinkTag` is **absent** in Nursery — it simply adopts the
shared one on migration. Do not copy Nursery's Tailwind versions here.

## Dependencies

- `@kozydozy/ui`, `@kozydozy/theme` (workspace), `react-icons`
- peers: `react`, `react-dom`, `react-router-dom`, `styled-components`

## Phase 2 adoption (per styled app)

```ts
// swap local imports:  '@/components/shared'  ->  '@kozydozy/shared'
import { Loading, Container, ConfirmDialog } from '@kozydozy/shared'
```
The app keeps its local `components/shared/` for the deferred files until those
are extracted. No app is wired yet — that's Phase 2.

## Validated

`yarn typecheck` passes against a real install.
