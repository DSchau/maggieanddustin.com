import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'

function BlogListing({ data }) {
  const { posts } = data
  return (
    <Layout>
      <h1>Blog</h1>
      <ul>
        {posts.nodes.map(post => (
          <li key={post.fields.slug}>
            <Link to={post.fields.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export const blogQuery = graphql`
  {
    posts: allContentfulBlogPost {
      nodes {
        title
        fields {
          slug
        }
      }
    }
  }
`

export default BlogListing
