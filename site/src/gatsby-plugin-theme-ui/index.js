export default {
  animation: {
    ease: '175ms ease-in-out',
  },
  breakpoints: ['40em', '56em', '64em'],
  space: [0, 4, 6, 8, 12],

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
    button: {
      backgroundColor: 'transparent',
      border: 'none',
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
