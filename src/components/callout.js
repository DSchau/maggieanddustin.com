/** @jsx jsx */
import { jsx } from 'theme-ui'

export default function Callout(props) {
  return (
    <div
      sx={{
        color: 'text',
        backgroundColor: 'background',
        border: 'none',
        padding: 2,
      }}
      {...props}
    />
  )
}
