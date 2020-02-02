/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'
import { graphql } from 'gatsby'

import Image from './image'
import Masonry from './masonry'

const flatten = arr => arr.reduce((merged, item) => merged.concat(item), [])

function Gallery({ title, photos }) {
  return (
    <Styled.div sx={{ pt: 4 }}>
      <Styled.h2 sx={{ textAlign: 'center' }}>{title}</Styled.h2>
      <Masonry>
        {flatten(photos).map(photo => (
          <Image
            key={photo.localFile.id}
            fluid={photo.localFile.childImageSharp.fluid}
          />
        ))}
      </Masonry>
    </Styled.div>
  )
}

export const galleryFragment = graphql`
  fragment GalleryDetails on ContentfulGallery {
    title
    photos {
      localFile {
        id
        childImageSharp {
          fluid(maxWidth: 320, cropFocus: NORTH) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`

export default Gallery
