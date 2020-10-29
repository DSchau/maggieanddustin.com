/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'

import Image from './image'
import Masonry from './masonry'
import richTextRenderer from './rich-text-renderer'

const flatten = arr => arr.reduce((merged, item) => merged.concat(item), [])

function Gallery({ description, title, fields, photos = []}) {
  return (
    <Styled.div sx={{ pt: 4 }}>
      <Styled.h2
        sx={{ textAlign: 'center' }}
        {...(fields && fields.slug ? { slug: fields.slug } : {})}
      >
        {title}
      </Styled.h2>
      <Masonry
        sx={{
          'img, picture img': {
            objectPosition: 'center 25% !important',
          },
        }}
      >
        {flatten(photos)
          .filter(photo => photo.localFile && photo.localFile.childImageSharp)
          .map(photo => (
            <Image
              alt={/^IMG/.test(photo.title) ? photo.description : photo.title}
              key={photo.localFile.id}
              fluid={photo.localFile.childImageSharp.fluid}
            />
          ))}
      </Masonry>
      <Styled.div sx={{ fontSize: 14, pt: 2, pb: 2, textAlign: `center` }}>
        {description && richTextRenderer(description.json)}
      </Styled.div>
    </Styled.div>
  )
}

export const galleryFragment = graphql`
  fragment GalleryDetails on ContentfulGallery {
    title
    fields {
      slug
    }
    description {
      json
    }
    photos {
      title
      description
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
