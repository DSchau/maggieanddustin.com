const pify = require('pify')
const yup = require('yup')
const format = require('date-fns/format')
const levenshtein = require('fast-levenshtein')

const getApi = require('./api')
const log = require('./log')

const bodyScheam = yup.object().shape({
  rsvps: yup.array(
    yup.object().shape({
      name: yup.string().required(),
      attending: yup.bool().required(),
    })
  ),
  name: yup.string().required(),
})

const formatInvitee = invitee => ({
  statusCode: 200,
  body: {
    name: invitee.invitee,
    guest: invitee.guest,
    attending: invitee.attending,
  },
})

exports.handler = async function handler(event) {
  log.debug(event)

  const { name, rsvps } = await bodyScheam.validate(event.body || event)

  log.debug({ name, rsvps })

  const api = await getApi({
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY,
    spreadsheet_id: process.env.SPREADSHEET_ID,
  })

  const rows = await api.getRows()

  const invitee = rows.find(row => {
    const names = [row.invitee, row.guest]
    return (
      names.includes(name) ||
      names.some(guestName => levenshtein.get(guestName, name) === 1)
    )
  })

  if (!invitee) {
    throw new Error(
      'Could not find a guest with that name. Maybe you meant: TODO: invitee name'
    )
  }

  log.debug(invitee)

  if (!rsvps) {
    return formatInvitee(invitee)
  }

  const now = format(new Date(), 'YYYY-MM-DD')

  if (!invitee.responddate) {
    invitee.responddate = now
  }

  const [main, guest = false] = rsvps

  invitee.lasteditdate = now
  invitee.attending = main.attending

  if (guest) {
    invitee.guest = guest.attending ? guest.name : ``
  }

  log.debug({ message: `Saving guest and invitee`, invitee })

  await pify(invitee.save)()

  return formatInvitee(invitee)
}
