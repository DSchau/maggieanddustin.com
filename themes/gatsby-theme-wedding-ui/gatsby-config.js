const path = require('path')

module.exports = function config() {
  return {
    plugins: [
      {
        resolve: `gatsby-plugin-page-creator`,
        options: {
          path: path.join(__dirname, 'src', 'pages'),
        },
      },
    ]
  }
}
