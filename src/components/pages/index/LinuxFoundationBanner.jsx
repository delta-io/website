import * as React from "react";
import styled from "styled-components";
import linuxFoundation from "./img/linux-foundation.svg";

const BannerWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 32px;
  background-color: black;

  img {
    max-width: 300px;
  }
`;

export const LinuxFoundationBanner = () => (
  <BannerWrapper>
    <img src={linuxFoundation} alt="linux-foundation" />
  </BannerWrapper>
);
