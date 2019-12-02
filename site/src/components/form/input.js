/** @jsx jsx */
import { jsx } from 'theme-ui'

function Input(props) {
  return (
    <input
      sx={{
        display: 'block',
        width: '100%',
        fontSize: 4,
        padding: 3,
      }}
      {...props}
    />
  )
}

Input.defaultProps = {
  type: `text`,
}

export { Input }
