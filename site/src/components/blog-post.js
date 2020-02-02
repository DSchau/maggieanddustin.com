/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'

import Image from './image'
import richTextRenderer from './rich-text-renderer'

function BlogPost({
  as = 'div',
  children,
  fields,
  title,
  startDate,
  featuredImage,
  endDate,
  body,
  zoom,
  ...rest
}) {
  const Wrapper = Styled[as] ? Styled[as] : as
  return (
    <Wrapper {...rest}>
      <Styled.h1
        sx={{
          display: 'block',
          maxWidth: ['100%', '50%'],
          mt: 4,
          mb: 2,
          ml: 'auto',
          mr: 'auto',
          textAlign: 'center',
        }}
      >
        {title}
      </Styled.h1>
      <Styled.h2
        sx={{ fontSize: 2, fontWeight: 'normal', mt: 0, textAlign: 'center' }}
      >
        {[startDate, endDate].join(' - ')}
      </Styled.h2>
      {featuredImage && <Image {...featuredImage.localFile.childImageSharp} />}
      {richTextRenderer(body.json, { zoom })}
      {children}
    </Wrapper>
  )
}

export const blogPostFragment = graphql`
  fragment BlogPostDetails on ContentfulBlogPost {
    fields {
      slug
    }
    featuredImage {
      localFile {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    summary
    title
    startDate(formatString: "MMM Do, YYYY")
    endDate(formatString: "MMM Do, YYYY")
    body {
      json
    }
  }
`

export default BlogPost
