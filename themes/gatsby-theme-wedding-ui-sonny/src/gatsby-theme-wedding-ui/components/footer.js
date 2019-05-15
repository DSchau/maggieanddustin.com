import React from 'react'
import styled from '@emotion/styled'

const Container = styled.footer`
  background-color: white;
  padding: 2rem 1.5rem;

  font-family: sans-serif;
`

const Message = styled.p`
  text-transform: uppercase;
  font-size: 12px;
  text-align: center;
`

export default function Footer() {
  return (
    <Container>
      <Message>Made with <span role="img" aria-label="Heart emoji">❤️</span> by Dustin</Message>
    </Container>
  )
}
