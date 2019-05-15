import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'

export default function HeaderWithData() {
  const data = useStaticQuery(graphql`
    {
      pages: allSitePage(filter:{
        path:{
          nin:["/dev-404-page/", "/"]
        }
      }) {
        nodes {
          to:path
          fields {
            label
          }
        }
      }

      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return <Header title={data.site.siteMetadata.title} items={data.pages.nodes.map(node => ({
    to: node.to,
    label: node.fields.label
  }))} />
}

