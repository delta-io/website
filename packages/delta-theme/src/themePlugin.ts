import type { AstroIntegration } from "astro";
import tailwindcss from "@tailwindcss/vite";

export const themePlugin = (): AstroIntegration => {
  return {
    name: "delta-theme",
    hooks: {
      "astro:config:setup": ({ updateConfig }) => {
        // Expose theme config as a virtual import via vite plugin
        updateConfig({
          vite: {
            plugins: [tailwindcss()],
          },
        });
      },
    },
  };
};
