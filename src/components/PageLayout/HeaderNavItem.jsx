import * as React from "react";

import Link from "src/components/Link";
import { mediaBreakpointDown } from "config/theme";
import styled from "styled-components";
import { NavDropdown } from "react-bootstrap";

const showingMobileMenu = mediaBreakpointDown("lg");

export const HeaderTab = styled.div`
  font-size: ${(props) => props.theme.fontSizes.secondary};
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  color: inherit;
  text-decoration: none;
  min-height: 48px;
  display: flex;
  align-items: center;

  &.active {
    border-bottom-color: ${(props) => props.theme.colors.primary};
  }

  ${(props) =>
    showingMobileMenu(`
    border-bottom: 0;

    &.active {
      color: ${props.theme.colors.primary};
    }
  `)}
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const HeaderDropDown = styled(NavDropdown)`
  font-size: ${(props) => props.theme.fontSizes.secondary};
  title-color: inherit;
  text-decoration: none;
  min-height: 48px;
  display: flex;
  align-items: center;

  &.active {
    border-bottom-color: ${(props) => props.theme.colors.primary};
  }

  .nav-link,
  .nav-link:focus,
  .nav-link:hover {
    padding: 12px 16px;

    & + div {
      transform: translate3d(0px, 46px, 0px) !important;
    }
  }

  ${(props) =>
    showingMobileMenu(`
     .nav-link, .nav-link:focus, .nav-link:hover {
      color: ${props.theme.light.color};  
    }
    
     &.active {
      color: ${props.theme.colors.primary};
    }
    
  `)}
`;

const MainLinkMenu = styled(Link)`
  display: block;
  text-decoration: none;
  padding: 12px 16px;
  color: ${(props) => props.theme.dark.color};
  transition: 0.3s ease-in-out;
  color: inherit;
  text-decoration: none;
`;

const SubLinkMenu = styled(Link)`
  display: block;
  text-decoration: none;
  padding: 12px 16px;
  color: ${(props) => props.theme.colors.linkSubMenu};
  transition: 0.3s ease-in-out;

  &:hover, &:focus {
    background-color: ${(props) => props.theme.colors.textSecondary};
  }
}
`;

const HeaderNavItem = ({ items }) => {
  if (items.submenu) {
    return (
      <HeaderDropDown
        id="nav-dropdown-dark-example"
        title={items.label}
        menuVariant="dark"
      >
        {items.submenu.map((link) => (
          <SubLinkMenu
            key={link.label}
            href={link.url}
            activeClassName="active"
          >
            {link.label}
          </SubLinkMenu>
        ))}
      </HeaderDropDown>
    );
  }

  return <MainLinkMenu href={items.url}>{items.label}</MainLinkMenu>;
};

export default HeaderNavItem;
