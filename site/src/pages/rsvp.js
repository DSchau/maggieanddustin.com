/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'

import Layout from '../components/layout/'
import { Button, Input } from '../components/form'

const formSchema = yup.object().shape({
  attending: yup.bool(),
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
      {step === 'SUBMITTED' ? (
        <h1>Got it. Thanks!</h1>
      ) : (
        <Formik
          initialValues={{
            attending: false,
            name: '',
            guest: '',
          }}
          validationSchema={formSchema}
          onSubmit={formHandler(step, { setStep })}
          children={({ handleBlur, handleChange, handleSubmit, values }) => (
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {values.guest && (
                <Input
                  type="text"
                  name="guest"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.guest}
                />
              )}
              <Button type="submit">
                {step === 'INITIAL_NAME' ? 'Register' : 'RSVP'}
              </Button>
            </form>
          )}
        />
      )}
    </Layout>
  )
}

export default RSVP
