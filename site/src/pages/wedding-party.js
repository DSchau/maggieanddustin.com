/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql } from 'gatsby'

import Layout from '../components/layout/'
import Person from '../components/person'
import SEO from '../components/seo'

function WeddingParty({ data }) {
  const {
    party: { bridesParty, groomsParty },
  } = data
  const party = bridesParty.reduce((merged, member, index) => {
    return merged.concat(member).concat(groomsParty[index])
  }, [])
  const names = party.map((member, index) =>
    index + 1 === party.length ? `and ${member.name}` : member.name
  )
  return (
    <Layout>
      <SEO
        description={`The wedding party for the wedding for Maggie Alcorn and Dustin Schau: ${names.join(
          ', '
        )}`}
        title="Wedding Party"
      />
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
