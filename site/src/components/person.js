/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'
import richTextRenderer from './rich-text-renderer'
import { getImage } from 'gatsby-plugin-image'

import Image from './image'

function Person({ className, name, image, role, parent, bio }) {
  return (
    <Styled.div className={className} sx={{ textAlign: `center` }}>
      <Styled.h2>{name}</Styled.h2>
      <Styled.h3>{role}</Styled.h3>
      {image && image.localFile && image.localFile.childImageSharp && (
        <Image
          alt={`${name} - ${role}`}
          sx={{ borderRadius: `100%`, mt: 2, mb: 2, ml: `auto`, mr: `auto` }}
          image={getImage(image.localFile)}
        />
      )}
      {!parent && (bio && richTextRenderer(bio.json))}
    </Styled.div>
  )
}

export const personFragment = graphql`
  fragment PersonDetails on ContentfulPerson {
    name
    role
    bio {
      json: raw
    }
    image {
      localFile {
        childImageSharp {
          gatsbyImageData(
            layout: FIXED
            width: 150
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  }
`

export default Person
