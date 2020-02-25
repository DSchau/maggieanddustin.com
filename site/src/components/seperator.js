/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'

const Seperator = () => (
  <Styled.hr
    sx={{
      maxWidth: ['100%', '50%'],
      margin: '0 auto',
      backgroundColor: '#eee',
      height: 1,
      border: 'none',
    }}
  />
)

export default Seperator
