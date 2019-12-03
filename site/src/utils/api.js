const API_URL = `https://ej5di6knne.execute-api.us-east-1.amazonaws.com/production`

export const api = body => {
  return fetch(API_URL, {
    method: `POST`,
    body: JSON.stringify(body),
  }).then(res => {
    if (res.ok) {
      return res.json()
    }
    return res
  })
}
