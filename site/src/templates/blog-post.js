/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'

import Layout from '../components/layout/'
import Grid from '../components/grid'
import Image from '../components/image'
import richTextRenderer from '../components/rich-text-renderer'

function BlogPost({ data }) {
  const { post } = data
  return (
    <Layout>
      {post && (
        <article
          sx={{
            maxWidth: '100%',
            margin: '0 auto',
            '@media only screen and (min-width: 768px)': {
              padding: '1rem',
              maxWidth: '60%',
            },
          }}
        >
          <Styled.h1>{post.title}</Styled.h1>
          <Styled.h2>{[post.startDate, post.endDate].join(' - ')}</Styled.h2>
          {richTextRenderer(post.body.json)}
          {post.gallery && (
            <div
              sx={{
                paddingTop: 8,
                borderTopWidth: 1,
                borderTopColor: 'text',
                borderTopStyle: 'solid',
              }}
            >
              <Styled.h3>Gallery</Styled.h3>
              <Grid>
                {post.gallery.map(img => (
                  <Image {...img} />
                ))}
              </Grid>
            </div>
          )}
        </article>
      )}
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    post: contentfulBlogPost(fields: { slug: { eq: $slug } }) {
      title
      startDate(formatString: "MMM Do, YYYY")
      endDate(formatString: "MMM Do, YYYY")
      body {
        json
      }
      gallery {
        fluid(maxWidth: 1000) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`

export default BlogPost
