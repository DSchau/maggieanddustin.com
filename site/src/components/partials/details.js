/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Seperator from '../seperator'

export default function Venue({ children, content }) {
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
          sx={{ fontSize: [32, 48], padding: 2, mb: 0, textTransform: `uppercase` }}
        >
          Ceremony{' '}
          <em sx={{ fontFamily: `cursive`, fontWeight: 'body' }}>&amp;</em>{' '}
          Reception
        </Styled.h1>
        <Styled.h2 sx={{ fontFamily: `body`, fontSize: [24, 40] }}>
          Renaissance Minneapolis Hotel, the Depot
        </Styled.h2>
        {[
          `Saturday, ${data.site.siteMetadata.weddingDate}`,
          `4:00 PM, Winter Garden`,
          `cocktail hour and reception to immediately follow`,
        ].map(part => (
          <Styled.p key={part} sx={{ fontSize: [3, 4], pb: 0, pl: 1, pr: 1, mb: 0, textTransform: 'italic', fontStyle: 'italic' }}>
            {part}
          </Styled.p>
        ))}
        <Seperator sx={{ mt: 4, mb: 4 }} />
        <a href="https://goo.gl/maps/wvmJmFUY4a8SKbMk7" sx={{ color: 'text', ':hover': { textDecoration: 'none' }}} target="_blank" rel="noopener noreferrer">
          {[
            '225 3rd Ave S,',
            'Minneapolis, MN 55401',
          ].map(part => (
            <Styled.p key={part} sx={{ fontSize: 4, pb: 0, mb: 0 }}>
              {part}
            </Styled.p>
          ))}
        </a>
        <a
          href="https://www.marriott.com/events/start.mi?id=1568837961848&key=GRP"
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
      {content}
    </React.Fragment>
  )
}
