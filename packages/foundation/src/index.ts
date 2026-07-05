/**
 * @kozydozy/foundation — the shared, app-agnostic runtime for the Kozy Dozy
 * platform: the store base (auth / base / locale / theme slices + a state
 * contract), the store-aware hooks, and the constants/configs/types that the
 * routing guards, layout chrome, and deferred shared components all depend on.
 *
 * This is the layer that unblocks moving @kozydozy/routing, @kozydozy/layout,
 * and the deferred @kozydozy/shared components. Apps adopt it by composing
 * `foundationReducers` into their store; hooks are typed against
 * `FoundationState`, not any specific app store.
 */

// Store base: slices, actions, state types, contract, reducers
export * from './state'

// Hooks
export * from './hooks'

// HOC
export { default as withHeaderItem } from './hoc/withHeaderItem'

// Config
export { default as appConfig } from './config/app.config'
export type { AppConfig } from './config/app.config'
export * from './config/theme.config'
export * from './config/chart.config'

// Constants
export * from './constants/theme.constant'
export * from './constants/app.constant'
export * from './constants/roles.constant'
export * as chartConstant from './constants/chart.constant'

// Types
export * from './types/theme'

// Utils
export { default as acronym } from './utils/acronym'
export { default as isLastChild } from './utils/isLastChild'
