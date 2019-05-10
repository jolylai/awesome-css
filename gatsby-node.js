/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const createPages = require(`./gatsby/createPages`)
const onCreateNode = require(`./gatsby/onCreateNode`)

exports.createPages = ({ graphql, actions }) =>
  Promise.all([
    // createPages.createRedirects({ actions }),
    createPages.createMdxPages({ graphql, actions }),
  ])

exports.onCreateNode = async ({ node, getNode, actions }) =>
  await onCreateNode.createMdxFields({ node, getNode, actions })
