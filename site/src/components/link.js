/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'

export default props => (
  <Link
    {...props}
    activeClassName="active"
    sx={{
      color: 'text',
      opacity: 0.8,
      textDecoration: 'none',
      transition: 'transition.ease',
      p: 2,
      borderBottomWidth: 4,
      borderBottomStyle: `solid`,
      borderBottomColor: `transparent`,
      '&:hover': {
        color: 'primary',
        opacity: 1,
        borderColor: 'primary',
      },
      '&.active': {
        color: 'primary',
        opacity: 1,
        borderColor: 'primary',
      },
    }}
  />
)
