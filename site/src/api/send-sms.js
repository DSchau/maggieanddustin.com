const twilio = require('twilio')
const yup = require('yup')

const client = twilio(process.env.GATSBY_TWILIO_ACCOUNT_SID, process.env.GATSBY_TWILIO_AUTH_TOKEN)

const bodySchema = yup.object().shape({
  message: yup.string().required(),
  to: yup.string().required()
})

const sendSMS = async (req, res) => {
  if (req.method !== 'POST') {
    return req.json({
      statusCode: 405,
      message: 'Please send a POST request'
    })
  }
  try {
    /*
     * TODO: validate auth/bearer tokens
     */
    const { message, to } = await bodySchema.validate(req.body)
    const { sid } = await client.messages.create({
      body: message,
      messagingServiceSid: process.env.GATSBY_TWILIO_MESSAGING_SID,
      to
    })

    return res.json({
      success: true,
      sid
    })
  } catch (e) {
    return res.json({
      statusCode: 500,
      message: e
    })
  }
}

module.exports = sendSMS
