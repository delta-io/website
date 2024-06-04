import React from "react";
import Section from "src/components/Section";
import uniForm from "src/images/uniForm-img.png";
import styled from "styled-components";
import { media } from "config/theme";

const ImgItem = styled.a`
  width: 100%;

  @media ${media.md} {
  }

  img {
    width: 100%;
  }
`;

const UniFormBlock = () => (
  <Section title="UniForm" background="white" centeredHeader padding="xl">
    <ImgItem
      target="_blank"
      href="https://docs.delta.io/latest/delta-uniform.html"
    >
      <img src={uniForm} alt="uniForm section" />
    </ImgItem>
  </Section>
);

export default UniFormBlock;
