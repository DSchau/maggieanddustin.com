/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'

export default function Party() {
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
          June 25 - 28, 2020
        </Styled.h1>
        <Styled.h2 sx={{ fontSize: [30, 48], fontFamily: `Parisienne` }}>
          Lake Tahoe, NV
        </Styled.h2>
      </Styled.div>
    </React.Fragment>
  )
}
