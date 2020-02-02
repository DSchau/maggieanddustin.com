/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { graphql } from 'gatsby'

import Grid from '../components/grid'
import Image from '../components/image'
import BlogPostPreview from '../components/blog-post-preview'

function Photos({ data }) {
  const { archive } = data
  return (
    <>
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
            {archive.gallery.map(photo => (
              <Image
                key={photo.localFile.id}
                {...photo.localFile.childImageSharp}
              />
            ))}
          </Grid>
        </BlogPostPreview>
      ))}
    </>
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
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

export default Photos
