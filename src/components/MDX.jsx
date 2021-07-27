import * as React from "react";
import { Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import CardDataList from "src/components/CardDataList";

const mdxComponents = {
  // eslint-disable-next-line react/jsx-props-no-spreading
  a: ({ href, ...props }) => <Link to={href} {...props} />,

  // Custom components
  CardDataList,
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
