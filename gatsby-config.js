require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `Oli Dias - Travelblog and Photography`,
    siteUrl: `https://blog.olidias.ch`,
    description: `Modern travelblog and photography website developed and maintained by Oli Dias.`,
    image: './favicon-32x32.png',
  },
  plugins: [
    {
      resolve: `gatsby-source-datocms`,

      options: {
        // You can find your read-only API token under the Settings > API tokens
        // section of your administrative area. Make sure to grant both CDA and CMA permissions.
        apiToken: process.env.DATOCMS_READONLY_APIKEY,

        // The project environment to read from. Defaults to the primary environment:
        environment: `main`,

        // If you are working on development/staging environment, you might want to
        // preview the latest version of records instead of the published one:
        previewMode: false,

        // Disable automatic reloading of content when some change occurs on DatoCMS:
        disableLiveReload: false,

        // Custom API base URL (you probably don't need this!)
        // apiUrl: 'https://site-api.datocms.com',

        // Limits page size and can be used to avoid build timeouts.
        // Default is 500 (also the maximum)
        pageSize: 500,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/articles`,
        name: "pages"
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/styles/assets/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-postcss`,
  ]
}