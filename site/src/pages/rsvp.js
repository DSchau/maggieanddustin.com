/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import { SkipNavContent } from '@reach/skip-nav'

import { Button, Label, Input, Textarea } from '../components/form'
import SEO from '../components/seo'
import { useFirestore } from '../utils/use-firestore'
// import { api } from '../utils/api'

const formSchema = yup.object().shape({
  name: yup.string().required(),
  guests: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      attending: yup.bool().required(),
    })
  ),
})

const formHandler = (step, actions, { db }) => {
  switch (step) {
    case 'INITIAL_NAME':
      return async (values, formik) => {
        formik.setSubmitting(true)
        const guest = await db.collection('guests').where('name', '==', values.name)
          .get()
          .then(collection => {
            let data = []
            collection.forEach(snap => {
              data.push(snap.data())
            })
            return data
          })
        console.log(guest)
        await new Promise(resolve => setTimeout(resolve, 2500))
        // TODO: look up guest/attending status
        formik.setValues({
          ...values,
          guests: [
            {
              name: values.name,
              attending: false, // TODO: lookup
            },
            {
              name: `Cindy Rust`,
              attending: false,
            },
            {
              name: `Randy Rust`,
              attending: false,
            },
          ],
        })
        actions.setStep('GUEST_AND_RSVP')
        formik.setSubmitting(false)
      }
    case 'GUEST_AND_RSVP':
      return async (_, formik) => {
        formik.setSubmitting(true)
        await new Promise(resolve => setTimeout(resolve, 2500))
        // await api({
        //   ...values,
        //   rsvps: [values.name, values.guest].filter(Boolean).map(name => ({
        //     name,
        //     attending: values.attending,
        //   })),
        // })
        // TODO: submit form
        actions.setStep('SUBMITTED')
        formik.setSubmitting(false)
      }
    default:
      return () => {}
  }
}

const getButtonText = (step, { isSubmitting }) => {
  switch (step) {
    case 'INITIAL_NAME':
      return isSubmitting ? 'Finding...' : 'Find your RSVP'
    case 'GUEST_AND_RSVP':
      return isSubmitting ? 'Updating RSVP...' : 'Submit'
    default:
      return null
  }
}

// TODO: show errors
function RSVP() {
  const [step, setStep] = useState('INITIAL_NAME')
  const firestore = useFirestore()
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
          <Styled.h1>Let us know if you're coming!</Styled.h1>
          {step === 'SUBMITTED' ? (
            <Styled.h2>Got it. Thanks!</Styled.h2>
          ) : (
            <Formik
              initialValues={{
                email: '',
                name: '',
                comment: '',
                guests: [],
              }}
              validationSchema={formSchema}
              onSubmit={formHandler(step, { setStep }, { db: firestore })}
              children={({
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  {step === `INITIAL_NAME` && (
                    <Label htmlFor="name">
                      Full name
                      <Input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                    </Label>
                  )}
                  {step === `GUEST_AND_RSVP` && (
                    <React.Fragment>
                      {values.guests.map((guest, index) => (
                        <React.Fragment key={guest.name}>
                          <Label htmlFor={`${guest.name}-attending`}>
                            <Input
                              type="checkbox"
                              sx={{ display: `inline-block`, width: `auto` }}
                              name={`${guest.name}-attending`}
                              id={`${guest.name}-attending`}
                              checked={guest.attending}
                              onChange={() =>
                                setFieldValue(
                                  `guests[${index}].attending`,
                                  !values.guests[index].attending
                                )
                              }
                            />
                            {guest.name}
                          </Label>
                        </React.Fragment>
                      ))}
                      <Label htmlFor="comment">
                        Comment (optional)
                        <Textarea
                          name="comment"
                          id="comment"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.comment}
                        />
                      </Label>
                    </React.Fragment>
                  )}

                  <Button type="submit" disabled={isSubmitting}>
                    {getButtonText(step, { isSubmitting })}
                  </Button>
                </form>
              )}
            />
          )}
        </div>
      </SkipNavContent>
    </>
  )
}

export default RSVP
