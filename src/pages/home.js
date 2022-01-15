import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import { Globe } from '../components/globe'

import * as styles from './home.module.css'

function Home({ data }) {
  return (
    <div className={styles.home}>
      <div className={styles.layoutContainer}>
        <GatsbyImage
          className={styles.photo}
          image={getImage(data.asset.localFile)}
          alt={data.asset.description}
        />
      </div>
      <Globe className={styles.globe} />
    </div>
  )
}

export const query = graphql`
  query {
    asset: contentfulAsset(title: { eq: "honeymoon-IMG 0473" }) {
      description
      localFile {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            width: 600
            quality: 80
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  }
`

export default Home
