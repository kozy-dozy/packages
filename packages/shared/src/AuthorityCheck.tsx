import { useAuthority } from '@kozydozy/foundation'

import type { CommonProps } from '@kozydozy/ui'

interface AuthorityCheckProps extends CommonProps {
    userAuthority: string[]
    authority: string[]
}

/** Renders children only if the user's authority intersects the allowed roles. */
const AuthorityCheck = (props: AuthorityCheckProps) => {
    const { userAuthority = [], authority = [], children } = props

    const roleMatched = useAuthority(userAuthority, authority)

    return <>{roleMatched ? children : null}</>
}

export default AuthorityCheck
