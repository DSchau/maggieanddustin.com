/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'
import { graphql } from 'gatsby'

import BlogPost from '../components/blog-post-preview'
import Grid from '../components/grid'
import SEO from '../components/seo'

function BlogListing({ data }) {
  const { posts } = data
  return (
    <React.Fragment>
      <SEO title="Blog" description="The blog for Maggie and Dustin" />s
      <Styled.h1>Blog</Styled.h1>
      <Grid>
        {posts.nodes.map(post => (
          <BlogPost key={post.fields.slug} {...post} slug={post.fields.slug} />
        ))}
      </Grid>
    </React.Fragment>
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
