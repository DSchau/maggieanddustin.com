const yup = require('yup')
const getFirebase = require('./lib/firebase')

const formSchema = yup.object().shape({
  attending: yup.bool(),
  email: yup.string(),
  name: yup.string().required(),
  phone: yup.string().matches(/^[\d-\(\)\.]+$/)
})

const lookup = async (db) => {
  return {
    statusCode: 200,
    message: 'Looking up'
  }
}

const write = async (db) => {
  return {
    statusCode: 200,
    message: 'Writing'
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
    
    const db = getFirebase().firestore()
    
    const json = await handler(db)

    return res.json(json)
  } catch (e) {
   return res.json({
      statusCode: 500,
      message: e,
      stack: e.stack
    })
  }
}

module.exports = rsvpHandler
