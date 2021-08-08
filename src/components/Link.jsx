/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-has-content */
import * as React from "react";
import { Link as GatsbyLink } from "gatsby";

const externalLinkRegex = /^\w+:\/\//;
const anchorLinkRegex = /^#/;

const Link = (props) => {
  const { href, activeClassName, partiallyActive, ...rest } = props;
  const isExternal = externalLinkRegex.test(href);
  const isAnchor = anchorLinkRegex.test(href);

  if (isExternal || isAnchor) {
    return <a href={href} {...rest} />;
  }

  return (
    <GatsbyLink
      to={href}
      activeClassName={activeClassName}
      partiallyActive={partiallyActive}
      {...rest}
    />
  );
};

export default Link;
