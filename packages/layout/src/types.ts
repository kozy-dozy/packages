import type { LayoutType } from '@kozydozy/foundation'
import type { LazyExoticComponent, ReactNode, JSX } from 'react'

/**
 * Route/page metadata consumed by `PageContainer`. Generic template shape (the
 * app's `Route`/`Routes` config types stay app-local).
 */
export interface Meta {
    pageContainerType?: 'default' | 'gutterless' | 'contained'
    header?: string | ReactNode
    headerContainer?: boolean
    extraHeader?: LazyExoticComponent<() => JSX.Element>
    footer?: boolean
    layout?: LayoutType
}
