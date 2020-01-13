/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui'
import GatsbyImage from 'gatsby-image'
import ImageWithZoom from 'react-medium-image-zoom'

// TODO: swap with pose
function Image({ fluid, fixed, src, zoom, ...rest }) {
  const [mode] = useColorMode()
  const Wrapper = fluid || fixed ? GatsbyImage : 'img'
  const overlay = {
    overlayBgColorStart:
      mode === `light` ? `rgba(255, 255, 255, 0)` : `rgba(0, 0, 0, 0)`,
    overlayBgColorEnd:
      mode === `light` ? `rgba(255, 255, 255, 0.95)` : `rgba(0, 0, 0, 0.95)`,
  }
  if (zoom) {
    return (
      <ImageWithZoom
        image={{
          className: rest.className,
          alt: rest.alt,
          src: fluid ? fluid.src : src,
          style: { maxWidth: '100%' },
        }}
        zoomImage={{
          alt: rest.alt,
          src: fluid ? fluid.src : src,
        }}
        defaultStyles={{
          overlay: {
            backgroundColor:
              mode === `light`
                ? `rgba(255, 255, 255, 0.95)`
                : `rgba(0, 0, 0, 0.95)`,
          },
        }}
      />
    )
  }
  return (
    <Wrapper
      fluid={fluid}
      fixed={fixed}
      src={src}
      sx={{ display: 'block', maxWidth: '100%' }}
      {...rest}
    />
  )
}

export default Image
