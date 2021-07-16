/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { useState } from 'react'

import Person from './person'

const filter = (people, customFilterFn) => people.filter(customFilterFn)

const Group = ({ persons }) => (
  <div
    sx={{
      display: 'grid',
      gridTemplateColumns: ['1fr', null, 'repeat(2, 1fr)'],
      maxWidth: ['100%', '85%'],
      margin: '0 auto',
    }}
  >
    {persons.map((person) => (
      <Person
        sx={{ mt: [2, null, 4], mb: [2, null, 4], ml: 4, mr: 4 }}
        key={person.name}
        {...person}
      />
    ))}
  </div>
)

function WeddingParty({ bridesParty, groomsParty, parents }) {
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
        <form onSubmit={(ev) => ev.preventDefault()}>
          <input
            type="text"
            onChange={(ev) => {
              const value = ev.target.value
              setParty(
                filter(peeps, (person) =>
                  value ? new RegExp(value, `i`).test(person.name) : true
                )
              )
            }}
          />
          <button
            onClick={() =>
              setParty(filter(peeps, (person) => person.bride === true))
            }
          >
            Bridesmaids
          </button>
          <button
            onClick={() =>
              setParty(filter(peeps, (person) => person.groom === true))
            }
          >
            Groomsman
          </button>
          <button type="reset" onClick={() => setParty(peeps)}>
            Reset
          </button>
        </form>
      )}
      <Group persons={party} />
      <Styled.hr
        sx={{
          maxWidth: ['100%', '85%'],
          margin: '0 auto',
          backgroundColor: '#eee',
          height: 1,
          border: 'none',
        }}
      />
      <Group
        persons={parents.map((parent) =>
          Object.assign({}, parent, { parent: true })
        )}
      />
    </div>
  )
}

export default WeddingParty
