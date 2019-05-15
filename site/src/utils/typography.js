import Typography from 'typography'

const fontFamily = ['Raleway', 'sans-serif']

const theme = {
  headerFontFamily: fontFamily,
  bodyFontFamily: fontFamily,
  googleFonts: [
    {
      name: 'Raleway',
      styles: ['900', '100'],
    },
    {
      name: 'Cabin Condensed',
      styles: ['400', '700'],
    },
  ],
}

export default new Typography(theme)
