/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Layout from '../components/layout/'
import Grid from '../components/grid'
import Image from '../components/image'

const options = lang => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: ({ data } = {}, children) => {
      if (!data || !data.target) {
        return null
      }
      const { file, title } = data.target.fields
      return <Image src={file[lang].url} alt={title[lang]} />
    },
  },
})

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
          <h1>{post.title}</h1>
          <h2>{[post.startDate, post.endDate].join(' - ')}</h2>
          {documentToReactComponents(post.body.json, options('en-US'))}
          {post.gallery && (
            <div
              sx={{
                paddingTop: 8,
                borderTopWidth: 1,
                borderTopColor: 'text',
                borderTopStyle: 'solid',
              }}
            >
              <h3>Gallery</h3>
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
