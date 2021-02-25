/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'
import { SkipNavContent } from '@reach/skip-nav'
import { useStaticQuery, graphql } from 'gatsby'

import SEO from '../../components/seo'
import Countdown from '../../components/countdown'
import Seperator from '../../components/seperator'
import Logo from '../../components/logo'
import { rsvp } from '../../utils/api'

function GoldenTicket({ guests = [] }) {
  return (
    <Styled.div sx={{ background: '#ffbf00', padding: 4, mt: 2, mb: 2 }}>
      <Logo as={Styled.h2} plural={true} sx={{
        fontSize: 40
      }} />
      <Styled.h2 sx={{
        fontSize: [40, 60],
        textTransform: `uppercase`
      }}>Golden Ticket</Styled.h2>
      <p sx={{ textTransform: 'uppercase', fontFamily: 'serif', fontSize: 20 }}>Greetings to the lucky finder of this golden ticket from Mr. Dustin Schau and (the future) Mrs. Maggie Schau.</p>
      {guests.map(guest => {
        return (
          <Styled.h3 key={guest.name}>{guest.name}</Styled.h3>
        )
      })}
      <p sx={{ fontStyle: 'italic', fontFamily: 'serif' }}>We can't wait to see you and celebrate with you!</p>
    </Styled.div>
  )
}

function RSVPResult(props) {
  const [guests, setGuests] = React.useState([])
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
  React.useEffect(() => {
    async function fetchGuests() {
      const data = await rsvp({
        name: 'Dustin Schau',
        method: 'lookup',
        slug: props.params.slug
      })

      const guests = data.guests || [].reduce((merged, guest) => {
        return merged.concat([
          { name: guest.Name }
        ].concat(guest.Guests ? guest.Guests.split(/,\s*/).map(name => ({ name: name.trim() })) : []))
      }, [])
      
      setGuests(guests)
    }

    fetchGuests()
  }, [props.params.slug])
  return (
    <Styled.div sx={{ textAlign: `center`, pt: `10vh` }}>
      <SEO title="RSVP for Maggie Alcorn and Dustin Schau Wedding" />
      <SkipNavContent>
        <Styled.h1
            sx={{
              fontSize: [30, 48],
              padding: [2, 4],
              mb: [2, 0],
              textTransform: `uppercase`,
            }}
          >
            Welcome to the wedding!
          </Styled.h1>
          <GoldenTicket guests={guests} />
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
      </SkipNavContent>
    </Styled.div>
  )
}

export default RSVPResult