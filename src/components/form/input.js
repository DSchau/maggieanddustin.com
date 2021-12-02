/** @jsx jsx */
import { jsx } from 'theme-ui'

function Input(props) {
  return (
    <input
      sx={{
        boxSizing: 'border-box',
        display: 'block',
        width: '100%',
        fontSize: 4,
        padding: 2,
      }}
      {...props}
    />
  )
}

Input.defaultProps = {
  type: `text`,
}

export { Input }
