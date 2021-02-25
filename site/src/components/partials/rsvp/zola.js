/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Seperator from '../../seperator'
import Countdown from '../../countdown'

function RSVP({ children, content }) {
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
    <Styled.div sx={{ textAlign: 'center' }}>
      {children}
      {content}
      <Styled.a sx={{ textAlign: 'center', display: 'inline-block', textDecoration: 'none', backgroundColor: 'text', color: 'background', fontSize: 24, padding: [2, 3, 4], mt: 4, mb: 4 }} href="https://www.zola.com/wedding/maggieanddustin2020/rsvp" target="_blank" rel="noreferrer noopener">Click here to RSVP</Styled.a>
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
        </Styled.div>
    </Styled.div>
  )
}

export default RSVP
