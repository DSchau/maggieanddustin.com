/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'
import Timeline from '../components/timeline'
import Masonry from '../components/masonry'
import Section from '../components/section'
import SEO from '../components/seo'

import partials from '../components/partials'

const flatten = arr => arr.reduce((merged, item) => merged.concat(item), [])

function Page({ data }) {
  const page = data.page.contentBlocks.reduce((merged, block) => {
    if (block.body && block.title) {
      merged.sections = (merged.sections || []).concat(block)
      return merged
    }
    Object.keys(block).forEach(key => {
      if (!merged[key]) {
        merged[key] = []
      }
      merged[key].push(block[key])
    })
    return merged
  }, {})
  const Partial = partials[data.page.slug]
  return (
    <Layout>
      <SEO
        description="The wedding website for Maggie Alcorn and Dustin Schau. Save the date for August 8th, 2020 in Minneapolis, MN."
        title="Wedding | August 8, 2020"
      />
      {page.hero && <Image fluid={page.hero[0].fluid} />}
      {Partial && <Partial />}
      {page.moments &&
        page.moments.map(moment => (
          <Timeline key={moment.id} moments={moment} />
        ))}
      {page.sections &&
        page.sections.map(section => <Section key={section.id} {...section} />)}
      {page.photos && (
        <Masonry sx={{ pt: 4 }}>
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
      slug
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
            fluid(maxWidth: 600) {
              ...GatsbyContentfulFluid
            }
          }
        }

        ... on ContentfulSection {
          id
          ...SectionDetails
        }

        # ... on ContentfulTimeline {
        #   moments {
        #     id
        #     ...MomentDetails
        #   }
        # }
      }
    }
  }
`

export default Page
