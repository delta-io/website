import * as React from "react";
import styled from "styled-components";
import LinkList from "src/components/LinkList";
import Link from "src/components/Link";

const SidebarMenuLink = styled(Link)`
  font-weight: ${(props) => props.theme.fontWeightBold};
  color: inherit;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SidebarMenuLinkList = styled(LinkList)`
  text-transform: uppercase;
`;

const SidebarMenu = (props) => {
  const { links } = props;

  if (!links) {
    return null;
  }

  return <SidebarMenuLinkList links={links} linkComponent={SidebarMenuLink} />;
};

export default SidebarMenu;
