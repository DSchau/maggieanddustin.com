/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'

import Countdown from '../components/countdown'
import Page from '../components/page'
import Seperator from '../components/seperator'

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
          <Seperator />
          <Countdown sx={{ pt: 4, pb: 4 }} endTime={endTime} />
          <Styled.h3 sx={{ textAlign: `center`, pt: [0, 2] }}>
            until the trip!
          </Styled.h3>
          <Seperator />
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
