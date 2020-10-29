/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'

import Page from '../../components/page'
import Trip from '../../components/trip'

export default ({ data }) => {
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
