/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'
import { MdViewQuilt, MdViewList } from 'react-icons/md'

import Trip from '../../components/trip'
import SEO from '../../components/seo'
import Masonry from '../../components/masonry'

const Button = (props) => (
  <button
    sx={{
      color: `text`,
      backgroundColor: `transparent`,
      border: `none`,
      pl: 2,
      pr: 2,
    }}
    {...props}
  />
)

function TripListing({ data }) {
  const [view, setView] = useState('grid')
  const { trips } = data
  const Wrapper = view === `grid` ? Masonry : Styled.div
  return (
    <React.Fragment>
      <SEO title="Blog" description="The blog for Maggie and Dustin" />
      <SkipNavContent>
        <Styled.div
          sx={{
            width: [`100%`, `75%`],
            margin: `0 auto`,
          }}
        >
          <Styled.div sx={{ display: [`none`, `block`], float: [`right`] }}>
            <Button onClick={() => setView('grid')}>
              <MdViewQuilt size={24} />
            </Button>
            <Button onClick={() => setView('list')}>
              <MdViewList size={24} />
            </Button>
          </Styled.div>
          <Wrapper sx={{ clear: `both` }}>
            {trips.nodes.map((post) => (
              <Trip key={post.path} preview={true} {...post} />
            ))}
          </Wrapper>
        </Styled.div>
      </SkipNavContent>
    </React.Fragment>
  )
}

export const blogQuery = graphql`
  {
    trips: allContentfulTrip(sort: { fields: endDate, order: ASC }) {
      nodes {
        ...TripDetails
      }
    }
  }
`

export default TripListing
