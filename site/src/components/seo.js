import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const useWeddingTitle = (nav, title) => {
  return (
    nav.items.includes(item => item.title === title) || title === `Home Page`
  )
}

function SEO({ description, lang, image: seoImage, meta, keywords, title }) {
  const data = useStaticQuery(detailsQuery)

  const image = seoImage || data.card.localFile.childImageSharp.resize

  console.log(        {
    property: 'og:image',
    content: /https?/.test(image.src) ? image.src : `${process.env.GATSBY_DEPLOY_URL || ''}${image.src}`,
  },)

  const metaDescription = description || data.site.siteMetadata.description
  const fullTitle = `${title} | ${
    useWeddingTitle(data.nav, title) ? `Wedding |` : ``
  } ${data.site.siteMetadata.title}`
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${data.site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: fullTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: data.site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: fullTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          property: 'og:image',
          content: /https?/.test(image.src) ? image.src : `${process.env.GATSBY_DEPLOY_URL || ''}${image.src}`,
        },
        {
          property: 'og:image:height',
          content: image.height,
        },
        {
          property: 'og:image:width',
          content: image.width,
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [`wedding`, `minneapolis`, `personal`, `blog`, `gatsby`],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        siteUrl
        title
        description
        author
      }
    }

    nav: contentfulNavigation {
      items {
        title
        fields {
          slug
        }
      }
    }

    card: contentfulAsset(title: {eq: "Save the Date | August 8, 2020"}) {
      localFile {
        childImageSharp {
          resize(width: 1500) {
            src
          }
        }
      }
    }
  }
`
