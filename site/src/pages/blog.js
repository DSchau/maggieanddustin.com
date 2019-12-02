/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'

import BlogPost from '../components/blog-post-preview'
import Grid from '../components/grid'
import Layout from '../components/layout'

function BlogListing({ data }) {
  const { posts } = data
  return (
    <Layout>
      <Styled.h1>Blog</Styled.h1>
      <Grid>
        {posts.nodes.map(post => (
          <BlogPost key={post.fields.slug} {...post} slug={post.fields.slug} />
        ))}
      </Grid>
    </Layout>
  )
}

export const blogQuery = graphql`
  {
    posts: allContentfulBlogPost(sort: { fields: endDate, order: ASC }) {
      nodes {
        ...BlogPostDetails
      }
    }
  }
`

export default BlogListing
