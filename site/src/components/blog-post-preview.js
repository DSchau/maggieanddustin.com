/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Link } from 'gatsby'

import Image from './image'

function BlogPost({ children, title, featuredImage, slug, summary }) {
  return (
    <Link
      to={slug}
      sx={{
        padding: 4,
        color: `text`,
        textDecoration: `none`,
      }}
    >
      {featuredImage && featuredImage.localFile && (
        <Image {...featuredImage.localFile.childImageSharp} />
      )}
      <Styled.h2 sx={{ textAlign: 'center' }}>{title}</Styled.h2>
      <Styled.p>{summary}</Styled.p>
      {children}
    </Link>
  )
}

export default BlogPost
