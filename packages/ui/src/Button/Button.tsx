import { forwardRef } from 'react'
import styled, { css } from 'styled-components'

/**
 * Button — brand-neutral, theme-driven.
 *
 * The MK Equine (square / uppercase / flat) and Michelle Points (pill /
 * mixed-case / elevated) buttons were byte-different before extraction. Rather
 * than pick a winner (a redesign), the brand-varying bits are read from
 * `theme.components.button`, which `createTheme` fills from each brand's
 * `ButtonTokens`. Point a brand's tokens at the shared component and it renders
 * exactly as it does today.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'solid' | 'default' | 'plain' | 'twoTone'
    size?: 'xs' | 'sm' | 'md' | 'lg'
    /** Corner treatment. `circle`/`round` render a pill/round (icon) button. */
    shape?: 'default' | 'round' | 'circle'
    loading?: boolean
    block?: boolean
    active?: boolean
    icon?: React.ReactNode
    color?: string
}

const sizeStyles = {
    xs: css`
        font-size: ${({ theme }) => theme.fontSize.xs};
        padding: 4px 10px;
    `,
    sm: css`
        font-size: ${({ theme }) => theme.fontSize.sm};
        padding: ${({ theme }) => theme.components.button.padding.sm};
    `,
    md: css`
        font-size: ${({ theme }) => theme.fontSize.base};
        padding: ${({ theme }) => theme.components.button.padding.md};
    `,
    lg: css`
        font-size: ${({ theme }) => theme.components.button.fontSizeLg};
        padding: ${({ theme }) => theme.components.button.padding.lg};
    `,
}

const StyledButton = styled.button<{
    $variant: string
    $size: string
    $shape: string
    $block: boolean
    $loading: boolean
}>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme, $shape }) =>
        $shape === 'circle' || $shape === 'round'
            ? '9999px'
            : theme.components.button.radius};
    font-weight: 600;
    line-height: ${({ theme }) => theme.components.button.lineHeight};
    text-transform: ${({ theme }) => theme.components.button.textTransform};
    letter-spacing: ${({ theme }) => theme.components.button.letterSpacing};
    cursor: pointer;
    transition:
        background ${({ theme }) => theme.transition.fast},
        border-color ${({ theme }) => theme.transition.fast},
        color ${({ theme }) => theme.transition.fast},
        box-shadow ${({ theme }) => theme.transition.base},
        transform ${({ theme }) => theme.transition.fast},
        opacity ${({ theme }) => theme.transition.fast};
    white-space: nowrap;
    width: ${({ $block }) => ($block ? '100%' : 'auto')};
    opacity: ${({ $loading }) => ($loading ? 0.7 : 1)};

    ${({ $size }) =>
        sizeStyles[$size as keyof typeof sizeStyles] ?? sizeStyles.md}

    /* solid */
    ${({ $variant, theme }) =>
        $variant === 'solid' &&
        css`
            background: ${theme.colors.primary};
            color: ${theme.colors.text.inverse};
            border: 1px solid transparent;
            box-shadow: ${theme.components.button.solid.shadow};
            &:hover:not(:disabled) {
                background: ${theme.colors.primaryHover};
                box-shadow: ${theme.components.button.solid.hoverShadow};
                transform: ${theme.components.button.solid.hoverTransform};
            }
            &:active:not(:disabled) {
                transform: ${theme.components.button.solid.activeTransform};
                opacity: ${theme.components.button.solid.activeOpacity};
            }
        `}

    /* default */
    ${({ $variant, theme }) =>
        $variant === 'default' &&
        css`
            background: ${theme.colors.bg.card};
            color: ${theme.colors.text.primary};
            border: 1px solid ${theme.colors.border.default};
            &:hover:not(:disabled) {
                border-color: ${theme.colors.primary};
                color: ${theme.colors.primary};
            }
        `}

    /* plain */
    ${({ $variant, theme }) =>
        $variant === 'plain' &&
        css`
            background: transparent;
            color: ${theme.colors.text.secondary};
            border: 1px solid transparent;
            &:hover:not(:disabled) {
                color: ${theme.colors.primary};
            }
        `}

    /* twoTone */
    ${({ $variant, theme }) =>
        $variant === 'twoTone' &&
        css`
            background: ${theme.colors.primaryLight};
            color: ${theme.colors.primary};
            border: 1px solid transparent;
            &:hover:not(:disabled) {
                background: ${theme.colors.primary};
                color: ${theme.colors.text.inverse};
            }
        `}

    &:disabled {
        opacity: 0.45;
        cursor: not-allowed;
    }
`

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'default',
            size = 'md',
            shape = 'default',
            loading = false,
            block = false,
            disabled,
            children,
            icon,
            ...rest
        },
        ref,
    ) => {
        return (
            <StyledButton
                ref={ref}
                $variant={variant}
                $size={size}
                $shape={shape}
                $block={block}
                $loading={loading}
                disabled={disabled || loading}
                {...rest}
            >
                {icon && <span>{icon}</span>}
                {children}
            </StyledButton>
        )
    },
)

Button.displayName = 'Button'

export default Button
