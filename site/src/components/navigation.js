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
        display: [`block`, `block`, `flex`],
        alignItems: `center`,
        justifyContent: `center`,
        position: 'relative',
        borderTopColor: 'color',
        borderTopWidth: 6,
        borderTopStyle: 'solid',
        padding: 2,
      }}
    >
      <Link
        to="/"
        sx={{
          display: `block`,
          fontFamily: 'heading',
          fontWeight: 'heading',
          whiteSpace: `nowrap`,
          position: [`relative`, `relative`, `absolute`],
          left: [0, 3],
          width: [`100%`, `100%`, `auto`],
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
          margin: 0,
          fontFamily: 'heading',
          fontSize: 0,
          textAlign: 'center',
          whiteSpace: `nowrap`,
          overflow: `hidden`,
          overflowX: `scroll`,
        }}
      >
        {[
          ['RSVP', '/rsvp/'],
          ['Venue', '/venue/'],
          ['Wedding Party', '/wedding-party/'],
          ['Our Story', `/story/`],
          // ['Photos', '/photos/'],
          ['Proposal', '/proposal/'],
          // ['Blog', '/blog/'],
        ].map(([title, to]) => (
          <Styled.li key={title} sx={{ padding: [1, 3] }}>
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
