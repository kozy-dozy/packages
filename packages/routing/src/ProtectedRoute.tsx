import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

import { REDIRECT_URL_KEY, type FoundationState } from '@kozydozy/foundation'
import { Loading } from '@kozydozy/shared'

/** Requires an authenticated session; otherwise redirects to sign-in with a return URL. */
export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode
}) {
    const location = useLocation()
    const { token, signedIn, initialized } = useSelector(
        (s: FoundationState) => s.auth.session,
    )

    if (!initialized) return <Loading loading />

    const authenticated = !!token && !!signedIn

    if (!authenticated) {
        const redirect = encodeURIComponent(location.pathname + location.search)
        return (
            <Navigate replace to={`/sign-in?${REDIRECT_URL_KEY}=${redirect}`} />
        )
    }

    return <>{children}</>
}
