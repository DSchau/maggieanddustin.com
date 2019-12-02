/** @jsx jsx */
import { jsx } from 'theme-ui'

function Button(props) {
  return (
    <button
      sx={{
        backgroundColor: 'primary',
        color: `text`,
        fontSize: 5,
        padding: 3,
        width: '100%',
      }}
      {...props}
    />
  )
}

Button.defaultProps = {
  type: `submit`,
}

export { Button }
