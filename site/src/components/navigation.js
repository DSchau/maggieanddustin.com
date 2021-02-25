/** @jsx jsx */
import { jsx, Styled, useColorMode } from 'theme-ui'
import { useStaticQuery, graphql } from 'gatsby'

import ColorMode from './color-mode'
import Link from './link'
import Logo from './logo'

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
  const pages = data.nav.items.map(node => [node.title, node.fields.slug])
  return (
    <nav
      sx={{
        position: 'relative',
      }}
    >
      <Logo />
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
        {[process.env.GATSBY_SHOW_RSVP === `true` && ['RSVP', '/rsvp/']]
          .concat(pages)
          .concat(
            process.env.GATSBY_SHOW_REGISTRY === `true`
              ? [['Registry', `/registry/`]]
              : []
          )
          .filter(Boolean)
          .map(([title, to]) => (
            <Styled.li key={title} sx={{ padding: [2, 3] }}>
              <Link to={to} partiallyActive={true}>
                {title}
              </Link>
            </Styled.li>
          ))}
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
