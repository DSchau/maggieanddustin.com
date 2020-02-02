/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui'
import { useCallback, useState } from 'react'
import GatsbyImage from 'gatsby-image'

import Zoom from 'react-medium-image-zoom'

import 'react-medium-image-zoom/dist/styles.css'

function Image({ zoom, isZoomed = false, width = '75vw', ...props }) {
  const [mode] = useColorMode()
  const Wrapper = props.fluid || props.fixed ? GatsbyImage : 'img'
  if (zoom) {
    const darkModeProps =
      mode === 'dark'
        ? {
            overlayBgColorStart: 'rgba(0, 0, 0, 0)',
            overlayBgColorEnd: 'rgba(0, 0, 0, 0.95)',
          }
        : {}
    return (
      <Zoom {...darkModeProps}>
        <Wrapper {...props} sx={{ display: `block`, width }} />
      </Zoom>
    )
  }
  return <Wrapper sx={{ display: 'block', maxWidth: '100%' }} {...props} />
}

export default Image
