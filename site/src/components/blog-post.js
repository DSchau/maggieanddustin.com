/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'

import Image from './image'
import richTextRenderer from './rich-text-renderer'

const imgStyle = {
  gridColumn: `1 / 4`,
  width: `100%`,
  maxWidth: `100ch`,
  justifySelf: `center`,
  mb: [2, `10vh`],
  mt: [2, `10vh`],
}

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
    <SkipNavContent>
      <Wrapper
        {...rest}
        sx={{
          display: `grid`,
          gridTemplateColumns: `minmax(1.2rem, 1fr) minmax(auto, 57ch) minmax(1.2rem, 1fr)`,
        }}
      >
        <Styled.h1
          sx={{
            fontFamily: 'heading',
            fontSize: [32, 44, 60],
            mt: 4,
            mb: 2,
            ml: 'auto',
            mr: 'auto',
            textAlign: `center`,
            gridColumn: `1 / 4`,
          }}
        >
          {title}
        </Styled.h1>
        <Styled.h2
          sx={{
            fontSize: 2,
            fontWeight: 'normal',
            mt: 0,
            textAlign: 'center',
            justifySelf: `center`,
            gridColumn: `1 / 4`,
          }}
        >
          {[startDate, endDate].join(' - ')}
        </Styled.h2>
        {featuredImage && (
          <Image sx={imgStyle} {...featuredImage.localFile.childImageSharp} />
        )}
        <Styled.div sx={{ gridColumn: 2 }}>
          {richTextRenderer(body.json, { imgStyle, zoom: false })}
        </Styled.div>
        {children}
      </Wrapper>
    </SkipNavContent>
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
          fluid(maxHeight: 250) {
            ...GatsbyImageSharpFluid_withWebp
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
