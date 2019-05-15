module.exports = function config({ adapter }) {
  return {
    siteMetadata: {
      title: `Wedding`
    },
    __experimentalThemes: [
      {
        resolve: `gatsby-theme-wedding-core`
      }
    ],
    plugins: []
  }
}
