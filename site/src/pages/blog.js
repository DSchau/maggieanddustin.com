/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'
import { graphql } from 'gatsby'

import BlogPost from '../components/blog-post-preview'
import Grid from '../components/grid'

function BlogListing({ data }) {
  const { posts } = data
  return (
    <>
      <Styled.h1>Blog</Styled.h1>
      <Grid>
        {posts.nodes.map(post => (
          <BlogPost key={post.fields.slug} {...post} slug={post.fields.slug} />
        ))}
      </Grid>
    </>
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
