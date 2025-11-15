import favicons from "astro-favicons";
import type { AstroIntegration } from "astro";
import { themePlugin } from "./themePlugin";
import type { ConfigOptions as ThemeConfig } from "./configSchema";
import { searchPlugin } from "./searchPlugin";

export const deltaTheme = (config: ThemeConfig): AstroIntegration[] => {
  const { title } = config;

  return [
    themePlugin(config),
    searchPlugin(),
    favicons({
      name: title,
      short_name: title,
      background: "#042436",
      themes: ["#00ADD4"],
    }),
  ];
};
