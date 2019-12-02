/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Link } from 'gatsby'

import Image from './image'

function BlogPost({ children, title, featuredImage, slug, summary }) {
  return (
    <Styled.div
      sx={{
        backgroundColor: 'background',
        padding: 4,
        margin: 2,
        borderWidth: 4,
        borderStyle: 'solid',
      }}
    >
      <Link to={slug} sx={{ color: 'text' }}>
        <Styled.h2 sx={{ textAlign: 'center' }}>{title}</Styled.h2>
      </Link>
      {featuredImage && <Image {...featuredImage} />}
      <Styled.p>{summary}</Styled.p>
      {children}
      <Link
        to={slug}
        sx={{
          display: 'block',
          backgroundColor: 'text',
          color: 'background',
          textAlign: 'center',
          textDecoration: 'none',
          padding: 2,
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'transparent',
          ':hover': {
            color: 'text',
            backgroundColor: 'background',
            borderColor: 'text',
          },
        }}
      >
        Read more
      </Link>
    </Styled.div>
  )
}

export default BlogPost
