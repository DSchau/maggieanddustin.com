import { toTheme } from '@theme-ui/typography'
import doelgerTheme from 'typography-theme-doelger'

doelgerTheme.headerFontFamily = ['BioRhyme', 'serif']

const typography = toTheme(doelgerTheme)

export default {
  ...typography,
  fonts: {
    ...typography.fonts,
    cursive: `Baskerville, 'Goudy Old Style', Palatino, 'Book Antiqua', serif`,
  },
  transitions: {
    ease: '1s ease-in-out',
    bg: 'background 0.25s ease-in-out, color 0.25s ease-in-out',
  },
  breakpoints: ['40em', '56em', '64em'],

  initialColorMode: 'light',
  useCustomProperties: true,
  colors: {
    accent: '#f9ed69',
    text: '#000',
    background: '#fff',
    primary: '#30e3ca',
    modes: {
      dark: {
        accent: '#f9ed69',
        text: '#fff',
        background: '#000',
        primary: '#30e3ca',
      },
    },
  },

  styles: {
    ...typography.styles,
    button: {
      backgroundColor: 'transparent',
      border: 'none',
    },
    root: {
      ...typography.styles.root,
      backgroundColor: 'background',
      color: 'text',
      transition: 'background 0.25s ease-in-out, color 0.25s ease-in-out',
      height: '100%',
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      display: 'inline-block',
      listStyleType: `none`,
    },
  },
}
