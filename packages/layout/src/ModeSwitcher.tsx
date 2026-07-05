import { useCallback } from 'react'
import { HiMoon, HiSun } from 'react-icons/hi'
import styled from 'styled-components'

import { THEME_ENUM, useDarkmode, type Mode } from '@kozydozy/foundation'
import { Switcher } from '@kozydozy/ui'

const Wrap = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
`

const SunIcon = styled(HiSun)<{ $active: boolean }>`
    color: ${({ $active }) => ($active ? '#f59e0b' : 'inherit')};
    opacity: ${({ $active }) => ($active ? 1 : 0.4)};
    font-size: ${({ theme }) => theme.fontSize.lg};
`

const MoonIcon = styled(HiMoon)<{ $active: boolean }>`
    color: ${({ $active }) => ($active ? '#818cf8' : 'inherit')};
    opacity: ${({ $active }) => ($active ? 1 : 0.4)};
    font-size: ${({ theme }) => theme.fontSize.lg};
`

export interface ModeSwitcherProps {
    /**
     * Optional callback fired with the next mode when the user toggles. Apps
     * use this for analytics (e.g. the previous inline `trackEvent`), keeping
     * the shared component free of any app-specific analytics dependency.
     */
    onToggle?: (mode: Mode) => void
}

/** Light/dark toggle bound to the foundation theme mode. */
export default function ModeSwitcher({ onToggle }: ModeSwitcherProps = {}) {
    const [isDark, setMode] = useDarkmode()
    const { MODE_DARK, MODE_LIGHT } = THEME_ENUM

    const onChange = useCallback(
        (checked: boolean) => {
            const nextMode: Mode = checked ? MODE_DARK : MODE_LIGHT
            onToggle?.(nextMode)
            setMode(nextMode)
        },
        [setMode, onToggle, MODE_DARK, MODE_LIGHT],
    )

    return (
        <Wrap>
            <SunIcon $active={!isDark} />
            <Switcher checked={isDark} onChange={onChange} />
            <MoonIcon $active={isDark} />
        </Wrap>
    )
}
