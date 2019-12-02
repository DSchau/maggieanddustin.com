/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Grid from '../components/grid'
import Image from '../components/image'
import BlogPostPreview from '../components/blog-post-preview'

function Photos({ data }) {
  const { archive } = data
  return (
    <Layout>
      {archive.nodes.map(archive => (
        <BlogPostPreview
          key={archive.fields.slug}
          {...archive}
          featuredImage={null}
          slug={archive.fields.slug}
        >
          <Grid sx={{ mt: 4, mb: 4 }}>
            {archive.gallery.map(photo => (
              <Image key={photo.fluid.src} {...photo} />
            ))}
          </Grid>
        </BlogPostPreview>
      ))}
    </Layout>
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
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`

export default Photos
