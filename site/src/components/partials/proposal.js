/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'

export default function Proposal({ children }) {
  return (
    <React.Fragment>
      <Styled.div
        sx={{ textAlign: `center`, pt: `10vh`, pb: `calc(10vh - 38px)` }}
      >
        <Styled.h1
          sx={{ fontSize: 48, padding: 2, mb: 0, textTransform: `uppercase` }}
        >
          Proposal
        </Styled.h1>
        <Styled.h2 sx={{ fontFamily: `body`, fontSize: 40 }}>
          Granada, Spain
        </Styled.h2>
        <Styled.p>
          Dustin proposed (and Maggie said yes!) with both of their families on
          January 19th, 2019.
        </Styled.p>
      </Styled.div>
      {children}
    </React.Fragment>
  )
}
