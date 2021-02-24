/** @jsx jsx */
import { jsx } from 'theme-ui'

function Button(props) {
  return (
    <button
      sx={{
        backgroundColor: 'text',
        color: `background`,
        border: `2px solid transparent`,
        fontSize: 5,
        padding: 3,
        mt: 2,
        mb: 2,
        width: '100%',
        ':hover, :active': {
          borderColor: `accent`
        } 
      }}
      {...props}
    />
  )
}

Button.defaultProps = {
  type: `submit`,
}

export { Button }
