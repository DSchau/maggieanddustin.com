/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'

export default function Party({ children, content }) {
  return (
    <React.Fragment>
      <Styled.div sx={{ textAlign: `center`, pt: `10vh` }}>
        <Styled.p
          sx={{
            fontStyle: `italic`,
            fontSize: [20, 24],
            mb: 0,
            fontFamily: `heading`,
          }}
        >
          The party begins&hellip;
        </Styled.p>
        <Styled.h1
          sx={{
            fontSize: [30, 48],
            padding: [2, 4],
            mb: [2, 0],
            textTransform: `uppercase`,
          }}
        >
          April 16th &mdash; 18th, 2021
        </Styled.h1>
        <Styled.h2 sx={{ fontSize: [30, 48], fontFamily: `Parisienne` }}>
          Minneapolis, MN
        </Styled.h2>
      </Styled.div>
      {children}
      {content}
    </React.Fragment>
  )
}
