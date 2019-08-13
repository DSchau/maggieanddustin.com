import React from 'react'

export default function Registry(props) {
  return (
    <>
      <h1>Please shadow the following:</h1>
      <pre>
        {`
src/
  gatsby-theme-wedding-ui/
    components/
      registry.js      
      `.trim()}
      </pre>
      <pre>{JSON.stringify({ props }, null, 2)}</pre>
    </>
  )
}
