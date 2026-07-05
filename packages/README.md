# @kozydozy/* — Shared Design System (Phase 1)

Shared workspace packages extracted from the **MK Equine** and **Michelle Points**
styled-components apps. This is **Phase 1 of a 4-phase plan**:

1. **Phase 1 (this) — Extract the shared design system.** Create `tokens`, `theme`,
   and `ui` packages. **No app is migrated. No redesign. No functional change.**
2. Phase 2 — Point MK Equine + Michelle Points at these packages.
3. Phase 3 — Migrate Nursery (currently Tailwind).
4. Phase 4 — Bring Varsity Spotlight in.

## The packages

| Package | What it is | Depends on |
|---|---|---|
| [`@kozydozy/tokens`](./tokens) | Framework-agnostic design tokens: invariant scales + per-brand presets. No React, no styled-components. | — |
| [`@kozydozy/theme`](./theme) | styled-components layer: the `PlatformTheme` contract, `createTheme(brand)` factory, and `GlobalStyle`. | `tokens`, `styled-components` (peer) |
| [`@kozydozy/ui`](./ui) | The ~35 shared UI primitives (Button, Card, Table, Dialog, …) + form/toast infra, extracted from the two apps. | `theme`, `react`/`react-dom`/`styled-components` (peers) |
| [`@kozydozy/forms`](./forms) | **(Phase 1b)** Formik-integrated form fields (TextField, SelectField, …). | `ui`, `theme`, `formik` (peer) |
| [`@kozydozy/shared`](./shared) | **(Phase 1b)** App-agnostic UI helpers (Loading, Container, ConfirmDialog, …). | `ui`, `theme`, `react-router-dom` (peer) |
| [`@kozydozy/foundation`](./foundation) | **(Phase 1c)** App runtime: store base (auth/base/locale/theme slices + `FoundationState` contract), store-aware hooks (`useDarkmode`/`useAuthority`/`useResponsive`), constants/configs/types. | `theme`, `@reduxjs/toolkit`, `react-redux` (peer) |
| [`@kozydozy/routing`](./routing) | **(Phase 1d)** React Router guards (`ProtectedRoute`, `PublicRoute`, `AuthorityGuard`), decoupled to `FoundationState`. | `foundation`, `shared`, `react-redux`/`react-router-dom` (peer) |
| [`@kozydozy/layout`](./layout) | **(Phase 1d)** Reusable layout chrome (`Theme`, `ModeSwitcher`, `Notification`, `SideNavToggle`, `PageContainer`). Branded shell stays app-local. | `foundation`, `shared`, `ui`, `theme` |
| `@kozydozy/shared` **(+Phase 1d)** | Gained the foundation-coupled helpers `AuthorityCheck`, `AdaptableCard`, `DoubleSidedImage`, `Chart`. | (now also `foundation`, `react-redux` peer) |

```
@kozydozy/tokens ─▶ @kozydozy/theme ─▶ @kozydozy/ui ─▶ @kozydozy/forms
   (values)           (DefaultTheme)     (primitives)  └▶ @kozydozy/shared

@kozydozy/foundation  (store base + hooks + constants/configs)
   └▶ unblocks the deferred @kozydozy/routing + @kozydozy/layout + shared components
```

## Phase 1c — foundation (the enabler)

`@kozydozy/foundation` extracts the shared **runtime** that the routing guards,
layout chrome, and deferred shared components all couple to (Redux store slices,
hooks, constants, configs). It uses a **contract + composition** model: apps
compose `foundationReducers` into their store, and hooks are typed against
`FoundationState` (no shared store instance). See its `MIGRATION-NOTES.md` for the
adoption steps and the two resolved couplings (`theme.tokens`, `APP_NAME`). No app
is wired to it yet — that happens during each app's Phase 2.

## Phase 1b — forms + shared (audit-driven, conservative)

Only the two safe, low-coupling packages were filled. See each package's
`MIGRATION-NOTES.md` for the exact file lists, the **deferred** items, and the
**Nursery Tailwind equivalents to replace in Phase 3**.

**Deferred out of Phase 1b (documented, not moved):**
- `@kozydozy/routing` (route guards) and `@kozydozy/layout` (chrome) — gated on a
  future `@kozydozy/foundation` (shared store/auth contract + hooks + constants).
- `shared/DataTable` + `loaders/TableRow` — need brand-prop neutralization.
- `StripeCardField`, cart/checkout/ecommerce, booking, admin pages, and all
  app-specific branding (Header/Footer/Logo/UserDropdown).

**Nursery:** not migrated in 1b, and its Tailwind versions were **not** copied in.
Where a Nursery component has the same responsibility as a shared styled-components
component, Phase 3 replaces the Tailwind version with the shared one (see notes).

## How it was extracted

MK Equine and Michelle Points already shared **151 of 153** `ui/` files byte-for-byte
and an identically-shaped `SportsTheme`. Phase 1 lifts that common foundation out:

- **Scales** (`spacing`, `fontSize`, `transition`, `zIndex`) were identical → they live
  once in `tokens/scale.ts`.
- **Brand-varying values** (`colors`, `typography`, `radius`, `shadow`) became two
  presets in `tokens/presets/`, copied verbatim from each app's `theme.ts`.
- **The 6 diverged `ui/` files** were reconciled without a redesign — see
  [`ui/MIGRATION-NOTES.md`](./ui/MIGRATION-NOTES.md). Button and Spinner are now
  **tokenised**: one shared component whose brand differences are driven by
  `theme.components.*`, so each brand renders exactly as it does today.

## Validation

All five packages typecheck against a real install:

```bash
yarn install     # links the workspace (run from repo root)
yarn typecheck   # tokens ✓ theme ✓ ui ✓ forms ✓ shared ✓ foundation ✓ routing ✓ layout ✓
```

Nothing here is wired into any app yet — importing these packages is Phase 2.

## Consuming them (Phase 2 preview)

```ts
import { createTheme } from '@kozydozy/theme'
import { mkEquineTokens } from '@kozydozy/tokens'
import { Button, configureToastPortal } from '@kozydozy/ui'

const { light, dark } = createTheme(mkEquineTokens)
```
