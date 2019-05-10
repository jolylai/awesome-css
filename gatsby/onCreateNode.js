const { createFilePath } = require(`gatsby-source-filesystem`)

module.exports.createMdxFields = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: "slug",
      node,
      value:value,
    })
  }
}

