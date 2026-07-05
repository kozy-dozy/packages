import auth from './auth'
import base from './base'
import locale from './locale/localeSlice'
import theme from './theme/themeSlice'

/**
 * The shared foundation reducers. Spread these into an app's `rootReducer`
 * alongside its domain/admin slices:
 *
 *   const staticReducers = { ...foundationReducers, featureFlags, member, ... }
 */
export const foundationReducers = {
    auth,
    base,
    locale,
    theme,
}
