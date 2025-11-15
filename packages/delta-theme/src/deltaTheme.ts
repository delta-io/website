import type { AstroIntegration } from "astro";
import { themePlugin } from "./themePlugin";

export const deltaTheme = (): AstroIntegration[] => {
  return [themePlugin()];
};
