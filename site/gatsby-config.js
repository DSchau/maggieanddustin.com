const path = require('path')

module.exports = {
  siteMetadata: {
    title: `Maggie and Dustin`,
    description: `Landing page for the wedding of Dustin Schau and Maggie Alcorn`,
    author: `schaudustin`,
    siteUrl: process.env.DEPLOY_URL || 'https://proposal.maggieanddustin.com',
    social: {
      facebook: [''],
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `..`, `content`, `images`),
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-theme-wedding`,
      options: {},
    },
    {
      resolve: `gatsby-theme-wedding-ui-sonny`,
      options: {},
    },
  ],
}
