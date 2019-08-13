/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'

import Toggle from '../../components/toggle'

export default function Header({ items }) {
  return (
    <header
      sx={{
        position: 'relative',
      }}
    >
      <nav
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ul>
          {items.map(item => (
            <li
              sx={{
                display: 'inline-block',
                pt: 's',
                pl: 'm',
                pr: 'm',
                pb: 's',
              }}
              key={item.label}
            >
              <GatsbyLink
                sx={{ color: 'primary', textDecoration: 'none' }}
                activeClassName="active"
                to={item.to}
              >
                {item.label}
              </GatsbyLink>
            </li>
          ))}
        </ul>
      </nav>
      <Toggle
        sx={{
          position: 'absolute',
          right: 'm',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />
    </header>
  )
}
