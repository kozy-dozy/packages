import type { AuthState } from './auth'
import type { BaseState } from './base'
import type { LocaleState } from './locale/localeSlice'
import type { ThemeState } from './theme/themeSlice'

/**
 * The slice shape every Kozy Dozy app store must include. An app's `RootState`
 * is `FoundationState & <app-specific slices>`. Foundation hooks/selectors are
 * typed against this so they work in any app that composes `foundationReducers`.
 */
export interface FoundationState {
    auth: AuthState
    base: BaseState
    locale: LocaleState
    theme: ThemeState
}
