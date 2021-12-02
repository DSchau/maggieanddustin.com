/** @jsx jsx */
import { jsx } from 'theme-ui'

export default (props) => (
  <button
    sx={{
      color: 'text',
      backgroundColor: 'background',
      border: 'none',
      padding: 2,
    }}
    {...props}
  />
)
