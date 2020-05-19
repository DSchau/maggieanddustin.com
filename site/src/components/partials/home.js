/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

import Countdown from '../countdown'
import Seperator from '../seperator'

export default function Home() {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          weddingDate(formatString: "MMMM DD, YYYY")
          utcWeddingDate: weddingDate(formatString: "MM/DD/YYYY hh:mm:ss")
        }
      }
    }
  `)
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
          Please join us for our wedding celebration on
        </Styled.p>
        <Styled.h1
          sx={{
            fontSize: [30, 48],
            padding: [2, 4],
            mb: [2, 0],
            textTransform: `uppercase`,
          }}
        >
          {data.site.siteMetadata.weddingDate}
        </Styled.h1>
        <Styled.h2 sx={{ fontSize: [30, 48], fontFamily: `Parisienne` }}>
          Minneapolis, MN
        </Styled.h2>
        <Styled.div sx={{ pt: 4, pb: 4 }}>
          <Seperator />
          <Countdown
            sx={{ pt: 4, pb: 4 }}
            endTime={new Date(data.site.siteMetadata.utcWeddingDate).getTime()}
          />
          <Styled.h3 sx={{ textAlign: `center`, pt: [0, 2] }}>
            until the big day!
          </Styled.h3>
          <Seperator />
        </Styled.div>
        {process.env.GATSBY_SHOW_RSVP === `true` && (
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
