const scala = require("highlight.js/lib/languages/scala");
const dotenv = require("dotenv");
const { mdxPageTypes } = require("./config/pages");
const { searchPluginConfig } = require("./config/search");

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const wrapESMPlugin =
  (name) =>
  (opts) =>
  async (...args) => {
    const mod = await import(name);
    const plugin = mod.default(opts);
    return plugin(...args);
  };

module.exports = {
  siteMetadata: {
    siteUrl: "https://delta.io",
    title: "Delta Lake",
    description:
      "Delta Lake is an open-source storage framework that enables building a Lakehouse architecture with compute engines including Spark, PrestoDB, Flink, Trino, and Hive and APIs for Scala, Java, Rust, Ruby, and Python.",
    twitter: "@DeltaLakeOSS",
  },
  plugins: [
    "gatsby-plugin-netlify",
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
        trackingIds: ["GTM-P3C8QXQ"],
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
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
        mdxOptions: {
          // eslint-disable-next-line global-require
          remarkPlugins: [require("remark-gfm")],
          rehypePlugins: [
            wrapESMPlugin("rehype-slug"),
            [wrapESMPlugin("rehype-highlight"), { languages: { scala } }],
          ],
        },
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
