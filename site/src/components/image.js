/** @jsx jsx */
import { jsx } from 'theme-ui'
import GatsbyImage from 'gatsby-image'

function Image({ fluid, fixed, src, ...rest }) {
  const Wrapper = fluid || fixed ? GatsbyImage : 'img'
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
