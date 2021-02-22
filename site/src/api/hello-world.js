const twilio = require('twilio')

const client = twilio(process.env.GATSBY_TWILIO_ACCOUNT_SID, process.env.GATSBY_TWILIO_AUTH_TOKEN)

const message = async (req, res) => {
  await client.messages.create({
    body: `Hello World`,
    messagingServiceSid: process.env.GATSBY_TWILIO_MESSAGING_SID,
    to: `7122123001`
  })

  return res.json({
    success: true,
  })
}

module.exports = message
