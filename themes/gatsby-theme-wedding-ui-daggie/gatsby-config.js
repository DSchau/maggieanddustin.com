module.exports = function config() {
  return {
    plugins: [
      'gatsby-plugin-theme-ui',
      {
        resolve: `gatsby-theme-wedding-ui`,
        options: {},
      },
    ],
  }
}
