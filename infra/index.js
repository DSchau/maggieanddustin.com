const pify = require('pify')
const yup = require('yup')
const format = require('date-fns/format')
const levenshtein = require('fast-levenshtein')

const getApi = require('./api')
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
  comment: yup.string()
})

const formatResponse = guests => ({
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    rsvps: guests.map(guest => ({
      ...guest,
      attending: guest.attending === `TRUE`
    }))
  }),
})

exports.handler = async function handler(event) {
  log.debug(event)

  const { name, comment, email, rsvps } = await bodySchema.validate(event.body || event)

  log.debug({ name, comment, email, rsvps })

  const api = await getApi({
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY,
    spreadsheet_id: process.env.SPREADSHEET_ID,
    spreadsheet_title: process.env.SPREADSHEET_TITLE
  })

  const rows = await api.getRows()

  const partyIds = rows.reduce((merged, row) => {
    if (!merged[row.uuid]) {
      merged[row.uuid] = []
    }
    merged[row.uuid].push(row)
    return merged
  }, {})

  const guest = rows.find(row => (
    row.guest === name ||
    levenshtein.get(row.guest, name) === 1
  ))

  const guests = partyIds[guest.uuid]

  if (!invitee) {
    throw new Error(
      'Could not find a guest with that name. Maybe you meant: TODO: invitee name'
    )
  }

  log.debug(invitee)

  if (!rsvps) {
    return formatResponse(guests)
  }

  await Promise.all(
    guests.map(guest => {
      
    })
  )

  const now = format(new Date(), 'YYYY/MM/DD')

  log.debug({ message: `Saving guest and invitee`, invitee })

  await pify(invitee.save)()

  return formatResponse(invitee)
}
