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
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSevJ0jQmzf2I7mkaFiR4TPdlsSVPIMNSAuekUtJx1Z7eCGuUg/viewform"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            ':hover': {
              borderColor: `text`,
              backgroundColor: `background`,
              color: `text`,
            },
            borderWidth: 4,
            borderColor: `transparent`,
            borderStyle: `solid`,
            display: `inline-block`,
            fontSize: 32,
            textDecoration: `none`,
            backgroundColor: `text`,
            color: `background`,
            pt: 3,
            pb: 3,
            pr: 4,
            pl: 4,
            mt: 2,
            mb: 2,
          }}
        >
          RSVP
        </a>
      </Styled.div>
    </React.Fragment>
  )
}
