import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import styled from "styled-components";

const LogoWrapper = styled.div`
  margin: 0 auto 1rem;
  width: 150px;
  height: 122px;
`;

const Logo = () => (
  <LogoWrapper>
    <StaticImage src="../images/delta-lake-logo.png" alt="logo" />
  </LogoWrapper>
);

export default Logo;
