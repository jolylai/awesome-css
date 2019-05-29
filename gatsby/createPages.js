const path = require(`path`)
const { allMdxPosts } = require("../utils/node-queries")
const DocTemplate = path.resolve(`./src/templates/markdown/post.js`)

module.exports.createRedirects = ({ actions }) => {
  const { createRedirect } = actions

  // The /concepts page doesn't exist, we need to redirect to
  // the first post of this section
  createRedirect({
    fromPath: `/concepts`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/concepts/introduction/`,
  })
}

module.exports.createMdxPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(allMdxPosts()).then(result => {
        if (result.errors) {
          console.error(result.errors)
          reject(result.errors)
        }

        // We'll call `createPage` for each result
        result.data.allMdx.edges.forEach(({ node }) => {
          createPage({
            // This is the slug we created before
            // (or `node.frontmatter.slug`)
            path: node.fields.slug,
            // This component will wrap our MDX content
            component: DocTemplate,
            // We can use the values in this context in
            // our page layout component
            // Data passed to context is available
            // in page queries as GraphQL variables.
            context: { id: node.id, slug: node.fields.slug },
          })
        })
      })
    )
  })
}

module.exports.createMarkdownPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const queryPromises = []
  console.log("allMdxPosts: ", allMdxPosts)

  queryPromises.push(
    new Promise((resolve, reject) => {
      graphql(allMdxPosts).then(result => {
        console.log("result: ", result)
        if (result.errors) {
          return reject(result.errors)
        }

        return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: DocTemplate,
            context: {
              // Data passed to context is available
              // in page queries as GraphQL variables.
              slug: node.fields.slug,
            },
          })
          return resolve()
        })
      })
    })
  )

  return Promise.all(queryPromises)
}
