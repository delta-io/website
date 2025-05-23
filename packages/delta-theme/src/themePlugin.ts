import type { AstroIntegration } from "astro";
import type { ConfigOptions } from "./configSchema";
import { makeViteVirtualImportPlugin } from "./utils/makeViteVirtualImportPlugin";

export const themePlugin = (config: ConfigOptions): AstroIntegration => {
  return {
    name: "delta-theme",
    hooks: {
      "astro:config:setup": ({ updateConfig }) => {
        // Expose theme config as a virtual import via vite plugin
        updateConfig({
          vite: {
            plugins: [
              makeViteVirtualImportPlugin(
                "delta-theme-config",
                "virtual:delta-theme/config",
                `export const config = ${JSON.stringify(config)}`,
              ),
            ],
          },
        });
      },
    },
  };
};
