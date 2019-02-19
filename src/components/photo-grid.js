import styled from '@emotion/styled'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;


  @media only screen and (min-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`

export default Grid
