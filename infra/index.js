const pify = require('pify')
const yup = require('yup')
const format = require('date-fns/format')

const getApi = require('./api')
const log = require('./log')

const bodyScheam = yup.object().shape({
  rsvps: yup.array(yup.object().shape({
    name: yup.string().required(),
    attending: yup.bool().required()
  })),
  name: yup.string().required()
})

const formatInvitee = invitee => ({
  statusCode: 200,
  body: JSON.stringify({
    name: invitee.name,
    guest: invitee.guest,
    attending: invitee.attending
  })
})

exports.handler = async function handler(event, context) {
  log.debug({ event, context })
  const { name, rsvps } = await bodyScheam.validate(JSON.parse(event.body))

  log.debug({ name, rsvps })

  const api = await getApi({
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY,
    spreadsheet_id: process.env.SPREADSHEET_ID
  })

  const rows = await api.getRows()

  log.debug(`Found ${rows.length} rows`)

  const invitee = rows.find(row => [row.invitee.name, row.invitee.guest].includes(name))

  log.debug(invitee)

  if (!invitee) {
    log.error({ message: `Unknown invitee`, name })
    throw new Error('Could not find a guest with that name. Maybe you meant: TODO: invitee name')
  }

  if (!rsvps) {
    return formatInvitee(invitee)
  }

  const now = format(new Date(), 'YYYY-MM-DD')

  if (!invitee.responddate) {
    invitee.responddate = now
  }

  const [main, guest = {}] = rsvps

  invitee.lasteditdate = now
  invitee.attending = main.attending

  if (guest && !guest.attending) {
    invitee.guest = guest.name
  }

  log.debug({ message: `Saving guest and invitee`, invitee })

  await pify(invitee.save)()

  return formatInvitee(invitee)
}
