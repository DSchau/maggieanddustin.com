const path = require('path')

module.exports = function config({ contentPath }) {
  return {
    plugins: [
      {
        resolve: `gatsby-theme-wedding-core`,
        options: {
          contentPath,
        },
      },
    ],
  }
}
