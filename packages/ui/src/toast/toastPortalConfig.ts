import type { ReactNode } from 'react'

/**
 * The toast system renders into a *detached* React root (outside the app tree),
 * so any context the toast content needs — the Redux store, the
 * styled-components ThemeProvider, i18n — has to be re-established at that root.
 *
 * The extracted primitive previously hard-imported the app's `@/store` and its
 * concrete light/dark themes to do this. That app coupling is replaced by this
 * injectable wrapper so `@kozydozy/ui` stays application-agnostic.
 *
 * Phase 2 — each app calls `configureToastPortal` once at bootstrap, e.g.
 *
 *   import { configureToastPortal } from '@kozydozy/ui'
 *   import { Provider } from 'react-redux'
 *   import { ThemeProvider } from 'styled-components'
 *
 *   configureToastPortal((node) => (
 *       <Provider store={store}>
 *           <ThemeProvider theme={store.getState().theme?.mode === 'dark' ? dark : light}>
 *               {node}
 *           </ThemeProvider>
 *       </Provider>
 *   ))
 *
 * Until configured, an identity wrapper is used, so toasts still render (just
 * without app context) — matching a fresh install's behaviour.
 */
export type ToastPortalWrap = (node: ReactNode) => ReactNode

let portalWrap: ToastPortalWrap = (node) => node

export function configureToastPortal(wrap: ToastPortalWrap): void {
    portalWrap = wrap
}

export function getToastPortalWrap(): ToastPortalWrap {
    return portalWrap
}
