import { HiOutlineMenuAlt2, HiOutlineMenu } from 'react-icons/hi'
import styled from 'styled-components'

import type { CommonProps } from '@kozydozy/ui'

export interface NavToggleProps extends CommonProps {
    toggled?: boolean
}

const ToggleWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`

const NavToggle = ({ toggled, ...rest }: NavToggleProps) => {
    return (
        <ToggleWrap {...rest}>
            {toggled ? (
                <HiOutlineMenu aria-hidden="true" />
            ) : (
                <HiOutlineMenuAlt2 aria-hidden="true" />
            )}
        </ToggleWrap>
    )
}

export default NavToggle
