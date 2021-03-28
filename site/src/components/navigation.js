/** @jsx jsx */
import { jsx, Styled, useColorMode } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'

import ColorMode from './color-mode'
import Link from './link'

const modes = [`light`, `dark`, `sepia`]
const defaultMode = `light`

export default function Navigation() {
  const [mode, setMode] = useColorMode(defaultMode)
  const data = useStaticQuery(graphql`
    {
      nav: contentfulNavigation {
        items {
          title
          fields {
            slug
          }
        }
      }
    }
  `)
  const nextMode = modes[(modes.indexOf(mode) + 1) % modes.length]
  const pagesList = data.nav.items.map(node => [node.title, node.fields.slug])
  const pages = []
    .concat(pagesList.slice(0, 1))
    .concat(
      process.env.GATSBY_SHOW_RSVP === 'true'
        ? [['RSVP', 'https://www.zola.com/wedding/maggieanddustin2020/rsvp']]
        : []
    )
    .concat(pagesList.slice(1))

  return (
    <nav
      sx={{
        position: 'relative',
      }}
    >
      <Link
        to="/"
        sx={{
          borderBottomWidth: 0,
          display: `block`,
          fontFamily: 'heading',
          fontWeight: 'heading',
          fontSize: 4,
          whiteSpace: `nowrap`,
          margin: `0 auto`,
          pt: [2],
          pb: [2],
          pl: 0,
          pr: 0,
          textAlign: `center`,
          width: [`100%`, `50%`],
          maxWidth: `100%`,
        }}
      >
        <span sx={{ display: 'inline-block' }}>
          Maggie{' '}
          <em sx={{ fontFamily: `cursive`, fontWeight: 'body' }}>&amp;</em>{' '}
          Dustin
        </span>
      </Link>
      <Styled.ul
        sx={{
          display: `flex`,
          alignItems: `center`,
          justifyContent: [`flex-start`, `center`],
          margin: 0,
          fontFamily: 'heading',
          fontSize: [0, 1],
          pb: [2, 0],
          textAlign: 'center',
          whiteSpace: `nowrap`,
          overflow: `hidden`,
          overflowX: `scroll`,
        }}
      >
        {[]
          .concat(pages)
          .concat(
            process.env.GATSBY_SHOW_REGISTRY === `true`
              ? [['Registry', `/registry/`]]
              : []
          )
          .filter(Boolean)
          .map(([title, to]) => {
            const isExternal = /https?/.test(to)
            const Wrapper = isExternal ? 'a' : Link
            const props = isExternal
              ? {
                  href: to,
                  rel: 'noopener noreferrer',
                  target: '_blank',
                }
              : { to }
            return (
              <Styled.li
                key={title}
                sx={{
                  padding: [2, 3],
                }}
              >
                <Wrapper
                  {...props}
                  partiallyActive={true}
                  sx={{
                    color: 'text',
                    fontWeight: 'normal',
                    position: 'relative',
                    textDecoration: 'none',
                  }}
                >
                  {title}
                  {/*newPages.find(pageTitle => title === pageTitle) && (
                    <span sx={{
                      position: 'absolute',
                      top: `-4px`,
                      right: `-4px`,
                      backgroundColor: 'accent',
                      color: 'background',
                      padding: '2px',
                      fontSize: 9,
                      textTransform: `uppercase`
                    }}>new</span>
                  )*/}
                </Wrapper>
              </Styled.li>
            )
          })}
      </Styled.ul>
      <ColorMode
        mode={mode}
        nextMode={nextMode}
        onClick={() => {
          setMode(nextMode)
        }}
        sx={{
          position: 'absolute',
          right: [0, 0, 2],
          top: [2, 2, '50%'],
          transform: [0, 0, 'translateY(-50%)'],
        }}
      />
    </nav>
  )
}
