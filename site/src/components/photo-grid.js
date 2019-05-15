import styled from '@emotion/styled'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  overflow: hidden;

  @media only screen and (min-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .gatsby-image-wrapper {
    filter: grayscale(1);
    transition: 175ms ease-in-out;
    transform: scale(1);
    overflow: hidden;

    :hover {
      filter: none;
      transform: scale(1.1);
    }
  }
`

export default Grid
