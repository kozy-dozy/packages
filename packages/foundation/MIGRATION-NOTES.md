# @kozydozy/foundation — Migration Notes

## What this package is

The shared, app-agnostic **runtime** for the platform — the layer that everything
store-coupled depends on. Phase 1b deferred routing, layout, and several shared
components precisely because they couple to this; foundation extracts it so they
can move.

Everything here was **byte-identical** across MK Equine, Michelle Points, and
Varsity Spotlight (verified) except the two items called out under "Resolved
couplings". Canonical source: michelle-points (unmigrated, clean).

## Contents

| Area | Files | Notes |
|---|---|---|
| **State** | `state/auth` (user+session), `state/base`, `state/locale`, `state/theme` | The shared store slices. Actions + state types exported; default reducers via `foundationReducers`. |
| **Contract** | `state/contract.ts` | `FoundationState = { auth, base, locale, theme }`. An app's `RootState` is `FoundationState & <app slices>`. |
| **Reducers** | `state/reducers.ts` | `foundationReducers` — spread into an app's `rootReducer`. |
| **Hooks** | `useAuthority`, `useResponsive`, `useDarkmode`, `useThemeClass` | `useAuthority`/`useResponsive` are pure; `useDarkmode` is store-aware (see below); `useThemeClass` reads `@kozydozy/theme`. |
| **HOC** | `withHeaderItem` | Header-item wrapper. |
| **Constants** | `theme.constant`, `roles.constant`, `app.constant`, `chart.constant` | |
| **Config** | `app.config`, `theme.config`, `chart.config` | |
| **Types** | `types/theme.ts` | `Mode`, `Direction`, `NavMode`, `LayoutType`, `ColorLevel`, … |
| **Utils** | `acronym`, `isLastChild` | Pure formatting helpers used by layout `Notification`. |

## Key design: contract + composition (not a shared store instance)

Foundation does **not** own an app's store. Instead:
- It ships the **slices** + a **`FoundationState` contract**.
- Store-aware hooks use react-redux's `useSelector`/`useDispatch` typed against
  `FoundationState` — so they work in any app whose store includes these slices.
- Apps compose their store: `{ ...foundationReducers, ...appDomainReducers }`.

### `useDarkmode` decoupling
Previously imported `setMode`, `useAppSelector`, `useAppDispatch` from the app's
`@/store`. Now it dispatches the **foundation** `theme` slice's `setMode` and
selects via `useSelector((s: FoundationState) => s.theme.mode)`. No app-store import.

## Resolved couplings

1. **`theme.config` → `@/config/theme.tokens`** (brand). `theme.config` only used
   three brand values (`primaryColor`, `primaryColorLevel`, `defaultMode`), and
   those feed the **legacy ConfigProvider colour-level system** — not the
   styled-components colours (those come from `@kozydozy/theme`). Replaced with
   brand-neutral defaults + a `createThemeConfig(overrides)` factory. Apps needing
   a different initial mode/hue override via that or `preloadedState`.
2. **`app.constant` → `APP_NAME`**. Only `APP_NAME` differed per app; it's excluded
   here (stays app-local / read from `company.config`). The shared
   `PERSIST_STORE_NAME` and `REDIRECT_URL_KEY` remain.

## What this unblocks

- **`@kozydozy/routing`** — `ProtectedRoute` / `PublicRoute` / `AuthorityGuard`
  (need `FoundationState` auth/session + `appConfig` + `REDIRECT_URL_KEY` + `@kozydozy/shared` Loading).
- **`@kozydozy/layout`** — `Theme`, `ModeSwitcher`, `Notification`, `SideNavToggle`,
  `PageContainer` (need `useDarkmode` / `useResponsive` / `withHeaderItem` / theme config).
- **deferred `@kozydozy/shared`** — `AuthorityCheck` (`useAuthority`), `Chart`
  (`chart.config`), `AdaptableCard` / `DoubleSidedImage` (theme mode + `theme.constant`).

## Adoption (Phase 2, per app — NOT done here)

1. Compose the store: `rootReducer` uses `{ ...foundationReducers, ...appSlices }`;
   `RootState = FoundationState & AppState`.
2. Swap imports: `@/utils/hooks/useDarkmode` → `@kozydozy/foundation`, etc.
3. Delete the now-duplicated local slices/hooks/constants/configs.
4. Verify the app's initial theme **mode** matches its old `theme.tokens.defaultMode`
   (override `createThemeConfig`/`preloadedState` if it wasn't `light`).

No app is wired yet — this phase only creates the package.

## Validated

`yarn typecheck` passes (React 19, Redux Toolkit 2, react-redux 9, styled-components 6).
Adds `apexcharts` as a dependency (used by `chart.config`).
