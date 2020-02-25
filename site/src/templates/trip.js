/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'

import Countdown from '../components/countdown'
import Page from '../components/page'

export default ({ data }) => {
  const endTime = new Date(data.trip.startDate).getTime()
  const inFuture = Date.now() < endTime
  return (
    <Page {...data.trip}>
      <Styled.h1 sx={{ textAlign: 'center', pt: 2, pb: 2 }}>
        {data.trip.title}
      </Styled.h1>
      {inFuture && (
        <Styled.div sx={{ pt: 4, pb: 4 }}>
          <Countdown sx={{ pt: 4, pb: 4 }} endTime={endTime} />
          <Styled.h3 sx={{ textAlign: `center`, pt: [0, 2] }}>
            until the trip!
          </Styled.h3>
        </Styled.div>
      )}
    </Page>
  )
}

export const pageQuery = graphql`
  query TripBySlug($slug: String!) {
    trip: contentfulTrip(fields: { slug: { eq: $slug } }) {
      id
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
  }
`
