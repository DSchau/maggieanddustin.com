import { toTheme } from '@theme-ui/typography'
import typographyTheme from 'typography-theme-moraga'

const typography = toTheme(typographyTheme)

export default {
  ...typography,
  initialColorMode: 'light',
  useCustomProperties: true,
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#07c',
    modes: {
      dark: {
        text: '#fff',
        background: '#000',
        primary: '#0cf',
      },
    },
  },
  styles: {
    h1: {
      fontFamily: 'body',
    },
  },
}
