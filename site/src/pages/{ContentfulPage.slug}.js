import React from 'react'
import { graphql } from 'gatsby'

import Page from '../components/page'

export default function ContentfulPage({ data }) {
  return  <Page {...data.page} />
}

export const pageQuery = graphql`
  query PageBySlug($id: String!) {
    page: contentfulPage(id: { eq: $id }) {
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
                gatsbyImageData(layout: FULL_WIDTH, width: 1200, quality: 80, formats: [AUTO, WEBP, AVIF])
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
