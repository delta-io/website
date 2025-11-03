import path from "path";
import { fileURLToPath } from "url";
import type { Config } from "tailwindcss";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const breakpoints = {
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
};

const config: Config = {
  content: [
    // Theme components
    `${path.resolve(__dirname, "./components")}/**/*.astro`,

    // Astro project "src" folder -- for custom styles
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      /*
       * Colors
       */
      colors: {
        primary: "#00add4",
        link: "#00819e",
        accent: "#ffda47",
        text: "#002638",
        textSecondary: "#536974",
        textThird: "#4F4F4F",
        bgLight: "#f5f8f9",
        bgLightSecond: "#F3FDFF",
        bgDark: "#042436",
        border: "#B9C0C1",
        borderLight: "#d6dadb",
        info: "#00add4",
        warning: "#ffda47",
        danger: "red",
        linkSubMenu: "#dee2e6",
        bgDarkBlue: "#195162",
        code: "#d63384",

        /* Theme color "mixins" */
        darkBg: "#042436" /* Should be replaced with bgDark */,
        darkColor: "#FFFFFF",
        darkTextSecondary: "#73828C",
        darkBorder: "#2C4553",

        lightBg: "#f5f8f9" /* Should be replaced with bgLight */,
        lightColor: "#002638" /* Should be replaced with text */,
      },

      /*
       * Typography (base)
       */
      fontFamily: {
        default: [
          "Source Sans Pro",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ],
        code: [
          "Source Code Pro Variable",
          "Source Code Pro",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        small: ["0.875rem", { lineHeight: "1.5" }] /* 14px */,
        primary: ["1.125rem", { lineHeight: "1.5" }] /* 18px */,
        secondary: ["1rem", { lineHeight: "1.5" }] /* 16px */,
        h1: ["3.375rem", { lineHeight: "1.2" }] /* 54px */,
        h2: ["2.625rem", { lineHeight: "1.2" }] /* 42px */,
        h3: ["2rem", { lineHeight: "1.2" }] /* 32px */,
        h4: ["1.5625rem", { lineHeight: "1.2" }] /* 25px */,
        h5: ["1.25rem", { lineHeight: "1.2" }] /* 20px */,
        h6: ["1rem", { lineHeight: "1.2" }] /* 16px */,
        code: ["0.9rem", { lineHeight: "1.2" }],
      },
      fontWeight: {
        normal: "400",
        bold: "600",
        code: "normal",
      },
      lineHeight: {
        base: "1.5",
        header: "1.2",
      },

      /*
       * Spacing
       * Used for margins, paddings, gap, etc...
       */
      spacing: {
        none: "0rem",
        xxs: "0.25rem" /* 4px */,
        xs: "0.375rem" /* 6px */,
        sm: "0.75rem" /* 12px */,
        md: "1.125rem" /* 18px */,
        lg: "1.5rem" /* 24px */,
        xl: "1.875rem" /* 30px */,
        xxl: "3.75rem" /* 60px */,
        xxxl: "6.25rem" /* 100px */,
      },

      /* Applying each breakpoint as an accessible `width` property */
      width: Object.keys(breakpoints).reduce((widths, bp) => {
        return {
          ...widths,
          [`screen-${bp}`]: breakpoints[bp as keyof typeof breakpoints],
        };
      }, {}),

      /*
       * Responsive breakpoints
       */
      screens: breakpoints,
    },
  },
};

export default config;
