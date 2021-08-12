import * as React from "react";
import Link from "src/components/Link";
import LinkList from "src/components/LinkList";
import Typography from "src/components/Typography";
import useIdObserver from "src/hooks/useIdObserver";
import styled from "styled-components";

const TableOfContentsLinkTitle = styled(Typography)`
  text-transform: uppercase;
  font-weight: ${(props) => props.theme.fontWeightBold};
  color: ${(props) => props.theme.light.color};
`;

const TableOfContentsLink = styled(Link)`
  ${(props) =>
    props.active ? `font-weight: ${props.theme.fontWeightBold};` : ""}
  text-decoration: none;
  color: ${(props) => props.theme.light.color};

  &:hover {
    text-decoration: underline;
  }
`;

const observeTocItems = (tocItems, observer) => {
  tocItems.forEach(({ url, items: childItems }) => {
    if (url) {
      const el = document.getElementById(url.replace(/^#/, ""));

      if (el && observer) {
        observer.observe(el);
      }
    }

    if (childItems) {
      observeTocItems(childItems);
    }
  });
};

const activateItems = (items, activeId) =>
  items.map((item) => ({
    ...item,
    label: item.title,
    active: item.url === activeId,
    items: item.items ? activateItems(item.items, activeId) : undefined,
  }));

const TableOfContents = (props) => {
  const { items, showTitle } = props;
  const activeId = useIdObserver((observer) =>
    observeTocItems(items, observer)
  );

  return (
    <>
      {showTitle && (
        <TableOfContentsLinkTitle variant="p2">
          On this page
        </TableOfContentsLinkTitle>
      )}
      <LinkList
        links={activateItems(items, `#${activeId}`)}
        linkComponent={TableOfContentsLink}
      />
    </>
  );
};

export default TableOfContents;
