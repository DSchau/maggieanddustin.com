import React from 'react'
import { Styled } from 'theme-ui'
import { Global } from '@emotion/core'
import { SkipNavLink } from '@reach/skip-nav'
import { useStaticQuery, graphql } from 'gatsby'

import Navigation from '../components/navigation'
import Banner from '../components/banner'

import '@reach/skip-nav/styles.css'

export default ({ children }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          weddingDate(formatString: "MMMM DD, YYYY")
        }
      }
    }
  `)
  return (
    <Styled.root>
      <Global
        styles={{
          'body, html, #___gatsby, #___gatsby > div': {
            height: '100%',
          },
        }}
      />
      <Banner id="announcement" date={data.site.siteMetadata.weddingDate} />
      <SkipNavLink />
      <Navigation />
      <main>{children}</main>
    </Styled.root>
  )
}
