/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'
import { MdViewQuilt, MdViewList } from 'react-icons/md'

import BlogPost from '../../components/blog-post-preview'
import SEO from '../../components/seo'
import Masonry from '../../components/masonry'

const Button = props => (
  <button
    sx={{
      color: `text`,
      backgroundColor: `transparent`,
      border: `none`,
      pl: 2,
      pr: 2,
    }}
    {...props}
  />
)

function BlogListing({ data }) {
  const [view, setView] = useState('grid')
  const { posts } = data
  const Wrapper = view === `grid` ? Masonry : Styled.div
  return (
    <React.Fragment>
      <SEO title="Blog" description="The blog for Maggie and Dustin" />
      <SkipNavContent>
        <Styled.div
          sx={{
            width: [`100%`, `75%`],
            margin: `0 auto`,
          }}
        >
          <Styled.div sx={{ display: [`none`, `block`], float: [`right`] }}>
            <Button onClick={() => setView('grid')}>
              <MdViewQuilt size={24} />
            </Button>
            <Button onClick={() => setView('list')}>
              <MdViewList size={24} />
            </Button>
          </Styled.div>
          <Wrapper sx={{ clear: `both` }}>
            {posts.nodes.map(post => (
              <BlogPost key={post.fields.slug} {...post} slug={post.path} />
            ))}
          </Wrapper>
        </Styled.div>
      </SkipNavContent>
    </React.Fragment>
  )
}

export const blogQuery = graphql`
  {
    posts: allContentfulBlogPost(sort: { fields: endDate, order: ASC }) {
      nodes {
        path: gatsbyPath(filePath: "/blog/{ContentfulBlogPost.fields__slug}")
        ...BlogPostDetails
      }
    }
  }
`

export default BlogListing
