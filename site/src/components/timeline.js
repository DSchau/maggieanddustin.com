/** @jsx jsx */
import React from 'react'
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'

import Image from './image'

import richTextRenderer from './rich-text-renderer'

const Rule = () => (
  <Styled.hr
    sx={{
      height: '25vh',
      width: 0,
      borderWidth: 2,
      borderStyle: `dashed`,
      borderColor: 'text',
      margin: '0 auto',
      mt: 2,
      mb: 2,
    }}
  />
)

function Moment({ children, date, description, title, photos }) {
  return (
    <React.Fragment>
      <Styled.div
        sx={{
          borderWidth: 2,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderStyle: `solid`,
          maxWidth: ['100%', '75%', '60%'],
          padding: 3,
          mb: 2,
          mr: 'auto',
          ml: 'auto',
        }}
      >
        <Styled.h2>{title}</Styled.h2>
        <Styled.h3 sx={{ mb: 2 }}>{date}</Styled.h3>
        {richTextRenderer(description.json)}
      </Styled.div>
      <Styled.div sx={{ overflowX: 'hidden' }}>
        {photos
          .filter(photo => photo?.localFile?.id)
          .map(photo => (
            <Image
              key={photo.localFile.id}
              alt={photo.title || photo.description}
              sx={{ margin: '0 auto' }}
              width={[`100vw`, `75vw`, `60vw`]}
              zoom={true}
              {...photo.localFile.childImageSharp}
            />
          ))}
      </Styled.div>
      {children}
    </React.Fragment>
  )
}

function Timeline({ moments }) {
  return (
    <Styled.div sx={{ textAlign: 'center', mt: 2, mb: 2, padding: 2 }}>
      {moments.map((moment, index) => (
        <Moment key={moment.title} {...moment}>
          {index + 1 < moments.length ? <Rule /> : null}
        </Moment>
      ))}
    </Styled.div>
  )
}

export const timelineFragment = graphql`
  fragment MomentDetails on ContentfulMoment {
    date(formatString: "MMM Do, YYYY")
    description {
      json: raw
    }
    title
    photos {
      title
      description
      localFile {
        id
        ...LocalImageFluid
      }
    }
  }
`

export default Timeline
