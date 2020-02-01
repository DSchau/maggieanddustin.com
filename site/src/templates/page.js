/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'
import Timeline from '../components/timeline'
import Masonry from '../components/masonry'
import SEO from '../components/seo'

const flatten = arr => arr.reduce((merged, item) => merged.concat(item), [])

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
      <SEO
        description="The wedding website for Maggie Alcorn and Dustin Schau. Save the date for August 8th, 2020 in Minneapolis, MN."
        title="Wedding | August 8, 2020"
      />
      {page.hero && <Image fluid={page.hero[0].fluid} />}
      {page.moments &&
        page.moments.map(moment => (
          <Timeline key={moment.id} moments={moment} />
        ))}
      {page.photos && (
        <Masonry>
          {flatten(page.photos).map(photo => (
            <Image key={photo.fluid.src} fluid={photo.fluid} />
          ))}
        </Masonry>
      )}
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
          hero: image {
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
