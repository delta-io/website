import styled from "styled-components";
import Link from "src/components/Link";
import color from "color";
import { bool } from "prop-types";

const Button = styled(Link)`
  display: inline-block;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  line-height: 1;
  background-color: ${(props) =>
    props.secondary ? "transparent" : props.theme.colors.primary};
  color: ${(props) => (props.secondary ? props.theme.colors.primary : "white")};
  border-radius: 0.25em;
  text-decoration: none;
  font-weight: ${(props) => props.theme.fontWeightBold};
  font-size: ${(props) => props.theme.fontSizes.primary};
  white-space: nowrap;
  border: 3px solid ${(props) => props.theme.colors.primary};

  &:hover {
    background-color: ${(props) =>
      color(props.theme.colors.primary).lighten(0.1)};
    border-color: ${(props) => color(props.theme.colors.primary).lighten(0.1)};
    color: white;
  }
`;

Button.propTypes = {
  secondary: bool,
};

export default Button;
