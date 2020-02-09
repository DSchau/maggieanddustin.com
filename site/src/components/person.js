/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'
import richTextRenderer from './rich-text-renderer'

import Image from './image'

function Person({ className, name, image, role, parent, bio }) {
  return (
    <Styled.div className={className} sx={{ textAlign: `center` }}>
      <Styled.h2>{name}</Styled.h2>
      <Styled.h3>{role}</Styled.h3>
      {image && (
        <Image
          sx={{ borderRadius: `100%`, mt: 2, mb: 2 }}
          {...image.localFile.childImageSharp}
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
      json
    }
    image {
      localFile {
        childImageSharp {
          fixed(width: 150) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`

export default Person
