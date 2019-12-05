/** @jsx jsx */
import { jsx } from 'theme-ui'
import Image from 'gatsby-image'

import Layout from './'

export default ({ cover, children, ...rest }) => (
  <Layout {...rest}>
    <div sx={{ position: 'relative', zIndex: 0 }}>
      {cover && (
        <Image
          fluid={cover}
          sx={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
        />
      )}
      {children}
    </div>
  </Layout>
)
