import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Loadable from "react-loadable"

const IndexPage = props => {
  const data = props.data.allLettersYaml.edges.map((item, index) => {
    const { node } = item
    const Demo = Loadable({
      loader: () => import(`../../${node.slug}/index.js`),
      loading: () => <div>Loading...</div>,
    })
    node.component = <Demo key={index} />
    return node
  })

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <Link to="/page-2/">Go to page 2</Link>
      <div className="tile is-ancestor">
        <div className="tile is-vertical is-8">
          <div className="tile">
            <div className="tile is-parent is-vertical">
              <Link to={data[0].slug} className="tile is-child notification is-primary">
                <p className="title">{data[0].title}</p>
                {data[0].component}
              </Link>
              <article className="tile is-child notification is-warning">
                <p className="title">{data[1].title}</p>
                {data[1].component}
              </article>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child notification is-info">
                <p className="title">{data[2].title}</p>
                {data[2].component}
              </article>
            </div>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child notification is-danger">
              <p className="title">{data[3].title}</p>
              <div className="content">{data[3].component}</div>
            </article>
          </div>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child notification is-success">
            <p className="title">{data[4].title}</p>
            <p className="subtitle">With an image</p>
            <div className="content">{data[4].component}</div>
          </article>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allDemosYaml {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`
