const path = require("path")

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions

    const blogPostTemplate = path.resolve(`src/pages/articles/article-template.js`)

    const result = await graphql(`
    {
        allArticles: allDatoCmsArticle {
          edges {
            node {
              slug
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
  `)

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }

    result.data.allArticles.edges.forEach(({ node, previous, next }) => {
        createPage({
            path: `articles/${node?.slug}`,
            component: blogPostTemplate,
            context: {
              slug: node.slug,
              previousSlug: previous?.slug,
              nextSlug: next?.slug
            } // additional data can be passed via context
        })
    })

}