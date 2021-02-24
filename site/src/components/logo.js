/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { Link } from 'gatsby'

function Logo({ as: Wrapper = Link, className, plural = false }) {
  return (
    <Wrapper
        to="/"
        sx={{
          borderBottomWidth: 0,
          display: `block`,
          color: 'text',
          fontFamily: 'heading',
          fontWeight: 'heading',
          fontSize: 4,
          whiteSpace: `nowrap`,
          margin: `0 auto`,
          pt: [2],
          pb: [2],
          pl: 0,
          pr: 0,
          textAlign: `center`,
          width: [`100%`, `50%`],
          maxWidth: `100%`,
        }}
        className={className}
      >
        <span sx={{ display: 'inline-block' }}>
          Maggie{' '}
          <em sx={{ fontFamily: `cursive`, fontWeight: 'body' }}>&amp;</em>{' '}
          Dustin{plural ? `'s` : ''}
        </span>
      </Wrapper>
  )
}

export default Logo