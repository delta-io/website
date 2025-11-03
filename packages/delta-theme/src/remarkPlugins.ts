/**
 * Remark Directives
 *
 * @description
 * Creates a directive that can be used in Markdown
 *
 * @usage
 * Import `remarkCustomDirectives` and _spread_ it in your remark plugins array:
 * ```ts
 * {
 *   remarkPlugins: [...remarkCustomDirectives]
 * }
 * ```
 *
 * @development
 * Add your custom remark directives as plugins to the `remarkCustomDirectives`
 * array in this file.
 */
import type { RemarkPlugins } from "astro";
import remarkDirective from "remark-directive";
import { visit } from "unist-util-visit";

type RemarkPlugin = RemarkPlugins[number];

/**
 * Callout directives
 *
 * @description
 * Used to create "callout" directives
 *
 * - :::note
 * - :::info
 * - :::warning
 * - :::danger
 *
 * @dependency remark-directive
 */
const noteDirective: RemarkPlugin = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === "containerDirective" || node.type === "leafDirective") {
        if (
          node.name === "note" ||
          node.name === "info" ||
          node.name === "warning" ||
          node.name === "danger"
        ) {
          const data = node.data || (node.data = {});

          data.hName = "div";
          data.hProperties = {
            class: `callout callout-${node.name}`,
          };
        }

        return;
      }
    });
  };
};

export const remarkPlugins = [remarkDirective, noteDirective];
