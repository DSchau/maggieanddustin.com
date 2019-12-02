/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Image from './image'

const HEADERS = new Array(6).fill(undefined).reduce((merged, _, index) => {
  const level = index + 1
  merged[BLOCKS[`HEADING_${level}`]] = (__, children) => {
    const Header = Styled[`h${level}`]
    return <Header>{children}</Header>
  }
  return merged
}, {})

const options = lang => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: ({ data } = {}, children) => {
      if (!data || !data.target) {
        return null
      }
      const { file, title } = data.target.fields
      return <Image src={file[lang].url} alt={title[lang]} />
    },
    [BLOCKS.PARAGRAPH]: (_, children) => <Styled.p>{children}</Styled.p>,
    ...HEADERS,
  },
})

export default (body, lang = 'en-US') =>
  documentToReactComponents(body, options(lang))
