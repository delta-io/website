import * as React from "react";

import Link from "src/components/Link";
import { mediaBreakpointDown } from "config/theme";
import styled from "styled-components";
import { NavDropdown } from "react-bootstrap";

const showingMobileMenu = mediaBreakpointDown("lg");

export const HeaderTab = styled(Link)`
  font-size: ${(props) => props.theme.fontSizes.secondary};
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  color: inherit;
  text-decoration: none;
  min-height: 48px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid transparent;

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
`;

export const HeaderDropDown = styled(NavDropdown)`
  font-size: ${(props) => props.theme.fontSizes.secondary};
  padding: ${(props) => props.theme.spacing.none}
    ${(props) => props.theme.spacing.none};
  title-color: inherit;
  text-decoration: none;
  min-height: 48px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid transparent;

  &.active {
    border-bottom-color: ${(props) => props.theme.colors.primary};
  }

  .nav-link,
  .nav-link:focus,
  .nav-link:hover {
    padding: ${(props) => props.theme.spacing.xs}
      ${(props) => props.theme.spacing.sm};
  }

  ${(props) =>
    showingMobileMenu(`
    border-bottom: 0;

    .nav-link, .nav-link:focus, .nav-link:hover {
      color: ${props.theme.light.color};  
    }
  
    &.active {
      color: ${props.theme.colors.primary};
    }
  `)}
`;

const HeaderNavItem = ({ items }) => (
  <>
    {items.submenu ? (
      <HeaderDropDown
        id="nav-dropdown-dark-example"
        title={items.label}
        menuVariant="dark"
      >
        {items.submenu.map((link) => (
          <HeaderDropDown.Item>
            <HeaderTab
              key={link.label}
              href={link.url}
              activeClassName="active"
            >
              {link.label}
            </HeaderTab>
          </HeaderDropDown.Item>
        ))}
      </HeaderDropDown>
    ) : (
      <HeaderTab
        key={items.label}
        href={items.url}
        activeClassName="active"
        partiallyActive
      >
        {items.label}
      </HeaderTab>
    )}
  </>
);

export default HeaderNavItem;
