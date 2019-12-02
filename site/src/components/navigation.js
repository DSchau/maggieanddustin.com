/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

import ColorMode from './color-mode'
import Link from './link'

const Li = Styled.li

export default () => {
  return (
    <nav
      sx={{
        position: 'relative',
        borderTopColor: 'color',
        borderTopWidth: 6,
        borderTopStyle: 'solid',
        padding: [1, 2],
      }}
    >
      <Link
        to="/"
        sx={{
          fontFamily: 'heading',
          fontWeight: 'heading',
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
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
          display: ['none', 'block'],
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
          ['Photos', '/photos/'],
          ['Proposal', '/proposal/'],
          // ['Blog', '/blog/'],
        ].map(([title, to]) => (
          <Li key={title} sx={{ padding: [1, 3] }}>
            <Link to={to} partiallyActive={true}>
              {title}
            </Link>
          </Li>
        ))}
      </Styled.ul>
      <ColorMode
        sx={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />
    </nav>
  )
}
