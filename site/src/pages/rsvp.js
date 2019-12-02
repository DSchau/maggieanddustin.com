/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React, { useState } from 'react'
import { Formik, validateYupSchema } from 'formik'
import * as yup from 'yup'

import Layout from '../components/layout/'
import { Button, Label, Input } from '../components/form'

const formSchema = yup.object().shape({
  attending: yup.bool(),
  email: yup.string().email(),
  name: yup.string().required(),
  guest: yup.string(),
})

const formHandler = (step, actions) => {
  switch (step) {
    case 'INITIAL_NAME':
      return async (values, formik) => {
        // TODO: look up guest/attending status
        formik.setValues({
          ...values,
          guest: `Tina Whatever`,
        })
        actions.setStep('GUEST_AND_RSVP')
      }
    case 'GUEST_AND_RSVP':
      return async props => {
        // TODO: submit form
        actions.setStep('SUBMITTED')
      }
    default:
      return () => {}
  }
}

// TODO: show errors
function RSVP() {
  const [step, setStep] = useState('INITIAL_NAME')
  return (
    <Layout>
      <div
        sx={{
          maxWidth: '100%',
          margin: '0 auto',
          '@media only screen and (min-width: 768px)': {
            padding: '1rem',
            maxWidth: '60%',
          },
        }}
      >
        <Styled.h1>Let us know if you're coming!</Styled.h1>
        {step === 'SUBMITTED' ? (
          <Styled.h2>Got it. Thanks!</Styled.h2>
        ) : (
          <Formik
            initialValues={{
              attending: false,
              email: '',
              name: '',
              guest: '',
            }}
            validationSchema={formSchema}
            onSubmit={formHandler(step, { setStep })}
            children={({ handleBlur, handleChange, handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <Label for="name">
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
                <Label for="email">
                  Email (optional)
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </Label>
                {step === `GUEST_AND_RSVP` && (
                  <React.Fragment>
                    {values.guest && (
                      <Label for="guest">
                        Guest?
                        <Input
                          type="text"
                          name="guest"
                          id="guest"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.guest}
                        />
                      </Label>
                    )}
                    <Label for="attending">
                      Attending
                      <input
                        type="checkbox"
                        name="attending"
                        id="attending"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.attending}
                      />
                    </Label>
                  </React.Fragment>
                )}

                <Button type="submit">
                  {step === 'INITIAL_NAME' ? 'Next' : 'Submit'}
                </Button>
              </form>
            )}
          />
        )}
      </div>
    </Layout>
  )
}

export default RSVP
