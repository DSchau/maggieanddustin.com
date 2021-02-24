import fetch from 'unfetch'

const BASE = `/functions`

export const rsvp = body => {
  return fetch(`${BASE}/rsvp${process.env.NODE_ENV === `production` ? '.js' : ''}`, {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
}
