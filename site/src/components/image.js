/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui'
import GatsbyImage from 'gatsby-image'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

// TODO: swap with pose
function Image({ zoom, ...props }) {
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
        <Wrapper {...props} sx={{ display: 'block', width: '100vw' }} />
      </Zoom>
    )
  }
  return <Wrapper sx={{ display: 'block', maxWidth: '100%' }} {...props} />
}

export default Image
