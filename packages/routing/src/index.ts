/**
 * @kozydozy/routing — shared React Router guards, decoupled from any app store.
 * They read auth/session via react-redux `useSelector` typed against
 * `FoundationState`, so they work in any app that composes `foundationReducers`.
 * `CartRoute` (ecom) stays app-local.
 */
export { default as ProtectedRoute } from './ProtectedRoute'
export { default as PublicRoute } from './PublicRoute'
export { default as AuthorityGuard } from './AuthorityGuard'
