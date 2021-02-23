const admin = require('firebase-admin')

let instance

const getFirebase = (cert = process.env.GATSBY_FIREBASE_CREDENTIALS) => {
  if (!instance) {
    instance = admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(cert)),
      databaseURL: `https://maggie-and-dustin.firebaseio.com`
    })
  }
  return instance
}

module.exports = getFirebase
