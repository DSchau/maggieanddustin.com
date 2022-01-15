const fetch = require('node-fetch')

const cities = [
  'Barcelona, Spain',
  'Sangkat Svaydangkum Neelka Way Krong Siem Reap, 17000, Cambodia',
  'Bangkok, Thailand',
  'Granada, Spain',
  'San Francisco, CA',
  '555 Kaukahi St, Wailea, HI 96753',
  'Ida Grove, IA',
  'Minneapolis, MN',
  'Kaufmann St 12, Tel Aviv-Yafo, 61501, Israel',
]

async function run() {
  const points = []
  for (let city of cities) {
    const data = await fetch(
      `http://localhost:8000/api/geoposition?q=${city}`
    ).then((res) => res.json())

    points.push({
      location: [data.address.latitude, data.address.longitude],
      size: 0.05,
    })
  }

  console.log(points)
}

run()
