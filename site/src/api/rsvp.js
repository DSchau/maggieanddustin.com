const yup = require('yup')

const formSchema = yup.object().shape({
  attending: yup.bool(),
  email: yup.string(),
  name: yup.string().required(),
  phone: yup.string().matches(/^[\d-\(\)\.]+$/)
})

const rsvpHandler = async (req, res) => {
  return res.json({
    success: true
  })
}

module.exports = rsvpHandler
