/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { SkipNavContent } from '@reach/skip-nav'

import { Button, Label, Input, Textarea } from '../../components/form'
import SEO from '../../components/seo'
import { useFirestore } from '../../utils/use-firestore'

function RSVPName({ params }) {
  const firestore = useFirestore()
  const [guests, setGuests] = useState([])
  useEffect(() => {
    /*
     * Get guests
     */
  }, [params.name])
  return (
    <>
    <SEO
      title="RSVP to the Wedding"
      description="Let us know if you're coming to the wedding of Maggie Alcorn and Dustin Schau with this RSVP form."
    />
    <SkipNavContent>
      <div
        sx={{
          maxWidth: ['100%', `60%`],
          margin: '0 auto',
          padding: [0, `1rem`],
        }}
      >
        <div sx={{ textAlign: 'center' }}>
        <Styled.h1
          sx={{
            fontSize: [30, 48],
            padding: [2, 4],
            mb: [2, 0],
            textTransform: `uppercase`,
          }}
        >
         Hello 👋
        </Styled.h1>
        <Styled.h2 sx={{ fontSize: [20, 24] }}>
          {params.name}
        </Styled.h2>
        </div>
      </div>
      </SkipNavContent>
      </>
  )
}

export default RSVPName
