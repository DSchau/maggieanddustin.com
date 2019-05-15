import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from '@emotion/styled'

const Container = styled.header`
  background-color: white;
  padding: 2rem 3rem;

  font-family: sans-serif;
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: #666;
`

const List = styled.ul`
  margin: 0;
  padding: 0;
  transition: color 175ms ease-in-out;

  :hover {
    color: #aaa;
  }
`

const Link = styled(GatsbyLink)`
  color: inherit;
  text-decoration: none;
  text-transform: uppercase;

  font-size: 14px;
  transition: 175ms ease-in-out;
  padding: 0.25rem 0;
  border-bottom: 2px solid transparent;

  &.active, :hover {
    color: #222;
    border-bottom-color: #aaa;
  }
`

export default function Header({ items, title }) {
  return (
    <Container>
      <Nav>
        <Link css={{ fontSize: 18 }} to="/">{title}</Link>
        <List>
          {
            items.map(item => (
              <li css={{ display: `inline-block`, padding: `0.25rem 0.5rem`, margin: `0.25rem` }} key={item.label}>
                <Link activeClassName="active" to={item.to}>{item.label}</Link>
              </li>
            ))
          }
        </List>
      </Nav>
    </Container>
  )
}
