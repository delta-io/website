import type { AstroIntegration } from "astro";
import { themePlugin } from "./themePlugin";
import { searchPlugin } from "./searchPlugin";

export const deltaTheme = (): AstroIntegration[] => {
  return [themePlugin(), searchPlugin()];
};
