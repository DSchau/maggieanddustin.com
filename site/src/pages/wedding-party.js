/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'

import Layout from '../components/layout/'
import Person from '../components/person'

const Party = props => (
  <Styled.div>
    <Styled.h1 sx={{ textAlign: 'center' }}>{props.title}</Styled.h1>
    {props.party.map(person => (
      <Person key={person.name} {...person} />
    ))}
  </Styled.div>
)

function WeddingParty({ data }) {
  const {
    party: { bride, groom },
  } = data
  return (
    <Layout>
      <div
        sx={{
          display: 'grid',
          gridTemplateColumns: ['1fr', 'repeat(2, 1fr)'],
        }}
      >
        <Party title="Bride's Side" party={bride} />
        <Party title="Groom's Side" party={groom} />
      </div>
    </Layout>
  )
}

export const weddingPartyQuery = graphql`
  query WeddingPartyDetails {
    party: contentfulWeddingParty(title: { eq: "Wedding Party" }) {
      bride: bridesParty {
        ...PersonDetails
      }
      groom: groomsParty {
        ...PersonDetails
      }
    }
  }
`

export default WeddingParty
