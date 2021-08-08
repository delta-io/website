import * as React from "react";
import styled from "styled-components";
import Link from "src/components/Link";
import { rem, spacingRem } from "config/theme";

const LinkListNav = styled.nav`
  display: grid;
  grid-template-rows: auto;
  row-gap: ${(props) => props.theme.spacing.xs};
  align-content: start;
`;

const LinkList = (props) => {
  const { links, title, linkComponent, className } = props;
  const LinkComponent = linkComponent || Link;

  const renderItems = (items, level = 0) =>
    items.map((item) => (
      <React.Fragment key={item.url}>
        <LinkComponent
          href={item.url}
          style={{ marginLeft: rem(spacingRem.sm * level) }}
        >
          {item.title}
        </LinkComponent>
        {item.items?.length > 0 && renderItems(item.items, level + 1)}
      </React.Fragment>
    ));

  return (
    <LinkListNav className={className}>
      {title}
      {renderItems(links)}
    </LinkListNav>
  );
};

export default LinkList;
