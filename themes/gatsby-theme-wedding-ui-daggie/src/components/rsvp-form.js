import React, { useState } from 'react'
import { Field, Formik, ErrorMessage } from 'formik'
import * as yup from 'yup'

const rsvpSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/[\w-]+\s[\w-]+/)
    .required('Full name is required'),
})

export default ({ onNameSubmit }) => {
  const [formDetails, setFormDetails] = useState({})
  return (
    <>
      {Object.keys(formDetails).length > 0 ? null : (
        <Formik
          initialValues={{ name: '' }}
          onSubmit={(...args) => {
            return onNameSubmit(...args).then(response => {
              setFormDetails(response)
            })
          }}
          validationSchema={rsvpSchema}
        >
          {formikProps => (
            <form onSubmit={formikProps.handleSubmit}>
              <Field type="text" name="name" placeholder="Full name" />
              <ErrorMessage name="name" />
              <button type="submit">Submit</button>
            </form>
          )}
        </Formik>
      )}
    </>
  )
}
