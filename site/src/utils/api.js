import fetch from 'unfetch'

const BASE = `/api/`

export const rsvp = body => {
  return fetch(`${BASE}/rsvp${process.env.NODE_ENV === `production` ? '.js' : ''}`, {
    method: `POST`,
    body: JSON.stringify(body)
  })
}
