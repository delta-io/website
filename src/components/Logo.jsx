import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import styled from "styled-components";

const LogoWrapper = styled.div`
  margin: 0 auto 1.2rem;
  width: 150px;
`;

const Logo = () => (
  <LogoWrapper>
    <StaticImage src="../images/delta-lake-logo.png" alt="logo" />
  </LogoWrapper>
);

export default Logo;
