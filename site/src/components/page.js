/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { SkipNavContent } from '@reach/skip-nav'
import { GoChevronDown } from 'react-icons/go'

import Gallery from '../components/gallery'
import Timeline from '../components/timeline'
import Section from '../components/section'
import WeddingParty from '../components/wedding-party'
import SEO from '../components/seo'

import partials from '../components/partials'

function Page({
  slug,
  children,
  description,
  title,
  featuredImage,
  contentBlocks,
}) {
  const page = contentBlocks.reduce((merged, block) => {
    switch (block.__typename) {
      case 'ContentfulTimeline':
        merged.timeline = (merged.timeline || []).concat(block)
        break
      case 'ContentfulGallery':
        merged.gallery = (merged.gallery || []).concat(block)
        break
      case 'ContentfulSection':
        merged.section = (merged.section || []).concat(block)
        break
      case 'ContentfulHero':
        merged.hero = (merged.hero || []).concat(block)
        break
      case 'ContentfulWeddingParty':
        merged.party = (merged.party || []).concat(block)
        break
      default:
        break
    }
    return merged
  }, {})
  const Partial = partials(slug)
  const content = (
    <React.Fragment>
      {page.timeline &&
        page.timeline.map(timeline => (
          <Timeline key={timeline.id} {...timeline} />
        ))}
      {page.section &&
        page.section.map(section => <Section key={section.id} {...section} />)}
      {page.party &&
        page.party.map(party => <WeddingParty key={party.id} {...party} />)}
      {page.gallery &&
        page.gallery.map(gallery => <Gallery key={gallery.id} {...gallery} />)}
    </React.Fragment>
  )
  return (
    <React.Fragment>
      <SEO
        description={description}
        title={title}
        {...(featuredImage
          ? {
              image: featuredImage.localFile.childImageSharp.resize,
            }
          : {})}
      />
      {page.hero &&
        page.hero
          .filter(
            img =>
              img.hero &&
              img.hero.localFile &&
              img.hero.localFile.childImageSharp
          )
          .map(img => (
            <Styled.div sx={{ position: 'relative' }}>
              {img.title && (
                <Styled.h1
                  sx={{
                    position: 'absolute',
                    fontWeight: 100,
                    zIndex: 2,
                    top: '75%',
                    left: '50%',
                    transform: 'translateY(-75%) translateX(-50%)',
                    color: 'background',
                    backgroundColor: 'text',
                    padding: [2, 8, 20],
                    textAlign: 'center',
                    fontSize: [20, 44, 72],
                  }}
                >
                  {img.title}
                </Styled.h1>
              )}
              <GatsbyImage
                key={img.hero.id}
                alt={img.hero.title || img.hero.description}
                image={getImage(img.hero.localFile)}
              />
              <Styled.a
                href="#reach-skip-nav"
                sx={{
                  color: 'inherit',
                  display: 'block',
                  width: '100%',
                  textDecoration: 'none',
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  textAlign: 'center',
                }}
              >
                <GoChevronDown
                  sx={{
                    color: 'background',
                    height: [24, 32, 48],
                    width: [24, 32, 48],
                  }}
                />
              </Styled.a>
            </Styled.div>
          ))}
      <SkipNavContent>
        {Partial ? (
          <Partial children={children} content={content} />
        ) : (
          <React.Fragment>
            {children}
            {content}
          </React.Fragment>
        )}
      </SkipNavContent>
    </React.Fragment>
  )
}

export default Page
