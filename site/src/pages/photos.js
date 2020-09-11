/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { graphql } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'

import Gallery from '../components/gallery'
import SEO from '../components/seo'
import BlogPostPreview from '../components/blog-post-preview'

function Photos({ data }) {
  const { archive } = data
  return (
    <React.Fragment>
      <SEO
        title="Photos"
        description="An archive of photos for Maggie and Dustin"
      />
      <SkipNavContent>
        {archive.nodes.map(entity => (
          <BlogPostPreview
            key={entity.fields.slug}
            {...entity}
            featuredImage={false}
            summary={false}
            readMore={false}
            slug={entity.fields.slug}
          >
            <Gallery photos={entity.gallery} />
          </BlogPostPreview>
        ))}
      </SkipNavContent>
    </React.Fragment>
  )
}

export const photosQuery = graphql`
  {
    archive: allContentfulBlogPost(
      filter: { gallery: { elemMatch: { title: { ne: null } } } }
    ) {
      nodes {
        ...BlogPostDetails
        gallery {
          localFile {
            id
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`

export default Photos
