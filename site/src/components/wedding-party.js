/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'

import Person from './person'

const filter = (people, customFilterFn) => people.filter(customFilterFn)

function WeddingParty({ bridesParty, groomsParty }) {
  const peeps = bridesParty.reduce((merged, member, index) => {
    return merged
      .concat({
        ...member,
        bride: true,
      })
      .concat({
        ...groomsParty[index],
        groom: true,
      })
  }, [])
  const [party, setParty] = useState(peeps)
  return (
    <div>
      {process.env.GATSBY_USE_WEDDING_PARTY_FORM === `true` && (
        <form onSubmit={ev => ev.preventDefault()}>
          <input
            type="text"
            onChange={ev => {
              const value = ev.target.value
              setParty(
                filter(peeps, person =>
                  value ? new RegExp(value, `i`).test(person.name) : true
                )
              )
            }}
          />
          <button
            onClick={() =>
              setParty(filter(peeps, person => person.bride === true))
            }
          >
            Bridesmaids
          </button>
          <button
            onClick={() =>
              setParty(filter(peeps, person => person.groom === true))
            }
          >
            Groomsman
          </button>
          <button type="reset" onClick={() => setParty(peeps)}>
            Reset
          </button>
        </form>
      )}
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
    </div>
  )
}

export default WeddingParty
