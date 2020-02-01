/** @jsx jsx */
import { jsx, Styled, useColorMode } from 'theme-ui'

import ColorMode from './color-mode'
import Link from './link'

export default function Navigation() {
  const [mode, setMode] = useColorMode('light')
  const isDark = mode === 'dark'
  return (
    <nav
      sx={{
        position: 'relative',
        borderTopColor: 'text',
        borderTopWidth: 6,
        borderTopStyle: 'solid',
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
          pt: [2, 4],
          pb: [2, 4],
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
        {[
          process.env.GATSBY_SHOW_RSVP !== `false` && ['RSVP', '/rsvp/'],
          ['Venue', '/venue/'],
          ['Wedding Party', '/wedding-party/'],
          ['Our Story', `/story/`],
          // ['Photos', '/photos/'],
          ['Proposal', '/proposal/'],
          process.env.GATSBY_SHOW_REGISTRY !== `false` && [
            'Registry',
            `/registry/`,
          ],
          // ['Blog', '/blog/'],
        ]
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
        isDark={isDark}
        onClick={() =>
          console.log(mode) || setMode(mode === 'dark' ? 'light' : 'dark')
        }
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
