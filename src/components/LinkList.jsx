import * as React from "react";
import styled from "styled-components";
import Link from "src/components/Link";
import { rem, spacingRem } from "config/theme";
import { shape, string, arrayOf, func } from "prop-types";
import { useLocation } from "@reach/router";

const LinkListNav = styled.nav`
  display: grid;
  grid-template-rows: auto;
  row-gap: ${(props) => props.theme.spacing.xs};
  align-content: start;
`;

const LinkList = (props) => {
  const { links, linkComponent, renderInCurrentItem, className } = props;
  const LinkComponent = linkComponent || Link;
  const location = useLocation();

  const renderItems = (items, level = 0) =>
    items.map((item) => (
      <React.Fragment key={item.url}>
        <LinkComponent
          href={item.url}
          style={{ marginLeft: rem(spacingRem.sm * level) }}
          active={item.active}
          activeClassName="active"
        >
          {item.label}
        </LinkComponent>
        {renderInCurrentItem &&
          location.pathname === item.url &&
          renderInCurrentItem(item)}
        {item.items && renderItems(item.items, level + 1)}
      </React.Fragment>
    ));

  return <LinkListNav className={className}>{renderItems(links)}</LinkListNav>;
};

LinkList.defaultProps = {
  renderInCurrentItem: undefined,
};

LinkList.propTypes = {
  links: arrayOf(
    shape({
      url: string.isRequired,
      label: string.isRequired,
    })
  ).isRequired,
  renderInCurrentItem: func,
};

export default LinkList;
