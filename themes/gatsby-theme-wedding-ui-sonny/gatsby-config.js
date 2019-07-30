module.exports = function config() {
  return {
    plugins: [
      'gatsby-plugin-emotion',
      {
        resolve: `gatsby-theme-wedding-ui`,
        options: {},
      },
    ],
  }
}
