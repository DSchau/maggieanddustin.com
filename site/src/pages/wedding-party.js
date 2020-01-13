/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'

import Layout from '../components/layout/'
import Person from '../components/person'

const Party = props => (
  <Styled.div sx={{ display: 'flex', flexDirection: 'column' }}>
    <Styled.h1 sx={{ textAlign: 'center' }}>{props.title}</Styled.h1>
    {props.party.map(person => (
      <Person
        sx={{
          display: 'flex',
          flex: 1,
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        key={person.name}
        {...person}
      />
    ))}
  </Styled.div>
)

function WeddingParty({ data }) {
  const {
    party: { bridesParty, groomsParty },
  } = data
  const party = bridesParty.reduce((merged, member, index) => {
    return merged.concat(member).concat(groomsParty[index])
  }, [])
  return (
    <Layout>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: ['1fr', null, 'repeat(2, 1fr)'],
        }}
      >
        {party.map(person => (
          <Person
            sx={{ mt: [2, null, 4], mb: [2, null, 4], ml: 4, mr: 4 }}
            key={person.name}
            {...person}
          />
        ))}
      </div>
    </Layout>
  )
}

export const weddingPartyQuery = graphql`
  query WeddingPartyDetails {
    party: contentfulWeddingParty(title: { eq: "Wedding Party" }) {
      bridesParty {
        ...PersonDetails
      }
      groomsParty {
        ...PersonDetails
      }
    }
  }
`

export default WeddingParty
