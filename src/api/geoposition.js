import fetch from 'node-fetch'

// TODO: Figure out why this doesn't work
const {
  RADAR_API_KEY = 'prj_live_sk_eaf730344f8498867ef243f06e22254c386df49d',
} = process.env

export default async (req, res) => {
  const { q } = req.query

  if (!RADAR_API_KEY) {
    return res.status(401).json({
      message: 'Please re-deploy this site with a RADAR_API_KEY',
    })
  }

  const data = await fetch(
    `https://api.radar.io/v1/geocode/forward?query=${q}`,
    {
      headers: {
        Authorization: RADAR_API_KEY,
      },
    }
  ).then((res) => res.json())

  const address = (data.addresses || []).find(
    (address) => address.latitude && address.longitude
  )

  return res.status(200).json({
    address,
  })
}
