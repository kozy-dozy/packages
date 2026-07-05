import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import {
    REDIRECT_URL_KEY,
    appConfig,
    type FoundationState,
} from '@kozydozy/foundation'
import { Loading } from '@kozydozy/shared'

const { authenticatedEntryPath } = appConfig

function getRedirect(search: string) {
    const params = new URLSearchParams(search)
    const raw = params.get(REDIRECT_URL_KEY)
    if (!raw) return null

    const decoded = decodeURIComponent(raw)
    if (!decoded.startsWith('/')) return null // safety
    return decoded
}

/** For sign-in/up pages: redirects already-authenticated users away (to their redirect or the entry path). */
export default function PublicRoute({
    children,
}: {
    children: React.ReactNode
}) {
    const location = useLocation()
    const { token, signedIn, initialized } = useSelector(
        (s: FoundationState) => s.auth.session,
    )

    if (!initialized) return <Loading loading />

    const isAuthenticated = !!token && !!signedIn
    if (!isAuthenticated) return <>{children}</>

    // If authenticated, honour a redirect parameter if present
    const redirect = getRedirect(location.search)
    if (redirect) return <Navigate replace to={redirect} />

    // Otherwise redirect to the authenticated entry path
    return <Navigate replace to={authenticatedEntryPath} />
}
