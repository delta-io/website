const { mdxPageTypes } = require("./config/pages");

module.exports = {
  siteMetadata: {
    siteUrl: "https://delta.io",
    title: "Delta Lake",
    description:
      "Delta Lake is an open-source storage layer that brings ACID transactions to Apache Spark and big data workloads.",
    twitter: "@DeltaLakeOSS",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Delta Lake",
        short_name: "Delta Lake",
        start_url: "/",
        background_color: "#042436",
        theme_color: "#00ADD4",
        icon: "static/images/icon.png",
        icon_options: {
          purpose: "maskable",
        },
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    ...mdxPageTypes.map(({ name, path }) => ({
      resolve: "gatsby-source-filesystem",
      options: {
        name,
        path: `./${path}`,
      },
      __key: name,
    })),
  ],
};
