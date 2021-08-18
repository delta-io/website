/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import Link from "src/components/Link";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import Typography from "src/components/Typography";
import styled from "styled-components";
import JsonCardDataList from "src/components/pages/shared/JsonCardDataList";

const Image = styled.img`
  max-width: 100%;
`;

const mdxComponents = {
  p: (props) => <Typography variant="p" {...props} />,
  h1: (props) => <Typography variant="h1" {...props} />,
  h2: (props) => <Typography variant="h2" {...props} />,
  h3: (props) => <Typography variant="h3" {...props} />,
  h4: (props) => <Typography variant="h4" {...props} />,
  h5: (props) => <Typography variant="h5" {...props} />,
  h6: (props) => <Typography variant="h6" {...props} />,
  ol: (props) => <Typography variant="ol" {...props} />,
  ul: (props) => <Typography variant="ul" {...props} />,
  a: Link,
  li: (props) => <Typography variant="li" {...props} />,
  hr: (props) => <Typography variant="hr" {...props} />,
  thematicBreak: (props) => <Typography variant="hr" {...props} />,
  img: (props) => <Image {...props} />,

  // Custom components
  JsonCardDataList,
};

const MDX = (props) => {
  const { children } = props;

  return (
    <MDXProvider components={mdxComponents}>
      <MDXRenderer>{children}</MDXRenderer>
    </MDXProvider>
  );
};

export default MDX;
