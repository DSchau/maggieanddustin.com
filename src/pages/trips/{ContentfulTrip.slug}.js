/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'

import Page from '../../components/page'
import Trip from '../../components/trip'

const ContentfulTrip = ({ data }) => {
  return (
    <Page {...data.trip}>
      <Trip {...data.trip} />
    </Page>
  )
}

export const pageQuery = graphql`
  query TripBySlug($id: String!) {
    trip: contentfulTrip(id: { eq: $id }) {
      ...TripDetails
    }
  }
`

export default ContentfulTrip
