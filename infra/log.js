const bunyan = require('bunyan')

module.exports = bunyan.createLogger({
  name: 'rsvp-handler',
  level: process.env.LOG_LEVEL || 'info',
})
