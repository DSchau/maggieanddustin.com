/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'
import richTextRenderer from './rich-text-renderer'

import Image from './image'

function Person({ name, image, bio }) {
  return (
    <Styled.div sx={{ textAlign: `center` }}>
      <Styled.h2>{name}</Styled.h2>
      <Image sx={{ borderRadius: `100%` }} {...image} />
      {richTextRenderer(bio.json)}
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
