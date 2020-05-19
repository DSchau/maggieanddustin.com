/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

export default function Venue({ children }) {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          weddingDate(formatString: "MMMM DD, YYYY")
        }
      }
    }
  `)
  return (
    <React.Fragment>
      <Styled.div
        sx={{ textAlign: `center`, pt: `10vh`, pb: `calc(10vh - 38px)` }}
      >
        <Styled.h1
          sx={{ fontSize: 48, padding: 2, mb: 0, textTransform: `uppercase` }}
        >
          Ceremony{' '}
          <em sx={{ fontFamily: `cursive`, fontWeight: 'body' }}>&amp;</em>{' '}
          Reception
        </Styled.h1>
        <Styled.h2 sx={{ fontFamily: `body`, fontSize: 40 }}>
          Renaissance Minneapolis Hotel, the Depot
        </Styled.h2>
        {[
          `Saturday, ${data.site.siteMetadata.weddingDate}`,
          '225 3rd Ave S,',
          'Minneapolis, MN 55401',
        ].map(part => (
          <Styled.p key={part} sx={{ fontSize: 4, pb: 0, mb: 0 }}>
            {part}
          </Styled.p>
        ))}
        <a
          href="https://www.marriott.com/event-reservations/reservation-link.mi?id=1568837961848&key=GRP&app=resvlink"
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
            mt: 4,
            mb: 2,
          }}
          target="_blank"
          rel="noopener noreferrer"
        >
          Book Hotel
        </a>
      </Styled.div>
      {children}
    </React.Fragment>
  )
}
