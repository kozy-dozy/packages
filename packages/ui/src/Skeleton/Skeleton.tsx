import classNames from 'classnames'
import { forwardRef } from 'react'

import type { CommonProps } from '../@types/common'
import type { ElementType } from 'react'

/**
 * Skeleton — a sized placeholder box for loading states (block or circle).
 *
 * This was the per-app "brand" component (MkEquine / MichellePoints /
 * VarsitySpotlight / Nursery) — identical everywhere except its name and CSS
 * class prefix. Those prefixes carried no styling in the styled-components apps,
 * so it is generalised here with no behavioural change.
 */
export interface SkeletonProps extends CommonProps {
    animation?: boolean
    asElement?: ElementType
    height?: string | number
    variant?: 'block' | 'circle'
    width?: string | number
}

const Skeleton = forwardRef<ElementType, SkeletonProps>((props, ref) => {
    const {
        animation = true,
        asElement: Component = 'span',
        className,
        height,
        style,
        variant = 'block',
        width,
    } = props

    return (
        <Component
            ref={ref}
            className={classNames(
                'skeleton',
                variant === 'circle' && 'skeleton-circle',
                variant === 'block' && 'skeleton-block',
                animation && 'animate-pulse',
                className,
            )}
            style={{
                width,
                height,
                ...style,
            }}
        />
    )
})

Skeleton.displayName = 'Skeleton'

export default Skeleton
