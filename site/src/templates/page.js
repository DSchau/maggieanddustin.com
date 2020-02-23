/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import { SkipNavContent } from '@reach/skip-nav'

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
    <React.Fragment>
      <SEO
        description={data.page.description}
        title={data.page.title}
        {...(data.page.featuredImage
          ? {
              image: data.page.featuredImage.localFile.childImageSharp.resize,
            }
          : {})}
      />
      {page.hero &&
        page.hero.map(img => (
          <Image
            key={img.hero.id}
            alt={img.hero.title || img.hero.description}
            {...img.hero.localFile.childImageSharp}
          />
        ))}
      <SkipNavContent>
        {Partial && <Partial />}
        {page.timeline &&
          page.timeline.map(timeline => (
            <Timeline key={timeline.id} {...timeline} />
          ))}
        {page.section &&
          page.section.map(section => (
            <Section key={section.id} {...section} />
          ))}
        {page.party &&
          page.party.map(party => <WeddingParty key={party.id} {...party} />)}
        {page.gallery &&
          page.gallery.map(gallery => (
            <Gallery key={gallery.id} {...gallery} />
          ))}
      </SkipNavContent>
    </React.Fragment>
  )
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    page: contentfulPage(fields: { slug: { eq: $slug } }) {
      id
      slug
      description
      title
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
        # gallery of images -- neat!
        ... on ContentfulGallery {
          __typename
          id
          ...GalleryDetails
        }

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

        # timeline (a la proposal)
        ... on ContentfulTimeline {
          __typename
          moments {
            id
            ...MomentDetails
          }
        }

        # group of people
        ... on ContentfulWeddingParty {
          __typename
          id
          parents {
            ...PersonDetails
          }

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
