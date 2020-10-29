/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { graphql } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'

import Grid from '../components/grid'
import Image from '../components/image'
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
        {archive.nodes.map(archive => (
          <BlogPostPreview
            key={archive.fields.slug}
            {...archive}
            featuredImage={false}
            summary={false}
            readMore={false}
            slug={archive.fields.slug}
          >
            <Grid sx={{ mt: 4, mb: 4 }}>
              {(archive.gallery || [])
                .filter(photo => {
                  try {
                    return photo.localFile.childImageSharp
                  } catch (e) {
                    return false
                  }
                })
                .map(photo => (
                  <Image
                    key={photo.localFile.id}
                    {...photo.localFile.childImageSharp}
                  />
                ))}
            </Grid>
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
