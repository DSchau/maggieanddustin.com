import React from 'react'

import RSVPForm from 'gatsby-theme-wedding-ui-daggie/src/components/rsvp-form'

export default props => {
  return (
    <RSVPForm
      {...props}
      onNameSubmit={() => {
        return Promise.resolve({ test: true })
      }}
    />
  )
}
