/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'

import richTextRenderer from './rich-text-renderer'

function Section({ body, title }) {
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
      <Styled.h2 sx={{ textAlign: 'center', fontSize: 32 }}>{title}</Styled.h2>
      {richTextRenderer(body.json)}
    </Styled.div>
  )
}

export const sectionQuery = graphql`
  fragment SectionDetails on ContentfulSection {
    body {
      json
    }
    title
  }
`

export default Section
