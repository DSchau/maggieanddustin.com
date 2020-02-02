/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

import Layout from '../components/layout'
import Timeline from '../components/timeline'
import Masonry from '../components/masonry'
import SEO from '../components/seo'

const flatten = arr => arr.reduce((merged, item) => merged.concat(item), [])

function Page({ data }) {
  const page = data.page.contentBlocks.reduce((merged, block) => {
    Object.keys(block).forEach(key => {
      if (!merged[key]) {
        merged[key] = []
      }
      merged[key].push(block[key])
    })
    return merged
  }, {})
  return (
    <Layout>
      <SEO
        description="The wedding website for Maggie Alcorn and Dustin Schau. Save the date for August 8th, 2020 in Minneapolis, MN."
        title="Wedding | August 8, 2020"
      />
      {page.hero && <Image fluid={page.hero[0].fluid} />}
      {data.page.slug === `/` && (
        <React.Fragment>
          <Styled.div sx={{ textAlign: `center`, pt: `10vh`, pb: `10vh` }}>
            <Styled.p
              sx={{ fontStyle: `italic`, fontSize: 24, fontFamily: `heading` }}
            >
              Please join us for our wedding celebration on
            </Styled.p>
            <Styled.h1
              sx={{
                fontSize: 48,
                padding: 2,
                mb: 0,
                textTransform: `uppercase`,
              }}
            >
              August 8, 2020
            </Styled.h1>
            <Styled.h2 sx={{ fontSize: 40, fontFamily: `Parisienne` }}>
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
        </React.Fragment>
      )}
      {page.moments &&
        page.moments.map(moment => (
          <Timeline key={moment.id} moments={moment} />
        ))}
      {page.photos && (
        <Masonry>
          {flatten(page.photos).map(photo => (
            <Image key={photo.fluid.src} fluid={photo.fluid} />
          ))}
        </Masonry>
      )}
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    page: contentfulPage(fields: { slug: { eq: $slug } }) {
      id
      slug
      contentBlocks {
        ... on ContentfulGallery {
          photos {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
        ... on ContentfulHero {
          hero: image {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
        # ... on ContentfulTimeline {
        #   moments {
        #     id
        #     ...MomentDetails
        #   }
        # }
      }
    }
  }
`

export default Page
