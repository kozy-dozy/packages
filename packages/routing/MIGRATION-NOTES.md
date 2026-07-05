# @kozydozy/routing — Migration Notes

## What this package is

The three shared React Router guards, built on `@kozydozy/foundation`.
Cross-app-identical, previously blocked on the app store + constants — now
unblocked by foundation.

## Contents

`ProtectedRoute`, `PublicRoute`, `AuthorityGuard`. `CartRoute` (ecom) stays app-local.

## Decoupling

- **Store**: `useAppSelector((s) => s.auth.session)` → react-redux
  `useSelector((s: FoundationState) => s.auth.session)`. No app-store import.
- **Constants/config**: `REDIRECT_URL_KEY` + `appConfig` from `@kozydozy/foundation`;
  `useAuthority` from foundation; `Loading` from `@kozydozy/shared`.
- **Cleanup**: removed a leftover `console.log` from `PublicRoute` (debug cruft
  that ran on every render — no functional effect).

## Adoption (per app)

Swap `@/components/route/{ProtectedRoute,PublicRoute,AuthorityGuard}` imports for
`@kozydozy/routing`; delete the local copies. Requires the app store to compose
`foundationReducers` (so `state.auth.session` exists) and a single `react-redux`
instance (dedupe).

## Validated

`yarn typecheck` green.
