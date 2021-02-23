const yup = require('yup')
const Airtable = require('airtable');
const { base } = require('airtable');

const formSchema = yup.object().shape({
  attending: yup.bool(),
  email: yup.string(),
  name: yup.string().required(),
  guests: yup.string(),
  phone: yup.string().matches(/^\+?[\d-\(\)\.]+$/),
  method: yup.string().oneOf(['lookup', 'update']).required()
})

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.GATSBY_AIRTABLE_KEY
});

const db = Airtable.base('appoCJPQnx8X2UV2A');

const getRecordsByName = db => {
  return name => {
    return db('Guests').select({
      maxRecords: 1,
      filterByFormula: `OR({Name} = '${name}', FIND('${name}', {Guests}) > 0)`
    }).firstPage()
  }
}

const lookup = async (req, res, { db, body }) => {
  const guests = await getRecordsByName(db)(body.name)

  if (guests.length === 0) {
    return {
      statusCode: 200,
      message: 'Could not retrieve your record!'
    }
  }

  return {
    statusCode: 200,
    guests: guests.map(guest => guest.fields),
  }
}

const update = async (req, res, { db, body }) => {
  const guests = await getRecordsByName(db)(body.name)

  await db('Guests').update(
    guests.map(guest => {
      return {
        id: guest.id,
        fields: {
          RSVP: body.attending,
          Phone: body.phone,
          Email: body.email
        }
      }
    })
  )

  return {
    statusCode: 200,
    sucess: true,
    guests: guests.map(guest => guest.fields)
  }
}

const handlers = {
  lookup,
  update
}

const rsvpHandler = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.json({
        statusCode: 405,
        message: `${req.method} not supported`
      })
    }

    const body = await formSchema.validate(req.body)

    const handler = handlers[body.method]
    
    const json = await handler(req, res, { db, body })

    return res.json(json)
  } catch (e) {
   return res.json({
      statusCode: 500,
      message: e,
      stack: e.stack,
      debug: {
        body: req.body
      }
    })
  }
}

module.exports = rsvpHandler
