/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import { FaChevronDown } from 'react-icons/fa'

import Hero from '../components/hero'
import Footer from '../components/footer'
import PhotoGrid from '../components/photo-grid'
import SEO from '../components/seo'

const down = keyframes`
  0%, 100% {transform: translateY(0);}
  50% {transform: translateY(6px);}
`

const Title = styled.h1`
  color: rgba(255, 255, 255, 0.85);
  font-weight: 900;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
  text-transform: uppercase;
  white-space: nowrap;
  margin: 0;

  font-size: 2rem;

  @media only screen and (min-width: 600px) {
    font-size: 3rem;
  }

  @media only screen and (min-width: 768px) {
    font-size: 6rem;
  }
`

const And = styled.h2`
  color: white;
  font-size: 5rem;
  font-weight: 100;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);

  padding-left: 1rem;
  padding-right: 1rem;
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 3px;
    background: rgba(255, 255, 255, 0.5);
    width: 10vw;
  }

  &:before {
    left: 0;
  }

  &:after {
    right: 0;
  }
`

const CTA = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  text-align: center;

  padding: 1rem 0;
`

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`

const Message = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  margin: 0;
  font-size: 900;

  padding: 1rem;

  color: black;
  text-shadow: 0 0 10px rgba(255, 255, 255, 1);

  font-size: 1.25rem;

  text-transform: uppercase;
`

const Chevron = styled(FaChevronDown)`
  display: block;
  margin-left: 0.5rem;

  animation: ${down} 2.5s ease infinite;
`

const MoreInfo = styled.div`
  height: 100vh;

  background-color: #222;
  color: white;
`

const fonts = {
  fontSize: `1.5rem`,
  '@media only screen and (min-width: 500px)': {
    fontSize: `3rem`,
  },
  '@media only screen and (min-width: 768px)': {
    fontSize: `5rem`,
  },
}

const fontsDate = {
  fontSize: `2rem`,
  '@media only screen and (min-width: 500px)': {
    fontSize: `4rem`,
  },
  '@media only screen and (min-width: 768px)': {
    fontSize: `6rem`,
  },
}

function Index() {
  const data = useStaticQuery(graphql`
    {
      allFile(
        filter: { relativePath: { glob: "engagement/*" } }
        sort: { fields: relativePath, order: ASC }
      ) {
        edges {
          node {
            childImageSharp {
              fluid(maxWidth: 500) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  `)

  return (
    <>
      <SEO title="Proposal" keywords={[`gatsby`, `application`, `react`]} />
      <Hero
        footer={
          <CTA>
            <Link data-scroll={true} href="#more-info">
              <Message>
                <span>More info this way</span>
                <Chevron />
              </Message>
            </Link>
          </CTA>
        }
      />
      <MoreInfo id="more-info">
        <div css={{ padding: '10rem 1rem', textAlign: `center` }}>
          <h2
            sx={{
              display: `block`,
              whiteSpace: `nowrap`,
              margin: 0,
              padding: '2rem',
              border: `12px solid white`,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              ...fonts,
            }}
          >
            <span css={{ fontWeight: 100 }}>Wedding bells in&hellip;</span>
            <span
              css={{
                display: `block`,
                padding: `1rem`,
                fontWeight: 900,
                ...fontsDate,
              }}
            >
              2020
            </span>
          </h2>
        </div>
        <PhotoGrid>
          {data.allFile.edges.map(({ node }) => (
            <Image
              key={node.childImageSharp.fluid.src}
              fluid={node.childImageSharp.fluid}
            />
          ))}
        </PhotoGrid>
        <Footer />
      </MoreInfo>
    </>
  )
}

export default Index
