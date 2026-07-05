import { PropsWithChildren } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import { useAuthority, type FoundationState } from '@kozydozy/foundation'
import { Loading } from '@kozydozy/shared'

type AuthorityGuardProps = PropsWithChildren<{
    userAuthority?: string[]
    authority?: string[]
}>

/** Role-based guard: renders children/Outlet only if the user's authority intersects the allowed roles. */
const AuthorityGuard = (props: AuthorityGuardProps) => {
    const { userAuthority = [], authority = [], children } = props
    const { initialized } = useSelector(
        (state: FoundationState) => state.auth.session,
    )

    // hook must be called unconditionally
    const roleMatched = useAuthority(userAuthority, authority)

    if (!initialized) {
        return <Loading loading={true} />
    }

    if (!roleMatched) {
        return <Navigate replace to="/" />
    }

    // If children are provided, render them. Otherwise render Outlet for nested routes
    return <>{children || <Outlet />}</>
}

export default AuthorityGuard
