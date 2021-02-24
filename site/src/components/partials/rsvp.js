/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React, { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

import { Button, Label, Input, Textarea } from '../form/index'
import { rsvp } from '../../utils/api'

const formSchema = yup.object().shape({
  name: yup.string().required(),
  guests: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      attending: yup.bool().required(),
    })
  ),
})

const formHandler = (step, actions) => {
  switch (step) {
    case 'INITIAL_NAME':
      return async (values, formik) => {
        formik.setSubmitting(true)
        const data = await rsvp({
          name: values.name,
          method: 'lookup'
        })

        const guests = data.guests.reduce((merged, guest) => {
          return merged.concat([
            {
              name: guest.Name,
              attending: guest.Attending || false
            }
          ].concat(guest.Guests ? guest.Guests.split(/,\s*/).map(additional => ({
            name: additional.trim(),
            attending: guest.Attending || false
          })): []))
        }, [])
        // TODO: error state?
        formik.setValues({
          ...values,
          guests
        })
        actions.setStep('GUEST_AND_RSVP')
        formik.setSubmitting(false)
      }
    case 'GUEST_AND_RSVP':
      return async (values, formik) => {
        formik.setSubmitting(true)
        
        await rsvp({
          name: values.name,
          // this is naive
          // presumes that one guest attending means they all are
          attending: values.guests.some(guest => guest.attending),
          phone: values.phone,
          email: values.email,
          method: 'update'
        })

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
  }
}

// TODO: show errors
function RSVP({ children, content }) {
  const [step, setStep] = useState('INITIAL_NAME')
  return (
    <React.Fragment>
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
              phone: '',
              name: '',
              guests: [],
            }}
            validationSchema={formSchema}
            onSubmit={formHandler(step, { setStep })}
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
                    <Label htmlFor="phone">
                      Phone # (We'll text you updates, if you provide this!)
                      <Input
                        name="phone"
                        id="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
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
      {children}
      {content}
    </React.Fragment>
  )
}

export default RSVP