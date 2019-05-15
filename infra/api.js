const GoogleSpreadsheet = require('google-spreadsheet')
const pify = require('pify')
const yup = require('yup')

const apiSchema = yup.object().shape({
  private_key: yup
    .string()
    .transform(value => value.replace(/\\n/g, '\n'))
    .required(),
  client_email: yup
    .string()
    .email()
    .required(),
  spreadsheet_id: yup.string().required(),
})

module.exports = async function api(opts) {
  const normalizedOpts = await apiSchema.validate(opts)

  const sheet = new GoogleSpreadsheet(opts.spreadsheet_id)

  await pify(sheet.useServiceAccountAuth)(normalizedOpts)

  const { worksheets } = await pify(sheet.getInfo)()

  const rsvp = worksheets.find(sheet => sheet.title === 'RSVPs')

  return pify(rsvp)
}
