/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"

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
  if (zoom) {
    return (
      <Zoom {...getOverlapProps(mode)}>
        <GatsbyImage {...props} sx={{ display: `block`, width }} />
      </Zoom>
    )
  }
  return <GatsbyImage sx={{ display: 'block', maxWidth: '100%' }} {...props} />
}

export const imageFragment = graphql`
  fragment LocalImageFluid on File {
    childImageSharp {
      gatsbyImageData(layout: FULL_WIDTH, width: 600, formats: [AUTO, WEBP, AVIF])
    }
  }
`

export default Image
