import { useSelector } from 'react-redux'

import {
    themeConfig,
    useDarkmode,
    type FoundationState,
} from '@kozydozy/foundation'
import { ConfigProvider } from '@kozydozy/ui'

import type { CommonProps } from '@kozydozy/ui'

/** Bridges the foundation theme/locale state into the UI ConfigProvider. */
export default function Theme(props: CommonProps) {
    const theme = useSelector((state: FoundationState) => state.theme)
    const locale = useSelector(
        (state: FoundationState) => state.locale.currentLang,
    )
    useDarkmode()

    const currentTheme = {
        ...themeConfig,
        ...theme,
        ...{ locale },
    }

    return (
        <ConfigProvider value={currentTheme}>{props.children}</ConfigProvider>
    )
}
