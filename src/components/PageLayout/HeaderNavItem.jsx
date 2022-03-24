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
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  title-color: inherit;
  text-decoration: none;
  min-height: 48px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid transparent;
  color: white;

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

const HeaderNavItem = ({ items }) => (
  <>
    {items.submenu ? (
      <HeaderDropDown
        id="nav-dropdown-dark-example"
        title={items.label}
        menuVariant="dark"
        style={{ color: "white" }}
      >
        {items.submenu.map((link) => (
          <HeaderDropDown.Item href={link.url}>
            {link.label}
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
