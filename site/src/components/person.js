/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Image from './image'

function Person({ name, image, bio }) {
  return (
    <div>
      <h2>{name}</h2>
      <Image {...image} />
      {documentToReactComponents(bio.json)}
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
