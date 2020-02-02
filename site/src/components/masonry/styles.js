/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import React from 'react'

export const Parent = React.forwardRef((props, ref) => (
  <Styled.div
    ref={ref}
    sx={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(${props.colWidth}, 1fr))`,
      gridAutoRows: `calc(${props.rowHeight}px - 2em)`,
      gridGap: '2em',
    }}
    {...props}
  />
))

export const Child = props => (
  <Styled.div
    sx={{
      gridRow: `span ${props.span}`,
      height: `max-content`,
    }}
    {...props}
  />
)
