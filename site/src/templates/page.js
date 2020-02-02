/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'

import Gallery from '../components/gallery'
import Timeline from '../components/timeline'
import Section from '../components/section'
import WeddingParty from '../components/wedding-party'
import SEO from '../components/seo'

import partials from '../components/partials'

function Page({ data }) {
  const page = data.page.contentBlocks.reduce((merged, block) => {
    switch (block.__typename) {
      case 'ContentfulTimeline':
        merged.timeline = (merged.timeline || []).concat(block)
        break
      case 'ContentfulGallery':
        merged.gallery = (merged.gallery || []).concat(block)
        break
      case 'ContentfulSection':
        merged.section = (merged.section || []).concat(block)
        break
      case 'ContentfulHero':
        merged.hero = (merged.hero || []).concat(block)
        break
      case 'ContentfulWeddingParty':
        merged.party = (merged.party || []).concat(block)
        break
      default:
        break
    }
    return merged
  }, {})
  const Partial = partials(data.page.slug)
  return (
    <>
      <SEO description={data.page.description} title={data.page.title} />
      {page.hero &&
        page.hero.map(img => (
          <Image key={img.hero.id} {...img.hero.localFile.childImageSharp} />
        ))}
      {Partial && <Partial />}
      {page.timeline &&
        page.timeline.map(timeline => (
          <Timeline key={timeline.id} {...timeline} />
        ))}
      {page.section &&
        page.section.map(section => <Section key={section.id} {...section} />)}
      {page.party &&
        page.party.map(party => <WeddingParty key={party.id} {...party} />)}
      {page.gallery &&
        page.gallery.map(gallery => <Gallery key={gallery.id} {...gallery} />)}
    </>
  )
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    page: contentfulPage(fields: { slug: { eq: $slug } }) {
      id
      slug
      description
      title
      contentBlocks {
        ... on ContentfulGallery {
          __typename
          id
          ...GalleryDetails
        }
        ... on ContentfulHero {
          __typename
          hero: image {
            id
            localFile {
              childImageSharp {
                fluid(maxWidth: 1200, quality: 85) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }

        ... on ContentfulSection {
          id
          __typename
          ...SectionDetails
        }

        ... on ContentfulTimeline {
          __typename
          moments {
            id
            ...MomentDetails
          }
        }

        ... on ContentfulWeddingParty {
          __typename
          id
          bridesParty {
            ...PersonDetails
          }
          groomsParty {
            ...PersonDetails
          }
        }
      }
    }
  }
`

export default Page
