const remarkSlug = require("remark-slug");
const remarkGfm = require("remark-gfm");
const remarkHighlightJs = require("remark-highlight.js");
const { mdxPageTypes } = require("./config/pages");
const { searchPluginConfig } = require("./config/search");

module.exports = {
  siteMetadata: {
    siteUrl: "https://delta.io",
    title: "Delta Lake",
    description:
      "Delta Lake is an open-source storage layer that brings ACID transactions to Apache Spark and big data workloads.",
    twitter: "@DeltaLakeOSS",
  },
  plugins: [
    "gatsby-plugin-anchor-links",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: ["source sans pro:400,400i,600,600i", "source code pro:400"],
        display: "swap",
      },
    },
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
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: ["G-C2QGWXS5DG"],
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        remarkPlugins: [remarkSlug, remarkGfm, remarkHighlightJs],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 684 * 2,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              ignoreFileExtensions: ["png", "jpg", "jpeg"],
            },
          },
        ],
      },
    },
    "gatsby-transformer-json",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: "./src/data/",
      },
    },
    ...mdxPageTypes.map(({ name, path }) => ({
      resolve: "gatsby-source-filesystem",
      options: {
        name,
        path: `./${path}`,
      },
      __key: name,
    })),
    searchPluginConfig,
  ],
};
