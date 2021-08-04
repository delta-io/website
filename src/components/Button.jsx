import styled from "styled-components";
import { Link } from "gatsby";
import color from "color";

const Button = styled(Link)`
  display: inline-block;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border-radius: 0.25em;
  text-decoration: none;
  font-weight: ${(props) => props.theme.fontWeightBold};
  font-size: ${(props) => props.theme.fontSizes.primary};

  &:hover {
    background-color: ${(props) =>
      color(props.theme.colors.primary).lighten(0.1)};
  }
`;

export default Button;
