const defaultMarkdownFields = `
fields {
    slug
}
`

const allMdxPosts = (section, fields = defaultMarkdownFields) => {
  let sectionFilter = `section: {eq: "${section}"},`
  let query = `
      {
        allMdx(
              sort: {order: ASC, fields: [frontmatter___date]},
              filter: {fields: {
                  ${section ? sectionFilter : ``}
              }}
          ) {
              edges {
                  node {
                    ${fields}
                  }
              }
          }
      }
  `

  return query
}

module.exports = {
  allMdxPosts,
}
