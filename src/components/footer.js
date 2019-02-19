import React from 'react'
import styled from '@emotion/styled'
import { FaHeart } from 'react-icons/fa'

const Container = styled.footer`
  padding: 2rem;
  background-color: #222;
`

const Message = styled.p`
  margin: 0;
  color: white;
  text-align: center;

  font-family: Raleway, sans-serif;
  font-size: 1rem;

  padding: 0.5rem;
  border: 2px solid #444;
  border-left-width: 0;
  border-right-width: 0;
`

function Footer() {
  return (
    <Container>
      <Message>
        Made with <FaHeart color="#c74444" css={{ position: `relative`, top: 2 }} /> by Dustin <span css={{ display: `block`, margin: `1rem 0`, fontStyle: `italic`, fontSize: `0.85rem`, textDecoration: `underline`, textDecorationSkip: `ink` }}>for Maggie</span></Message>
    </Container>
  )
}

export default Footer
