const yup = require('yup')
const levenshtein = require('fast-levenshtein')

const log = require('./log')

const bodySchema = yup.object().shape({
  rsvps: yup.array(
    yup.object().shape({
      name: yup.string().required(),
      attending: yup.bool().required(),
    })
  ),
  name: yup.string().required(),
  email: yup.string().email(),
  comment: yup.string(),
})

exports.handler = async function handler(event) {
  const { name, comment, email, rsvps } = await bodySchema.validate(
    event.body || event
  )

  log.debug({
    name,
    comment,
    email,
    rsvps,
  })

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      success: true,
    }),
  }
}
