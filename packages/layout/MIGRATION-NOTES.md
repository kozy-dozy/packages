# @kozydozy/layout — Migration Notes

## What this package is

The reusable layout **chrome** (not the branded shell), built on foundation + ui + shared.

## Contents

`Theme`, `ModeSwitcher`, `Notification`, `SideNavToggle`, `PageContainer` (+ the
`Meta` route-metadata type). **Stays app-local by design:** Header, Footer, Logo,
HeaderLogo, UserDropdown, SideNav (app content / app view coupling).

## Decoupling

- **Store**: all reads (`theme`, `theme.direction`, `theme.layout.sideNavCollapse`,
  `locale`) → react-redux `useSelector((s: FoundationState) => …)`; `SideNavToggle`
  dispatches foundation's `setSideNavCollapse` via `useDispatch`.
- **Hooks/HOC/utils/config**: `useDarkmode`, `useResponsive`, `withHeaderItem`,
  `acronym`, `isLastChild`, `themeConfig`, `THEME_ENUM` from `@kozydozy/foundation`.
- **`ModeSwitcher` analytics**: the inline `trackEvent('toggle_theme', …)` became an
  optional `onToggle?: (mode) => void` prop. Apps pass their analytics call — the
  shared component has no app-analytics dependency.
- **`PageContainer` footer**: previously imported the app's `Footer` directly; now
  renders an app-supplied `footerSlot?: ReactNode` when `footer` is truthy.
- **`Meta` type**: defined locally (generic template shape); the app's `Route`/`Routes`
  config types stay app-local.

## Adoption (per app)

Swap `@/components/template/{Theme,ThemeConfigurator/ModeSwitcher,Notification,SideNavToggle,PageContainer}`
imports for `@kozydozy/layout`; delete the local copies. Wire the two seams:
`<ModeSwitcher onToggle={(m) => trackEvent(...)} />` and
`<PageContainer footerSlot={<Footer/>} … />`. Requires foundation-composed store +
`react-redux` dedupe.

## Validated

`yarn typecheck` green.
