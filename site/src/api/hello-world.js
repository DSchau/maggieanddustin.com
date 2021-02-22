const twilio = require('twilio')

const client = twilio(process.env.GATSBY_TWILIO_ACCOUNT_SID, process.env.GATSBY_TWILIO_AUTH_TOKEN)

const message = async (req, res) => {
  try {
    await client.messages.create({
      body: `We've received your RSVP to the wedding! Thanks so much!`,
      messagingServiceSid: process.env.GATSBY_TWILIO_MESSAGING_SID,
      to: `+17122123001`
    })

    return res.json({
      success: true
    })
  } catch (e) {
    return res.json({
      success: false,
      message: e.stack
    })
  }


}

module.exports = message
