/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui'
import { FaMoon, FaSun } from 'react-icons/fa'

import Button from './button'

export default props => {
  const [mode, setMode] = useColorMode('light')
  const Icon = mode === 'dark' ? FaSun : FaMoon
  return (
    <Button
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      {...props}
    >
      <Icon sx={{ color: 'text' }} size={24} />
    </Button>
  )
}
