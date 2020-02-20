require('dotenv').config()
const client = require('twilio')(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
)
const commonTags = require('common-tags')

client.messages
  .create({
    body: commonTags.stripIndent`
❤️💒❤️💒❤️💒❤️💒

✉️ Save the date! ✉️

August 8th, 2020

Maggie and Dustin are delighted to invite you to their wedding.

The ceremony begins at 12PM.

Please text YES if you will be attending or NO if you will not be able to attend.

For more details, please visit https://maggieanddustin.com

❤️💒❤️💒❤️💒❤️💒
     `,
    from: '+12014196845',
    to: '+16126189526',
  })
  .then(message => console.log(message.sid))
  .catch(e => console.error(e))
