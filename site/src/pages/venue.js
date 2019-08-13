import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout/with-cover'

export default ({ data }) => (
  <Layout cover={data.contentYaml.venue.cover.childImageSharp.fluid}>
    <h1>Test</h1>
  </Layout>
)

export const pageQuery = graphql`
  {
    contentYaml {
      venue {
        cover {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
