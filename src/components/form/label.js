/** @jsx jsx */
import { jsx } from 'theme-ui'
import PropTypes from 'prop-types'

/* eslint-disable */
function Label(props) {
  return (
    <label
      sx={{
        boxSizing: 'border-box',
        display: 'inline-block',
        fontWeight: `bold`,
        fontSize: 4,
        mt: 2,
        mb: 2,
      }}
      {...props}
    />
  )
}
/* eslint-enable */

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
}

export { Label }
