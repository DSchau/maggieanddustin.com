import React from 'react'
import { Link } from 'gatsby'

function Header({ items }) {
  return (
    <header>
      <ul style={{ margin: 0, padding: 0 }}>
        {items.map(item => (
          <li key={item.label} style={{ display: `inline-block` }}>
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </header>
  )
}

Header.defaultProps = {
  items: [],
}

export default Header
