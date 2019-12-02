/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'
import richTextRenderer from './rich-text-renderer'

import Image from './image'

function Person({ name, image, bio }) {
  return (
    <div>
      <Styled.h2>{name}</Styled.h2>
      <Image {...image} />
      {richTextRenderer(bio.json)}
    </div>
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
