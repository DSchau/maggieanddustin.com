/** @jsx jsx */
import { jsx } from 'theme-ui'

function Button(props) {
  return (
    <button
      sx={{
        backgroundColor: 'text',
        color: `background`,
        border: `2px solid transparent`,
        fontSize: [3, 4, 5],
        padding: [1, 2, 3],
        mt: [1, 2],
        mb: [1, 2],
        width: '100%',
        ':hover, :active': {
          borderColor: `accent`,
        },
      }}
      {...props}
    />
  )
}

Button.defaultProps = {
  type: `submit`,
}

export { Button }
