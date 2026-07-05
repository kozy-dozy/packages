import { useSelector } from 'react-redux'

import { THEME_ENUM, type FoundationState } from '@kozydozy/foundation'

import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react'

interface DoubleSidedImageProps
    extends DetailedHTMLProps<
        ImgHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
    > {
    darkModeSrc: string
}

const { MODE_DARK } = THEME_ENUM

/** Swaps image source based on the active theme mode. */
const DoubleSidedImage = ({
    src,
    darkModeSrc,
    alt = '',
    ...rest
}: DoubleSidedImageProps) => {
    const mode = useSelector((state: FoundationState) => state.theme.mode)

    return (
        <img src={mode === MODE_DARK ? darkModeSrc : src} alt={alt} {...rest} />
    )
}

export default DoubleSidedImage
