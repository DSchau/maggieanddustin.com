/** @jsx jsx */
import { jsx } from 'theme-ui'
import GatsbyImage from 'gatsby-image'
import ImageWithZoom from 'react-medium-image-zoom'

// TODO: swap with pose
function Image({ fluid, fixed, src, zoom, ...rest }) {
  const Wrapper = fluid || fixed ? GatsbyImage : 'img'
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
