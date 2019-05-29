import React from "react"
import { graphql } from "gatsby"
import Prism from "prismjs"
import MDXRenderer from "gatsby-mdx/mdx-renderer"

import Layout from "../../components/layout"
class PostTemplate extends React.PureComponent {
  componentDidMount() {
    Prism.highlightAll()
  }

  render() {
    const {
      data: { mdx },
    } = this.props

    return (
      <Layout>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">{mdx.frontmatter.title}</h1>
              <MDXRenderer>{mdx.code.body}</MDXRenderer>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default PostTemplate

export const pageQuery = graphql`
  query BlogPostQuery($slug: String) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      frontmatter {
        title
      }
      code {
        body
      }
    }
  }
`
