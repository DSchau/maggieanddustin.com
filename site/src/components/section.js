/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'

import richTextRenderer from './rich-text-renderer'

function Section({ body, fields, title }) {
  return (
    <Styled.div
      sx={{
        padding: 3,
        borderTop: `1px solid #eee`,
        borderBottom: `1px solid #eee`,
        margin: '0 auto',
        maxWidth: ['100%', '65ch'],
      }}
    >
      <Styled.h2 sx={{ textAlign: 'center', fontSize: 32 }} id={fields.slug}>
        {title}
      </Styled.h2>
      {richTextRenderer(body.json)}
    </Styled.div>
  )
}

export const sectionQuery = graphql`
  fragment SectionDetails on ContentfulSection {
    body {
      json
    }
    fields {
      slug
    }
    title
  }
`

export default Section
