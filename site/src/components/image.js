/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui'
import { graphql } from 'gatsby'
import GatsbyImage from 'gatsby-image'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const getOverlapProps = mode => ({
  ...(mode === `sepia`
    ? {
        overlayBgColorStart: `rgba(242,236,220, 0)`,
        overlayBgColorEnd: `rgba(242,236,220,0.95)`,
      }
    : {}),
  ...(mode === `dark`
    ? {
        overlayBgColorStart: 'rgba(0, 0, 0, 0)',
        overlayBgColorEnd: 'rgba(0, 0, 0, 0.95)',
      }
    : {}),
})

function Image({ zoom, isZoomed = false, width = '75vw', ...props }) {
  const [mode] = useColorMode()
  const Wrapper = props.fluid || props.fixed ? GatsbyImage : 'img'
  if (zoom) {
    return (
      <Zoom {...getOverlapProps(mode)}>
        <Wrapper {...props} sx={{ display: `block`, width }} />
      </Zoom>
    )
  }
  return <Wrapper sx={{ display: 'block', maxWidth: '100%' }} {...props} />
}

export const imageFragment = graphql`
  fragment LocalImageFluid on File {
    childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
`

export default Image
