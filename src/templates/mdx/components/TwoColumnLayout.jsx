import { func } from "prop-types";
import * as React from "react";
import Section, {
  containerPadding,
  containerWidth,
} from "src/components/Section";
import Grid from "src/components/Grid";
import styled from "styled-components";
import { rem, spacingRem } from "config/theme";

const sidebarWidthPx = {
  lg: 360,
  xl: 400,
};

const sidebarGutter = "xxl";

const WrapperSection = styled(Section)`
  background-color: white;
  position: relative;
  z-index: 1;
`;

const ColumnsGrid = styled(Grid)`
  position: relative;
  z-index: 1;
`;

const SidebarColumn = styled.div`
  padding-top: ${(props) => props.theme.spacing.xxl};
  border-top: 2px solid ${(props) => props.theme.colors.border};

  ${(props) =>
    props.theme.mediaBreakpointUp("lg")(`
      padding-top: 0;
      border-top: 0;
      color: ${props.theme.colors.textSecondary};
  `)};
`;

const computeSidebarDecorationOffset = (breakpoint) =>
  `calc(50% + (${parseInt(containerWidth[breakpoint], 10) / 2}rem - ${
    sidebarWidthPx[breakpoint]
  }px - ${containerPadding} - ${rem(spacingRem[sidebarGutter] / 2)}))`;

const SidebarDecoration = styled.div`
  display: none;
  position: absolute;
  z-index: 0;
  background-color: ${(props) => props.theme.light.bg};
  border-left: 1px solid ${(props) => props.theme.colors.border};

  ${(props) =>
    props.theme.mediaBreakpointMap({
      lg: `
      display: block;
      top: 0;
      right: 0;
      height: 100%;
      left: ${computeSidebarDecorationOffset("lg")};
    `,
      xl: `
      left: ${computeSidebarDecorationOffset("xl")};
    `,
    })};
`;

const TwoColumnLayout = (props) => {
  const { renderSidebar, children } = props;

  return (
    <WrapperSection padding="xxl">
      {renderSidebar && <SidebarDecoration />}
      <ColumnsGrid
        columns={
          renderSidebar
            ? {
                xs: 1,
                lg: ["auto", `${sidebarWidthPx.lg}px`],
                xl: ["auto", `${sidebarWidthPx.xl}px`],
              }
            : 1
        }
        gutter={renderSidebar ? sidebarGutter : undefined}
      >
        <div>{children}</div>
        {renderSidebar && <SidebarColumn>{renderSidebar()}</SidebarColumn>}
      </ColumnsGrid>
    </WrapperSection>
  );
};

TwoColumnLayout.defaultProps = {
  renderSidebar: undefined,
};

TwoColumnLayout.propTypes = {
  renderSidebar: func,
};

export default TwoColumnLayout;
