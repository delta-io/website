import { spawn } from "node:child_process";
import { dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import type { AstroIntegration, AstroIntegrationLogger } from "astro";

export const searchPlugin = (): AstroIntegration => {
  return {
    name: "delta-lake-search-plugin",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        if (import.meta.env.DEV) return;

        /**
         * Index the site using pagefind for site search
         */
        const loglevelFlag = getPagefindLoggingFlags(logger.options.level);
        const targetDir = fileURLToPath(dir);
        const cwd = dirname(fileURLToPath(import.meta.url));
        const relativeDir = relative(cwd, targetDir);
        return new Promise<void>((resolve) => {
          spawn(
            "npx",
            [
              "-y",
              "pagefind",
              ...loglevelFlag,
              "--site",
              relativeDir,
              "--exclude-selectors",
              "[data-pagefind-ignore]",
            ],
            {
              stdio: "inherit",
              shell: true,
              cwd,
            },
          ).on("close", () => resolve());
        });
      },
    },
  };
};

/** Map the logging level of Astro's logger to one of Pagefind's logging level flags. */
function getPagefindLoggingFlags(
  level: AstroIntegrationLogger["options"]["level"],
) {
  switch (level) {
    case "silent":
    case "error":
      return ["--silent"];
    case "warn":
      return ["--quiet"];
    case "debug":
      return ["--verbose"];
    case "info":
    default:
      return [];
  }
}
