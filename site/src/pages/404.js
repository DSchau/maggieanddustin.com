/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'
import { SkipNavContent } from '@reach/skip-nav'

import SEO from '../components/seo'

function FourOhFour() {
  return (
    <React.Fragment>
      <SEO
        title="404: Not Found"
        description="The requested page couldn't be found. Oh no! Try again!"
      />
      <SkipNavContent>
        <Styled.div
          sx={{
            width: [`100%`, `75%`],
            margin: `0 auto`,
          }}
        >
          <Styled.h1 sx={{ textAlign: 'center' }}>404: Not Found!</Styled.h1>
          <Styled.p>
            Oh no! We couldn't find the requested resource. Better luck next
            time!
          </Styled.p>
        </Styled.div>
      </SkipNavContent>
    </React.Fragment>
  )
}

export default FourOhFour
