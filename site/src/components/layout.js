import React from 'react'
import { Styled } from 'theme-ui'
import { Global } from '@emotion/core'

import Navigation from './navigation'

export default ({ children }) => (
  <Styled.root>
    <Global
      styles={{
        'body, html, #___gatsby, #___gatsby > div': {
          height: '100%',
        },
      }}
    />
    <Navigation />
    {children}
  </Styled.root>
)
