const yup = require('yup')
const Airtable = require('airtable')

const formSchema = yup.object().shape({
  attending: yup.bool(),
  email: yup.string(),
  name: yup.string().required(),
  guests: yup.string(),
  phone: yup.string().matches(/^[\d-\(\)\.]+$/)
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

const lookup = async (req, res, { db }) => {
  const guests = await getRecordsByName(db)('Maggie Alcorn')

  if (guests.length === 0) {
    return {
      statusCode: 200,
      message: 'Could not retrieve your record!'
    }
  }

  return {
    statusCode: 200,
    guests: guests.map(guest => guest.fields),
    debug: {
      query: req.query,
      req: Object.keys(req).reduce((merged, key) => {
        const value = req[key]
        if (typeof value === 'string') {
          merged[key] = value
        }
        return merged
      }, {})
    }
  }
}

const write = async (req, res, { db }) => {
  const body = await formSchema.validate(req.body)

  const guests = await getRecordsByName(db)(body.name)

  return {
    statusCode: 200,
    sucess: true,
    guests: guests.map(guest => guest.fields)
  }
}

const handlers = {
  GET: lookup,
  POST: write
}

const rsvpHandler = async (req, res) => {
  try {
    const handler = handlers[req.method]
    if (!handler) {
      return res.json({
        statusCode: 405,
        message: `${req.method} not supported`
      })
    }
    
    const json = await handler(req, res, { db })

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
