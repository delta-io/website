import * as React from "react";
import { number, string } from "prop-types";
import { graphql, useStaticQuery } from "gatsby";

const query = graphql`
  query SeoQuery {
    site {
      siteMetadata {
        title
        description
        twitter
        siteUrl
      }
    }
  }
`;

const SEO = (props) => {
  const { title, description, thumbnailPath, pageIndex, children, slug } =
    props;

  const { site } = useStaticQuery(query);

  const documentTitle = `${
    pageIndex > 1 ? `${title} - Page ${pageIndex}` : title
  } | ${site.siteMetadata.title}`;

  const BASE_URL = "https://website-git-main-dev-smart-ui.vercel.app";

  // const urlImage = `${site.siteMetadata.siteUrl}${thumbnailPath}`;
  // const url = `${site.siteMetadata.siteUrl}${slug}`;
  const image = `${BASE_URL}${thumbnailPath}`;
  const url = `${BASE_URL}${slug}`;

  return (
    <>
      <title>{documentTitle}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="image" property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="og:type" property="article" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata.twitter} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {children}
    </>
  );
};

SEO.defaultProps = {
  pageIndex: 0,
  description: "",
  thumbnailPath: undefined,
};

SEO.propTypes = {
  title: string.isRequired,
  description: string,
  thumbnailPath: string,
  pageIndex: number,
};

export default SEO;
