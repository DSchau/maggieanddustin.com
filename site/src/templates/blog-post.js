/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'
import { graphql } from 'gatsby'

import Gallery from '../components/gallery'
import BlogPost from '../components/blog-post'

function BlogPostPage({ data }) {
  const { post } = data
  console.log(post.gallery)
  return (
    <>
      {post && (
        <BlogPost
          as="article"
          sx={{
            maxWidth: '100%',
            margin: '0 auto',
            '@media only screen and (min-width: 768px)': {
              padding: '1rem',
              maxWidth: '60%',
            },
          }}
          zoom={true}
          {...post}
        >
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
              <Gallery title="Images" photos={[post.gallery]} />
            </div>
          )}
        </BlogPost>
      )}
    </>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    post: contentfulBlogPost(fields: { slug: { eq: $slug } }) {
      ...BlogPostDetails
      gallery {
        localFile {
          id
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default BlogPostPage
