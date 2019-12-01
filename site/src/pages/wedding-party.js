/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql } from 'gatsby'

import Layout from '../components/layout/'
import Person from '../components/person'

const Party = props => (
  <div>
    <h1 sx={{ textAlign: 'center' }}>{props.title}</h1>
    <ul sx={{ margin: 0, padding: 0 }}>
      {props.party.map(person => (
        <li
          key={person.name}
          sx={{ listStyleType: 'none', margin: 0, padding: 0 }}
        >
          <Person {...person} />
        </li>
      ))}
    </ul>
  </div>
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
          gridTemplateColumns: '1fr',
          '@media only screen and (min-width: 768px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
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
