/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'

export default function Proposal({ children }) {
  return (
    <React.Fragment>
      <Styled.div
        sx={{ textAlign: `center`, pt: `10vh`, pb: `calc(10vh - 38px)` }}
      >
        <Styled.p
          sx={{
            fontStyle: `italic`,
            fontSize: [20, 24],
            mb: 0,
            fontFamily: `heading`,
          }}
        >
          Dustin proposed (and Maggie said yes!) with both of their families on
          January 19th, 2019.
        </Styled.p>
        <Styled.h1
          sx={{
            fontSize: [30, 48],
            padding: [2, 4],
            mb: [2, 0],
            textTransform: `uppercase`,
          }}
        >
          Proposal
        </Styled.h1>
        <Styled.h2 sx={{ fontSize: [30, 48], fontFamily: `Parisienne` }}>
          Granada, Spain
        </Styled.h2>
      </Styled.div>
      {children}
    </React.Fragment>
  )
}
