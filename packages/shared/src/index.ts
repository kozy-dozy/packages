/**
 * @kozydozy/shared — app-agnostic UI helper components.
 *
 * Phase 1b scope: only the Tier-A components that depend solely on
 * `@kozydozy/ui` (+ react/react-router). Components coupled to the app store,
 * hooks, config, or brand identifiers are intentionally NOT here yet — see
 * MIGRATION-NOTES.md for the deferred list and why.
 */
export { default as ActionLink } from './ActionLink'
export { default as ConfirmDialog } from './ConfirmDialog'
export { default as Container } from './Container'
export { default as GrowShrinkTag } from './GrowShrinkTag'
export { default as IconText } from './IconText'
export { default as Loading } from './Loading'
export { default as NavToggle } from './NavToggle'
export { default as PageTransition } from './PageTransition'
export { default as StickyFooter } from './StickyFooter'

// Phase 1c: foundation-coupled helpers (need @kozydozy/foundation)
export { default as AuthorityCheck } from './AuthorityCheck'
export { default as AdaptableCard } from './AdaptableCard'
export { default as DoubleSidedImage } from './DoubleSidedImage'
export { default as Chart } from './Chart'
export type { ChartProps } from './Chart'
