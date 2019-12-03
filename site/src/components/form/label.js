/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

function Label(props) {
  return (
    <label
      sx={{
        boxSizing: 'border-box',
        display: 'block',
        fontWeight: `bold`,
        mt: 2,
        mb: 2,
      }}
      {...props}
    />
  )
}

Label.propTypes = {
  for: PropTypes.string.isRequired,
}

export { Label }
