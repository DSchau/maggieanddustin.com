import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Registry from '../components/registry'

function RegistryPage({ data }) {
  return (
    <Layout>
      <Registry {...data.contentYaml.registry} />
    </Layout>
  )
}

export const registryQuery = graphql`
  {
    contentYaml {
      registry {
        vendors {
          name
          url
        }
      }
    }
  }
`

export default RegistryPage
