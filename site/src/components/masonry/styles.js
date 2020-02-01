/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

export const Parent = props => (
  <Styled.div
    sx={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(${props.colWidth}, 1fr))`,
      gridAutoRows: `calc(${props.rowHeight}px - 2em)`,
      gridGap: '2em',
    }}
    {...props}
  />
)

export const Child = props => (
  <Styled.div
    sx={{
      gridRow: `span ${props.span}`,
      height: `max-content`,
    }}
    {...props}
  />
)
