import sitemap from "@astrojs/sitemap";
import { defineConfig, envField } from "astro/config";
import expressiveCode from "astro-expressive-code";
import favicons from "astro-favicons";
import astroOrbit from "astro-orbit";
import astroConfig from "astro-config";
import netlify from "@astrojs/netlify";
import { remarkPlugins } from "./lib/remarkPlugins";
import { searchPlugin } from "./lib/searchPlugin";

const siteTitle = "Delta Lake";

export default defineConfig({
  site: "https://delta.io/",
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
  adapter: netlify({
    imageCDN: false,
  }),
  integrations: [
    // Expressive Code renders Markdown code fences with an inline copy button,
    // optional titles/frames (```bash title="server.properties"), and line
    // highlighting. Themed to the site palette: dark navy surface + cyan/yellow
    // accents. Registered first so it processes all Markdown code blocks.
    expressiveCode({
      themes: ["github-dark"],
      styleOverrides: {
        borderRadius: "0.5rem",
        borderColor: "transparent",
        codeBackground: "#042436",
        frames: {
          editorActiveTabIndicatorTopColor: "#00add4",
          editorTabBarBackground: "#031b29",
          editorActiveTabBackground: "#042436",
          terminalTitlebarBackground: "#031b29",
          terminalBackground: "#042436",
          inlineButtonBorder: "transparent",
        },
      },
    }),
    sitemap(),
    favicons({
      name: siteTitle,
      short_name: siteTitle,
      background: "#042436",
      themes: ["#00ADD4"],
    }),
    searchPlugin(),
    astroOrbit(),
    astroConfig({
      name: "config",
      config: {
        title: siteTitle,
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
              url: "https://docs.delta.io/",
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
      },
    }),
  ],
});
