import * as React from "react";
import styled from "styled-components";
import Section from "src/components/Section";
import linuxFoundation from "./img/linux-foundation.svg";

const BannerWrapper = styled.div`
  margin: 0 auto;
  height: 32px;
  background-color: black;
  padding-top: 2px;
`;

const Container = styled(Section)`
  img {
    max-width: 300px;
  }
`;

export const LinuxFoundationBanner = () => (
  <BannerWrapper>
    <Container>
      <img src={linuxFoundation} alt="linux-foundation" />
    </Container>
  </BannerWrapper>
);
