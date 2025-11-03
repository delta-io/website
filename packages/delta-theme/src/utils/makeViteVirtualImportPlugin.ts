import type { AstroConfig } from "astro";

type VitePlugin = NonNullable<AstroConfig["vite"]["plugins"]>[number];

export const makeViteVirtualImportPlugin = (
  pluginName: string,
  importName: string,
  contents: string,
): VitePlugin => {
  return {
    name: pluginName,
    resolveId(id) {
      if (id === importName) {
        return `\0${importName}`;
      }

      return;
    },
    load(id) {
      if (id === `\0${importName}`) {
        return contents;
      }

      return;
    },
  };
};
