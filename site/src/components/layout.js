import React from 'react'
import { Styled } from 'theme-ui'

import Navigation from './navigation'

export default ({ children }) => (
  <Styled.root>
    <Navigation />
    {children}
  </Styled.root>
)
