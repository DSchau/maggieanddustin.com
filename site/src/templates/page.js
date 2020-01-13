/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Timeline from '../components/timeline'

function Page({ data }) {
  const { page } = data
  const { moments } = page.contentBlocks.find(
    el => typeof el.moments !== 'undefined'
  )
  return (
    <Layout>
      <Timeline moments={moments} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    page: contentfulPage(fields: { slug: { eq: $slug } }) {
      id
      contentBlocks {
        moments {
          ...MomentDetails
        }
      }
    }
  }
`

export default Page
