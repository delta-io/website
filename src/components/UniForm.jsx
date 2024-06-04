import React from "react";
import Section from "src/components/Section";
import * as theme from "config/theme";
import styled from "styled-components";
import Typography from "src/components/Typography";
import { colors, media } from "config/theme";
import deltaUniForm from "../images/delta-uniForm.png";

const Box = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 50px;
  align-items: center;
  grid-template-areas:
    "."
    ".";

  @media ${media.md} {
    grid-template-columns: 18% 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: ". .";
  }
`;

const BoxItem = styled.div`
  color: ${(props) => props.theme.dark.color};
  line-height: 1.2;
`;

const ImgBox = styled.img`
  width: 70%;
  margin: 0 auto;
  display: block;

  @media ${media.md} {
    margin: 0;
    width: 100%;
  }
`;

const MainTitle = styled(Typography)`
  font-size: 25px;
  margin-bottom: ${(props) => props.theme.spacing.md};
  text-align: center;

  @media ${media.md} {
    text-align: left;
  }

  @media ${media.lg} {
    font-size: 34px;
  }
`;

const LinksBox = styled.div`
  display: flex;
  justify-content: center;

  @media ${media.md} {
    display: block;
  }
`;

const Link = styled.a`
  color: ${(props) => props.theme.dark.color};
  text-decoration: none;
  font-size: 18px;

  @media ${media.lg} {
    font-size: 25px;
  }

  &:hover {
    color: ${(props) => props.theme.colors.text};
  }

  &:first-of-type {
    margin-right: 10px;
    padding-right: 10px;
    position: relative;

    &:after {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(0, -50%);
      width: 2px;
      height: 70%;
      background: white;
    }
  }
`;

const UniForm = () => (
  <Section background={theme.colors.primary} centeredHeader padding="xxl">
    <Box>
      <BoxItem>
        <ImgBox src={deltaUniForm} alt="UniForm" />
      </BoxItem>

      <BoxItem>
        <MainTitle>
          Delta Universal Format (UniForm)
          <br />
          allows you to read Delta tables with Iceberg and Hudi clients
        </MainTitle>
        <LinksBox>
          <Link
            target="_blank"
            href="https://docs.delta.io/latest/delta-uniform.html#requirements"
          >
            Requirements
          </Link>
          <Link
            target="_blank"
            href="https://docs.delta.io/latest/delta-uniform.html#enable-delta-lake-uniform"
          >
            Enable UniForm
          </Link>
        </LinksBox>
      </BoxItem>
    </Box>
  </Section>
);

export default UniForm;
