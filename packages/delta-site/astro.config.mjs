import sitemap from "@astrojs/sitemap";
import { defineConfig, envField } from "astro/config";
import { deltaTheme, remarkPlugins } from "delta-theme";

// https://astro.build/config
export default defineConfig({
  site: "https://delta-io-staging.netlify.app/",
  scopedStyleStrategy: "where",
  env: {
    schema: {
      YOUTUBE_API_KEY: envField.string({ context: "server", access: "secret" }),
    },
    validateSecrets: true,
  },
  markdown: {
    remarkPlugins,
  },
  image: {
    domains: [],
    formats: ["png", "jpg", "jpeg", "webp", "gif", "svg"],
  },
  redirects: {
    "/blog/1": "/blog",
    "/user-stories/1": "/user-stories",
  },
  integrations: [
    sitemap(),
    deltaTheme({
      title: "Delta Lake",
      menus: {
        header: [
          { label: "Sharing", url: "/sharing" },
          { label: "Integrations", url: "/integrations" },
          {
            label: "Learn",
            items: [
              { label: "Getting Started", url: "/learn/getting-started" },
              { label: "Blogs", url: "/blog" },
              { label: "Tutorials", url: "/learn/tutorials" },
              { label: "Videos", url: "/learn/videos" },
              { label: "Case Studies", url: "/user-stories" },
            ],
          },
          { label: "Roadmap", url: "/roadmap" },
          { label: "Community", url: "/community" },
          {
            label: "Docs",
            url: "https://delta-docs-incubator.netlify.app/latest/",
          },
        ],
        footerMain: [
          {
            url: "/sharing",
            label: "Sharing",
          },
          {
            url: "/integrations",
            label: "Integrations",
          },
          {
            url: "/roadmap",
            label: "Roadmap",
          },
          {
            url: "/blog",
            label: "Blogs",
          },
        ],
        footerLearn: [
          {
            label: "Getting Started",
            url: "/learn/getting-started",
          },
          {
            label: "Blogs",
            url: "/blog",
          },
          {
            label: "Tutorials",
            url: "/learn/tutorials/",
          },
          {
            label: "Videos",
            url: "/learn/videos/",
          },
          {
            label: "Case Studies",
            url: "/user-stories",
          },
        ],
        footerCommunity: [
          {
            url: "/community",
            label: "Community",
          },
          {
            url: "/resources/getting-help",
            label: "Getting Help",
          },
          {
            url: "/resources/contributing-to-delta",
            label: "Contributing to Delta",
          },
        ],
        social: [
          {
            label: "StackOverflow",
            url: "https://stackoverflow.com/questions/tagged/delta-lake",
            icon: "stackOverflow",
          },
          {
            label: "GitHub",
            url: "https://go.delta.io/github",
            icon: "github",
          },
          {
            label: "Twitter",
            url: "https://go.delta.io/twitter",
            icon: "twitter",
          },
          {
            label: "Slack",
            url: "https://go.delta.io/slack",
            icon: "slack",
          },
          {
            label: "LinkedIn",
            url: "https://go.delta.io/linkedin",
            icon: "linkedin",
          },
        ],
      },
    }),
  ],
});
