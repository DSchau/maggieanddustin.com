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
    <>
      <Styled.div
        sx={{
          borderWidth: 2,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderStyle: `solid`,
          maxWidth: ['100%', '50%'],
          padding: 3,
          mb: 2,
          mr: 'auto',
          ml: 'auto',
        }}
      >
        <Styled.h2>{title}</Styled.h2>
        <Styled.h3 sx={{ mb: 0 }}>{date}</Styled.h3>
      </Styled.div>
      {richTextRenderer(description.json)}
      {photos.map(photo => (
        <Image
          key={photo.fluid.src}
          sx={{ maxWidth: ['100%', '50%'], margin: '0 auto' }}
          zoom={true}
          {...photo}
        />
      ))}
      {children}
    </>
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
      json
    }
    title
    photos {
      fluid {
        ...GatsbyContentfulFluid
      }
    }
  }
`

export default Timeline
