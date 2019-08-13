/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

import ColorMode from './color-mode'
import Link from './link'

const Li = Styled.li

export default () => (
  <nav
    sx={{
      backgroundColor: 'background',
      position: 'relative',
      borderTopColor: 'primary',
      borderTopWidth: 6,
      borderTopStyle: 'solid',
    }}
  >
    <Link
      to="/"
      sx={{
        fontFamily: 'heading',
        fontWeight: 'heading',
        position: 'absolute',
        left: [1, 2],
        top: '50%',
        transform: 'translateY(-50%)',
      }}
    >
      <span sx={{ display: ['none', 'inline-block'] }}>
        Maggie <em sx={{ fontFamily: `cursive`, fontWeight: 'body' }}>&amp;</em>{' '}
        Dustin
      </span>
    </Link>
    <Styled.ul
      sx={{
        margin: 0,
        fontFamily: 'heading',
        fontSize: 0,
        textAlign: 'center',
      }}
    >
      {[
        ['RSVP', '/rsvp/'],
        ['Venue', '/venue/'],
        ['Wedding Party', '/wedding-party/'],
        ['Proposal', '/proposal/'],
      ].map(([title, to]) => (
        <Li key={title} sx={{ padding: [1, 3] }}>
          <Link to={to}>{title}</Link>
        </Li>
      ))}
    </Styled.ul>
    <ColorMode
      sx={{
        position: 'absolute',
        right: [1, 2],
        top: '50%',
        transform: 'translateY(-50%)',
      }}
    />
  </nav>
)
