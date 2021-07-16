import React from 'react'
import { Link } from 'gatsby'

import { SkipNavContent } from '@reach/skip-nav'

import SEO from '../components/seo'

function FourOhFour() {
  return (
    <React.Fragment>
      <SEO
        title="Photos"
        description="An archive of photos for Maggie and Dustin"
      />
      <SkipNavContent>
        <h1>Oh no, not found!</h1>
        <Link to="/">Back to home</Link>
      </SkipNavContent>
    </React.Fragment>
  )
}

export default FourOhFour
