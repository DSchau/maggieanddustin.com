import React from 'react'
import { Styled } from 'theme-ui'
import { Global } from '@emotion/core'
import { SkipNavLink } from '@reach/skip-nav'

import Navigation from '../components/navigation'
import Banner from '../components/banner'

import '@reach/skip-nav/styles.css'

/* TODO: SkipNavLink, SkipNavContent */
/* TODO: import "@reach/skip-nav/styles.css"; */

export default ({ children }) => (
  <Styled.root>
    <Global
      styles={{
        'body, html, #___gatsby, #___gatsby > div': {
          height: '100%',
        },
      }}
    />
    <Banner id="announcement" />
    <SkipNavLink />
    <Navigation />
    <main>{children}</main>
  </Styled.root>
)
