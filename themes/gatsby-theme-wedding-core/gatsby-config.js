const path = require('path')

module.exports = function config({ contentPath }) {
  if (!contentPath || !path.isAbsolute(contentPath)) {
    throw new Error(`contentPath must be an absolute path`)
  }
  return {
    siteMetadata: {
      title: `Wedding`,
    },
    plugins: [
      `gatsby-transformer-yaml`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `content`,
          path: contentPath,
        },
      },
    ],
  }
}
