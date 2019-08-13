/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Link } from 'gatsby'

import ColorMode from './color-mode'

const Li = Styled.li

export default () => (
  <nav sx={{ backgroundColor: 'background' }}>
    <Styled.ul sx={{ display: 'inline-block' }}>
      {[
        ['Home', '/'],
        ['RSVP', '/rsvp/'],
        ['Venue', '/venue/'],
        ['Wedding Party', '/wedding-party/'],
      ].map(([title, to]) => (
        <Li key={title} sx={{ padding: 3 }}>
          <Link sx={{ color: 'text', textDecoration: 'none' }} to={to}>
            {title}
          </Link>
        </Li>
      ))}
      <Li>
        <ColorMode />
      </Li>
    </Styled.ul>
  </nav>
)
