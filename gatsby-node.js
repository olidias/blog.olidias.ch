const path = require("path")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  // Resolve templates
  const blogPostTemplate = path.resolve(`src/pages/articles/article-template.js`)
  const tripTemplate = path.resolve(`src/pages/trips/trip-template.js`)

  // Run queries in parallel
  const [articlesResult, tripsResult] = await Promise.all([
    // Query for articles
    graphql(`
      {
        allArticles: allDatoCmsArticle {
          edges {
            node {
              slug
              tripReference {
                tripId
              }
            }
            previous {
              slug
            }
            next {
              slug
            }
          }
        }
      }
    `),
    // Query for trips
    graphql(`
      {
        allTrips: allDatoCmsTrip {
          nodes {
            id
            tripId
            title
          }
        }
      }
    `)
  ])

  // Handle errors
  if (articlesResult.errors || tripsResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL queries.`)
    return
  }

  // Create article pages
  articlesResult.data.allArticles.edges.forEach(({ node, previous, next }) => {
    createPage({
      path: `articles/${node.slug}`,
      component: blogPostTemplate,
      context: {
        slug: node.slug,
        previousSlug: previous?.slug,
        nextSlug: next?.slug,
        // Pass tripId to the article template if it belongs to a trip
        ...(node.tripReference && { tripId: node.tripReference.tripId })
      }
    })
  })

  // Create trip pages
  tripsResult.data.allTrips.nodes.forEach(trip => {
    createPage({
      path: `trips/${trip.tripId}`,
      component: tripTemplate,
      context: {
        tripId: trip.tripId
      }
    })
  })
}