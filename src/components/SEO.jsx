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
  const { title, description, thumbnailPath, pageIndex, children } = props;

  console.log("inside of", props);

  const { site } = useStaticQuery(query);

  console.log("site", site);

  const urlImage = `${site.siteMetadata.siteUrl}${thumbnailPath}`;
  console.log("url image", urlImage);

  const documentTitle = `${
    pageIndex > 1 ? `${title} - Page ${pageIndex}` : title
  } | ${site.siteMetadata.title}`;

  return (
    <>
      <title>{documentTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta
        name="image"
        content={`${site.siteMetadata.siteUrl}${thumbnailPath}`}
      />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta
        name="og:image"
        property={`${site.siteMetadata.siteUrl}${thumbnailPath}`}
      />
      <meta name="og:type" property="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata.twitter} />
      <meta
        name="twitter:image"
        content={`${site.siteMetadata.siteUrl}${thumbnailPath}`}
      />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
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
