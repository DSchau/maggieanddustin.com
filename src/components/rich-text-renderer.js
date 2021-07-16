/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import qs from 'query-string'
import { Link } from 'gatsby'

import Callout from './callout'
import Embed from './embed'

import Image from './image'
const HEADERS = new Array(6).fill(undefined).reduce((merged, _, index) => {
  const level = index + 1
  merged[BLOCKS[`HEADING_${level}`]] = (__, children) => {
    const Header = Styled[`h${level}`]
    return <Header>{children}</Header>
  }
  return merged
}, {})

const options = ({ lang = 'en-US', imgStyle = {}, zoom } = {}) => ({
  renderMark: {
    [MARKS.CODE]: (node, children) => {
      if (/^embed/.test(node)) {
        const params = node.split(':').pop()
        const props = qs.parse(params)
        return <Embed {...props} type="airbnb" />
      } else if (/^callout/.test(node)) {
        const params = node.split(':').pop()
        const props = qs.parse(params)
        return <Callout>{props.message}</Callout>
      }
      return <code>{node}</code>
    },
  },
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
          sx={{ marginTop: 8, marginBottom: 8, ...imgStyle }}
        />
      )
    },
    [BLOCKS.PARAGRAPH]: (_, children) => (
      <Styled.p sx={{ lineHeight: 1.6 }}>
        {Array.isArray(children)
          ? children.map((child) => {
              if (typeof child === 'string') {
                const expr = /~(.+)~/g
                const matches = child.match(expr) || []
                return matches.reduce((merged, part) => {
                  const [uno, dos] = merged.split(part)
                  return [
                    uno,
                    <del>{part.replace(expr, (_, match) => match)}</del>,
                    dos,
                  ]
                }, child)
              }
              return child
            })
          : children}
      </Styled.p>
    ),
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
      return (
        <Link to={uri} sx={{ color: `accent` }}>
          {children}
        </Link>
      )
    },
    ...HEADERS,
  },
})

export default (body, opts = {}) => {
  if (!body) {
    return null
  }
  return renderRichText({ raw: body }, options(opts))
}
