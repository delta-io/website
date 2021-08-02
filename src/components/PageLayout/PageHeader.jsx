import * as React from "react";
import { Link } from "gatsby";
import * as menus from "config/menus";
import { mediaBreakpointUp, mediaBreakpointDown } from "config/theme";
import styled from "styled-components";
import Section from "src/components/Section";
import Icon from "src/components/Icon";
import logo from "./delta-lake-logo.svg";

const { useState } = React;

const showingMobileMenu = mediaBreakpointDown("lg");
const hidingMobileMenu = mediaBreakpointUp("lg");

const Header = styled(Section)`
  background-color: ${(props) => props.theme.dark.bg};
  color: ${(props) => props.theme.dark.light};
  min-height: 48px;
  display: flex;
  align-items: center;
`;

const HeaderLogo = styled(Link)`
  line-height: 0;

  ${showingMobileMenu(`
    display: block;
    margin-left: auto;
    margin-right: auto;
  `)}
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const HeaderMenu = styled.div`
  ${(props) =>
    showingMobileMenu(`
    position: fixed;
    top: 0;
    right: 0;
    transform: ${props.showing ? "translateX(0)" : "translateX(100%)"};
    bottom: 0;
    background-color: white;
    color: ${props.theme.light.color};
    z-index: 999;
  `)}

  ${hidingMobileMenu(`
    display: flex;
    flex: 1 1 auto;
  `)}
`;

const HeaderMenuBackdrop = styled.button`
  ${(props) =>
    showingMobileMenu(`
    background-color: rgba(0, 0, 0, 0.5);
    border: 0;
    appearance: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
    display: ${props.showing ? "block" : "none"};
    cursor: pointer;
  `)}

  ${hidingMobileMenu(`
    display: none;
  `)}
`;

const HeaderNav = styled.div`
  display: flex;
  flex: 0 0 auto;
  padding: 0 ${(props) => props.theme.spacing.lg};

  ${(props) =>
    showingMobileMenu(`
    min-width: 200px;
    flex-flow: column;
    padding: 0 ${props.theme.spacing.sm};
  `)}
`;

const HeaderTab = styled(Link)`
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

const HeaderSocialNav = styled(HeaderNav)`
  margin-left: auto;
  padding-right: 0;

  ${showingMobileMenu(`
    margin-left: 0;
    flex-flow: row;
  `)}
`;

const HeaderIcon = styled(Icon)`
  font-size: ${(props) => props.theme.rem(26)};
`;

const HeaderMenuToggle = styled(HeaderTab)`
  border: 0;
  background-color: transparent;
  appearance: none;
  position: absolute;
  right: 0;
  cursor: pointer;

  ${hidingMobileMenu(`
    display: none;
  `)}
`;

const PageHeader = () => {
  const [menuShowing, setMenuShowing] = useState(false);

  return (
    <Header>
      <HeaderContainer>
        <HeaderLogo to="/">
          <img src={logo} alt="Delta Lake" width="133" height="28" />
        </HeaderLogo>
        <HeaderMenuToggle as="button" onClick={() => setMenuShowing(true)}>
          <HeaderIcon icon="menu" />
        </HeaderMenuToggle>
        <HeaderMenu showing={menuShowing}>
          <HeaderNav>
            {menus.main.map((link) => {
              const { label, url } = link;

              return (
                <HeaderTab
                  key={label}
                  to={url}
                  activeClassName="active"
                  partiallyActive
                >
                  {label}
                </HeaderTab>
              );
            })}
          </HeaderNav>
          <HeaderSocialNav>
            {menus.headerSocial.map((link) => {
              const { label, url, icon } = link;

              return (
                <HeaderTab key={label} to={url}>
                  <HeaderIcon icon={icon} />
                </HeaderTab>
              );
            })}
          </HeaderSocialNav>
        </HeaderMenu>
        <HeaderMenuBackdrop
          onClick={() => setMenuShowing(false)}
          showing={menuShowing}
        />
      </HeaderContainer>
    </Header>
  );
};

export default PageHeader;
