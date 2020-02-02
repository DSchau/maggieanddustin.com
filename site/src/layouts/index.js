import React from 'react'
import { Styled } from 'theme-ui'
import { Global } from '@emotion/core'

import Navigation from '../components/navigation'
import Banner from '../components/banner'

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
    <Navigation />
    {children}
  </Styled.root>
)
