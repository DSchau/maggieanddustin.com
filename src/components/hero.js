import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";
import GatsbyImage from "gatsby-image";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;

  padding: 1rem;

  border: 8px solid rgba(255, 255, 255, 0.5);
  border-left-width: 0;
  border-right-width: 0;

  transform: translateY(-50%) translateX(-50%);
  text-align: center;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  bottom: 1vh;
  width: 100%;

  text-align: center;
`;

const Image = styled(GatsbyImage)`
  flex: 1;

  height: 100vh;
  width: 100vw;

  :after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;

    background: linear-gradient(
      to bottom,
      rgba(133, 65, 19, 0.75) 0%,
      rgba(0, 0, 0, 0) 50%,
      rgba(255, 255, 255, 0.5) 100%
    );
    background-blend-mode: color-burn;
  }
`;

function Hero({ content, footer }) {
  const data = useStaticQuery(graphql`
    {
      file(relativePath: { regex: "/proposal.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return (
    <Container>
      <Image fluid={data.file.childImageSharp.fluid} />
      <Content>{content}</Content>
      <Footer>{footer}</Footer>
    </Container>
  );
}

export default Hero;
