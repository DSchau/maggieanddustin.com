/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Link } from 'gatsby'

import Image from './image'

const HEADERS = new Array(6).fill(undefined).reduce((merged, _, index) => {
  const level = index + 1
  merged[BLOCKS[`HEADING_${level}`]] = (__, children) => {
    const Header = Styled[`h${level}`]
    return <Header>{children}</Header>
  }
  return merged
}, {})

const options = ({ lang = 'en-US', zoom } = {}) => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: ({ data } = {}) => {
      if (!data || !data.target || !data.target.fields) {
        return null
      }
      const { file, title } = data.target.fields
      return (
        <Image
          src={file[lang].url}
          alt={title[lang]}
          zoom={zoom}
          sx={{ marginTop: 8, marginBottom: 8 }}
        />
      )
    },
    [BLOCKS.PARAGRAPH]: (_, children) => <Styled.p>{children}</Styled.p>,
    [INLINES.HYPERLINK]: (node, children) => {
      const { uri } = node.data
      if (/^https?/.test(uri)) {
        return (
          <Styled.a
            href={uri}
            sx={{ color: `accent` }}
            target="_blank"
            rel="noreferrer"
          >
            {children}
          </Styled.a>
        )
      }
      return <Link to={uri}>{children}</Link>
    },
    ...HEADERS,
  },
})

export default (body, opts) => documentToReactComponents(body, options(opts))
