/** @jsx jsx */
import { jsx } from 'theme-ui'

import Person from './person'

function WeddingParty({ bridesParty, groomsParty }) {
  const party = bridesParty.reduce((merged, member, index) => {
    return merged.concat(member).concat(groomsParty[index])
  }, [])
  const names = party.map((member, index) =>
    index + 1 === party.length ? `and ${member.name}` : member.name
  )
  return (
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
  )
}

export default WeddingParty
