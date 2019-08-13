/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useColorMode } from 'theme-ui'

export default ({ className }) => {
  const [colorMode, setColorMode] = useColorMode()
  return (
    <button
      className={className}
      sx={{
        bg: 'transparent',
        border: 'none',
        color: 'primary',
        padding: 's',
      }}
      onClick={() => {
        setColorMode(colorMode === 'light' ? 'dark' : 'light')
      }}
    >
      Lights {colorMode === 'light' ? 'Off' : 'On'}
    </button>
  )
}
