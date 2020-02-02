/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'
import { Link } from 'gatsby'

export default function Home() {
  return (
    <React.Fragment>
      <Styled.div sx={{ textAlign: `center`, pt: `10vh`, pb: `10vh` }}>
        <Styled.p
          sx={{ fontStyle: `italic`, fontSize: 24, fontFamily: `heading` }}
        >
          Please join us for our wedding celebration on
        </Styled.p>
        <Styled.h1
          sx={{
            fontSize: 48,
            padding: 2,
            mb: 0,
            textTransform: `uppercase`,
          }}
        >
          August 8, 2020
        </Styled.h1>
        <Styled.h2 sx={{ fontSize: 40, fontFamily: `Parisienne` }}>
          Minneapolis, MN
        </Styled.h2>
        {process.env.GATSBY_SHOW_RSVP !== `false` && (
          <Link
            to="/rsvp/"
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
          </Link>
        )}
      </Styled.div>
    </React.Fragment>
  )
}
