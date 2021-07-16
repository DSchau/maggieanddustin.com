import { toTheme } from '@theme-ui/typography'
import doelgerTheme from 'typography-theme-doelger'

doelgerTheme.headerFontFamily = ['BioRhyme', 'serif']

const typography = toTheme(doelgerTheme)

const lightModeColors = {
  accent: '#247BA0',
  text: '#000',
  background: '#fff',
  primary: '#30e3ca',
}

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
    ...lightModeColors,
    modes: {
      light: lightModeColors,
      dark: {
        accent: '#F3FFBD',
        text: '#fff',
        background: '#000',
        primary: '#30e3ca',
      },
      sepia: {
        accent: '#AFA19A',
        text: '#423434',
        background: '#F2ECDC',
        primary: '#D6CEBE',
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
