import * as React from "react";
import { string, number } from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const siteQuery = graphql`
  query SiteQuery {
    site {
      siteMetadata {
        title
        description
        twitter
      }
    }
  }
`;

const SEO = (props) => {
  const {
    title,
    description = "",
    lang = "en",
    meta: customMeta = [],
    pageIndex,
  } = props;

  const { site } = useStaticQuery(siteQuery);

  const meta = [];

  if (description) {
    meta.push({
      name: "description",
      content: description,
    });
  }

  /**
   * Open graph metadata
   */

  if (title) {
    meta.push({
      property: "og:title",
      content: title,
    });
  }

  if (description) {
    meta.push({
      property: "og:description",
      content: description,
    });
  }

  meta.push({
    property: "og:type",
    content: "website",
  });

  /**
   * Twitter metadata
   */

  meta.push({
    name: "twitter:card",
    content: "summary",
  });

  meta.push({
    name: "twitter:creator",
    content: site.siteMetadata.twitter,
  });

  if (title) {
    meta.push({
      name: "twitter:title",
      content: title,
    });
  }

  if (description) {
    meta.push({
      name: "twitter:description",
      content: description,
    });
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={pageIndex > 1 ? `${title} - Page ${pageIndex}` : title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[...meta, ...customMeta]}
    />
  );
};

SEO.defaultProps = {
  pageIndex: 0,
};

SEO.propTypes = {
  title: string.isRequired,
  pageIndex: number,
};

export default SEO;
