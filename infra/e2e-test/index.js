const getApi = require('../api')

async function test() {
  const api = await getApi({
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    spreadsheet_id: process.env.SPREADSHEET_ID,
  })

  const rows = await api.getRows()
}

test()
