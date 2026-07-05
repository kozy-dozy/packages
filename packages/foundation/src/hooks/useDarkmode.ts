import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { THEME_ENUM } from '../constants/theme.constant'
import { setMode } from '../state/theme/themeSlice'

import type { FoundationState } from '../state/contract'
import type { Mode } from '../types/theme'
import type { Dispatch } from '@reduxjs/toolkit'

/**
 * Reads/sets theme mode. Decoupled from any specific app store: it uses
 * react-redux's `useSelector`/`useDispatch` typed against `FoundationState`
 * and dispatches the foundation `theme` slice's `setMode`. Works in any app
 * whose store composes `foundationReducers` (so `state.theme` is present).
 */
function useDarkMode(): [
    isEnabled: boolean,
    onModeChange: (mode: Mode) => void,
] {
    const mode = useSelector((state: FoundationState) => state.theme.mode)
    const { MODE_DARK, MODE_LIGHT } = THEME_ENUM

    const isEnabled = mode === MODE_DARK

    const dispatch = useDispatch<Dispatch>()
    const onModeChange = (mode: Mode) => {
        dispatch(setMode(mode))
    }

    useEffect(() => {
        if (window === undefined) {
            return
        }
        const root = window.document.documentElement
        root.classList.remove(isEnabled ? MODE_LIGHT : MODE_DARK)
        root.classList.add(isEnabled ? MODE_DARK : MODE_LIGHT)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEnabled])

    return [isEnabled, onModeChange]
}

export default useDarkMode
