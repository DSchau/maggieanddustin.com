/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

import Countdown from './countdown'

const getImage = image => {
  try {
    return image.hero.localFile.childImageSharp
  } catch (e) {
    return null
  }
}

export default ({ title, path, description, contentBlocks = [], startDate, preview = false, ...props }) => {
  const image = getImage(contentBlocks.find(block => block.__typename === 'ContentfulHero'))
  const endTime = new Date(startDate).getTime()
  const inFuture = Date.now() < endTime
  const Wrapper = preview ? Link : React.Fragment
  return (
    <div>
      <Styled.h1 sx={{ textAlign: 'center', pt: 2, pb: 2 }}>
        <Wrapper sx={{ color: 'text' }} {...preview ? {
          to: path
        } : {}}>{title}</Wrapper>
      </Styled.h1>
      {preview && image && (
        <Image {...image} />
      )}
      <p>{description}</p>
      {inFuture && (
        <Styled.div sx={{ pt: 4, pb: 4 }}>
          <Countdown sx={{ pt: 4, pb: 4 }} endTime={endTime} />
          <Styled.h3 sx={{ textAlign: `center`, pt: [0, 2] }}>
            until the trip!
          </Styled.h3>
        </Styled.div>
      )}
    </div>
  )
}

export const tripFragment = graphql`
  fragment TripDetails on ContentfulTrip {
    id
      path: gatsbyPath(filePath: "/trips/{ContentfulTrip.slug}")
      slug
      description
      title
      startDate(formatString: "MM/DD/YYYY hh:mm")
      endDate(formatString: "MM/DD/YYYY hh:mm")
      featuredImage {
        localFile {
          childImageSharp {
            resize(width: 1200) {
              src
              height
              width
            }
          }
        }
      }
      contentBlocks {
        # hero image, of course!
        ... on ContentfulHero {
          __typename
          hero: image {
            id
            title
            description
            localFile {
              childImageSharp {
                fluid(maxWidth: 1200, quality: 85) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }

        # section of content
        ... on ContentfulSection {
          id
          __typename
          ...SectionDetails
        }
      }
  }
`