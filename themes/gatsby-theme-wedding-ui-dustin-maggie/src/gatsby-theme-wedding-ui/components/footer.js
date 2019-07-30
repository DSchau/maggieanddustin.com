/** @jsx jsx */
import { jsx } from 'theme-ui'

export default function Footer() {
  return (
    <footer
      sx={{
        bg: 'background',
        color: 'primary',
      }}
    >
      <p sx={{ color: 'primary' }}>
        Made with{' '}
        <span role="img" aria-label="Heart emoji">
          ❤️
        </span>{' '}
        by Dustin
      </p>
    </footer>
  )
}
