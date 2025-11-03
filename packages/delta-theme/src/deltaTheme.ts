import path from "path";
import { fileURLToPath } from "url";
import tailwind from "@astrojs/tailwind";
import favicons from "astro-favicons";
import type { AstroIntegration } from "astro";
import { themePlugin } from "./themePlugin";
import type { ConfigOptions as ThemeConfig } from "./configSchema";
import { searchPlugin } from "./searchPlugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const deltaTheme = (config: ThemeConfig): AstroIntegration[] => {
  const { title } = config;

  return [
    themePlugin(config),
    tailwind({
      configFile: path.resolve(__dirname, "./tailwind.config.ts"),
    }),
    searchPlugin(),
    favicons({
      name: title,
      short_name: title,
      background: "#042436",
      themes: ["#00ADD4"],
    }),
  ];
};
