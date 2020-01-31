/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout/'

function Index({ data }) {
  const { hero } = data
  return (
    <Layout>
      <Styled.div sx={{ position: `relative` }}>
        <Image {...hero} />
      </Styled.div>
      <Styled.div sx={{ textAlign: `center`, pt: `10vh`, pb: `10vh` }}>
        <Styled.p
          sx={{ fontStyle: `italic`, fontSize: 24, fontFamily: `heading` }}
        >
          Please join us for our wedding celebration on
        </Styled.p>
        <Styled.h1
          sx={{ fontSize: 48, padding: 2, mb: 0, textTransform: `uppercase` }}
        >
          August 8, 2020
        </Styled.h1>
        <Styled.h2
          sx={{ fontFamily: `body`, fontSize: 40, fontFamily: `Parisienne` }}
        >
          Minneapolis, MN
        </Styled.h2>
        {process.env.GATSBY_SHOW_RSVP !== `false` && (
          <Link
            to="/rsvp/"
            sx={{
              ':hover': {
                borderColor: `text`,
                backgroundColor: `background`,
                color: `text`,
              },
              borderWidth: 4,
              borderColor: `transparent`,
              borderStyle: `solid`,
              display: `inline-block`,
              fontSize: 32,
              textDecoration: `none`,
              backgroundColor: `text`,
              color: `background`,
              pt: 3,
              pb: 3,
              pr: 4,
              pl: 4,
              mt: 2,
              mb: 2,
            }}
          >
            RSVP
          </Link>
        )}
      </Styled.div>
    </Layout>
  )
}

export const indexQuery = graphql`
  {
    hero: contentfulAsset(title: { eq: "The Babe" }) {
      fluid(maxWidth: 1200) {
        ...GatsbyContentfulFluid
      }
    }
  }
`

export default Index
