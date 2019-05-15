module.exports = function config() {
  return {
    __experimentalThemes: [
      {
        resolve: `gatsby-theme-wedding-ui`,
        options: {}
      }
    ],
    plugins: [
      'gatsby-plugin-emotion'
    ]
  }
}
