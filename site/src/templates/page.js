/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Timeline from '../components/timeline'

function Page({ data }) {
  const page = data.page.contentBlocks.reduce((merged, block) => {
    Object.keys(block).forEach(key => {
      if (!merged[key]) {
        merged[key] = []
      }
      merged[key].push(block[key])
    })
    return merged
  }, {})
  return (
    <Layout>
      {page.moments &&
        page.moments.map(moment => (
          <Timeline key={moment.id} moments={moment} />
        ))}
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    page: contentfulPage(fields: { slug: { eq: $slug } }) {
      id
      contentBlocks {
        ... on ContentfulGallery {
          photos {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
        ... on ContentfulHero {
          image {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
        ... on ContentfulTimeline {
          moments {
            id
            ...MomentDetails
          }
        }
      }
    }
  }
`

export default Page
