import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import {
    withHeaderItem,
    useResponsive,
    setSideNavCollapse,
    type FoundationState,
} from '@kozydozy/foundation'
import { NavToggle } from '@kozydozy/shared'

import type { CommonProps } from '@kozydozy/ui'

const ToggleDiv = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: inherit;
`

const StyledNavToggle = styled(NavToggle)`
    font-size: ${({ theme }) => theme.fontSize['2xl']};
`

const _SideNavToggle = ({ className }: CommonProps) => {
    const sideNavCollapse = useSelector(
        (state: FoundationState) => state.theme.layout.sideNavCollapse,
    )
    const dispatch = useDispatch()

    const { larger } = useResponsive()

    const onCollapse = () => {
        dispatch(setSideNavCollapse(!sideNavCollapse))
    }

    return (
        <>
            {larger.md && (
                <ToggleDiv
                    type="button"
                    aria-label="Toggle sidebar navigation"
                    aria-expanded={!sideNavCollapse}
                    className={className}
                    onClick={onCollapse}
                >
                    <StyledNavToggle toggled={sideNavCollapse} />
                </ToggleDiv>
            )}
        </>
    )
}

const SideNavToggle = withHeaderItem(_SideNavToggle)

export default SideNavToggle
