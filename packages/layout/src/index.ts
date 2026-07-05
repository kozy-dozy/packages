/**
 * @kozydozy/layout — shared, reusable layout chrome, built on @kozydozy/foundation.
 *
 * Decoupled from the app: store reads use react-redux `useSelector` typed
 * against `FoundationState`; `ModeSwitcher` takes an optional `onToggle` for
 * analytics; `PageContainer` renders an app-supplied `footerSlot`.
 *
 * The BRANDED shell — Header, Footer, Logo, HeaderLogo, UserDropdown, SideNav —
 * stays app-local by design (app content / app views).
 */
export { default as Theme } from './Theme'
export { default as ModeSwitcher } from './ModeSwitcher'
export type { ModeSwitcherProps } from './ModeSwitcher'
export { default as Notification } from './Notification'
export { default as SideNavToggle } from './SideNavToggle'
export { default as PageContainer } from './PageContainer'
export type { PageContainerProps } from './PageContainer'
export type { Meta } from './types'
