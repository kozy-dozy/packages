import { useTheme } from 'styled-components'
import styled, { keyframes } from 'styled-components'

/**
 * Spinner — brand-neutral, theme-driven.
 *
 * Colour, size and rotation duration come from `theme.components.spinner`
 * (filled by `createTheme` from a brand's `SpinnerTokens`). The rotating *icon*
 * is a brand asset (a React component), not a token, so it is passed via the
 * `icon` prop; with no icon a neutral ring is shown.
 *
 * MK Equine adopts this directly (`icon={<GiHorseshoe />}`). Michelle Points'
 * animated multi-sport icon-cycler is app-specific behaviour — see
 * MIGRATION-NOTES.md for how that is handled at adoption time.
 *
 * An app can also register a default icon once at bootstrap via
 * `configureSpinnerIcon(<GiHorseshoe />)` so that every Spinner (including those
 * rendered inside `@kozydozy/shared`'s Loading/PageTransition) shows the brand
 * mark without threading an `icon` prop through every call site. Resolution
 * order per render: explicit `icon` prop → configured default → neutral ring.
 */
let defaultSpinnerIcon: React.ReactNode = null

/** Register a brand default spinner icon (call once at app bootstrap). */
export function configureSpinnerIcon(icon: React.ReactNode): void {
    defaultSpinnerIcon = icon
}

const rotate = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`

const IconWrap = styled.div<{ $color: string; $size: number; $duration: string }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: ${({ $color }) => $color};
    font-size: ${({ $size }) => $size}px;
    animation: ${rotate} ${({ $duration }) => $duration} linear infinite;
    flex-shrink: 0;
`

const Ring = styled.span<{ $color: string; $size: number; $duration: string }>`
    display: inline-block;
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    color: ${({ $color }) => $color};
    animation: ${rotate} ${({ $duration }) => $duration} linear infinite;
    flex-shrink: 0;
`

export interface SpinnerProps {
    size?: number | string
    color?: string
    /** Brand icon to rotate. If omitted, a neutral ring spinner is rendered. */
    icon?: React.ReactNode
    /** Rotation duration override (e.g. '0.9s'). Defaults to the theme token. */
    duration?: string
    className?: string
    style?: React.CSSProperties
}

export function Spinner({
    size,
    color,
    icon,
    duration,
    className,
    style,
}: SpinnerProps) {
    const { components } = useTheme()
    const { spinner } = components

    const px =
        size == null
            ? spinner.size
            : typeof size === 'number'
              ? size
              : parseInt(size, 10) || spinner.size
    const resolvedColor = color ?? spinner.color
    const resolvedDuration = duration ?? spinner.duration
    const resolvedIcon = icon ?? defaultSpinnerIcon

    if (resolvedIcon) {
        return (
            <IconWrap
                $color={resolvedColor}
                $size={px}
                $duration={resolvedDuration}
                className={className}
                style={style}
            >
                {resolvedIcon}
            </IconWrap>
        )
    }

    return (
        <Ring
            $color={resolvedColor}
            $size={px}
            $duration={resolvedDuration}
            className={className}
            style={style}
        />
    )
}

Spinner.displayName = 'Spinner'

export default Spinner
