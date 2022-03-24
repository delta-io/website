import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Link from "src/components/Link";
// import * as menus from "config/menus";
import { mediaBreakpointDown } from "config/theme";
import styled from "styled-components";
import { NavDropdown } from "react-bootstrap";

// import HeaderNavDropdown from "./HeaderNavDropdown";
// import Section from "src/components/Section";
// import Icon from "src/components/Icon";
// import logo from "./delta-lake-logo.svg";
const showingMobileMenu = mediaBreakpointDown("lg");

const DropdownButton = styled.button`
  font-size: ${(props) => props.theme.fontSizes.secondary};
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  color: inherit;
  background-color: transparent;
  text-decoration: none;
  min-height: 48px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;

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

const HeaderNavDropdown = ({ submenus }) => (
  <ul className="dropdown">
    {submenus.map((submenu) => (
      <li className="menu-items">
        <HeaderTab
          key={submenu.label}
          href={submenu.url}
          activeClassName="active"
          partiallyActive
        >
          {submenu.label}
        </HeaderTab>
        {/* <a href={submenu.url}>{submenu.label}</a> */}
      </li>
    ))}
  </ul>
);

const HeaderNavItem = ({ items }) => (
  <>
    {items.submenu ? (
      <HeaderDropDown
        id="nav-dropdown-dark-example"
        title="Dropdown"
        menuVariant="dark"
      >
        <HeaderDropDown.Item href="#action/3.1">Action</HeaderDropDown.Item>
        <HeaderDropDown.Item href="#action/3.2">
          Another action
        </HeaderDropDown.Item>
        <HeaderDropDown.Item href="#action/3.3">Something</HeaderDropDown.Item>
        <HeaderDropDown.Divider />
        <HeaderDropDown.Item href="#action/3.4">
          Separated link
        </HeaderDropDown.Item>
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
