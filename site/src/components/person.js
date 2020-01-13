/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'
import richTextRenderer from './rich-text-renderer'

import Image from './image'

function Person({ className, name, image, bio }) {
  return (
    <Styled.div className={className} sx={{ textAlign: `center` }}>
      <Styled.h2>{name}</Styled.h2>
      {image && (
        <Image sx={{ borderRadius: `100%`, mt: 2, mb: 2 }} {...image} />
      )}
      {bio && richTextRenderer(bio.json)}
    </Styled.div>
  )
}

export const personFragment = graphql`
  fragment PersonDetails on ContentfulPerson {
    name
    bio {
      json
    }
    image {
      fixed(width: 150) {
        ...GatsbyContentfulFixed
      }
    }
  }
`

export default Person
