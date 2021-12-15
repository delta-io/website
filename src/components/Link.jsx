/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-has-content */
import * as React from "react";
import { Link as GatsbyLink } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import styled from "styled-components";

const externalLinkRegex = /^\w+:\/\//;
const anchorLinkRegex = /^#/;

const StyledLink = styled.a`
  ${(props) =>
    props.muted === true &&
    `
    &:not(:hover) {
      color: inherit;
      text-decoration: none;
    }
  `}
`;

const Link = (props) => {
  const { href, activeClassName, partiallyActive, active, muted, ...rest } =
    props;
  const isExternal = externalLinkRegex.test(href);
  const isAnchor = anchorLinkRegex.test(href);

  if (isAnchor) {
    return <StyledLink muted={muted} href={href} {...rest} />;
  }

  if (isExternal) {
    return <StyledLink as={OutboundLink} muted={muted} href={href} {...rest} />;
  }

  return (
    <StyledLink
      as={GatsbyLink}
      muted={muted}
      to={href}
      activeClassName={activeClassName}
      partiallyActive={partiallyActive}
      {...rest}
    />
  );
};

export default Link;
