/**
 * Remark Directives
 *
 * @description
 * Custom remark-directive handlers that let blog posts (plain `.md`, no MDX)
 * author rich constructs with portable CommonMark `:::` directive syntax:
 *
 *   - Callouts   — :::tip / :::note / :::info / :::warning / :::caution / :::danger
 *   - Journeys   — a :::::journey wrapping ::::step[Title] items (a numbered timeline)
 *   - Diagrams   — ::likec4{view=<id>} (an interactive <likec4-view> web component)
 *
 * The directives are parsed by `remark-directive`; the handlers below project
 * them onto plain HTML elements + classes, which are then styled in
 * `src/layouts/theme.css` (scoped under `.typography-prose`). No React/MDX
 * runtime is involved — everything is static HTML plus, for diagrams, a single
 * lazily-loaded web-component bundle (see `src/components/LikeC4Loader.astro`).
 *
 * @usage
 * `remarkPlugins` is spread into `markdown.remarkPlugins` in `astro.config.mjs`.
 *
 * @development
 * Add new directive handlers here and append them to the exported array.
 */
import type { RemarkPlugins } from "astro";
import type { Root } from "mdast";
import remarkDirective from "remark-directive";
import { visit } from "unist-util-visit";

type RemarkPlugin = RemarkPlugins[number];

/* ---- Callouts ----------------------------------------------------------- */

const CALLOUT_TYPES = new Set([
  "tip",
  "note",
  "info",
  "warning",
  "caution",
  "danger",
]);

// Default heading per type. caution/danger keep their own word rather than
// sharing "Warning".
const CALLOUT_LABELS: Record<string, string> = {
  tip: "Tip",
  note: "Note",
  info: "Info",
  warning: "Warning",
  caution: "Caution",
  danger: "Danger",
};

// Inline SVG icon path(s) per type (lucide, MIT) — no icon-font/runtime dep.
// tip=lightbulb, note/info=info-circle, warning/caution=triangle-alert,
// danger=octagon-alert.
const CALLOUT_ICONS: Record<string, string> = {
  tip: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
  note: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  warning:
    '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  caution:
    '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  danger:
    '<path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86Z"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
};

function calloutIconSvg(type: string): string {
  return (
    '<svg class="callout-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ' +
    'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" ' +
    'stroke-linejoin="round" aria-hidden="true">' +
    (CALLOUT_ICONS[type] ?? CALLOUT_ICONS.note) +
    "</svg>"
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DirectiveNode = any;

/**
 * The directive label (`:::warning[Label]`) is a `directiveLabel` paragraph as
 * the node's first child; extract its text and remove it if present.
 */
function takeLabel(node: DirectiveNode): string | undefined {
  const first = node.children?.[0];
  if (first && first.data?.directiveLabel) {
    node.children.shift();
    return (
      first.children?.map((c: { value?: string }) => c.value ?? "").join("") ||
      undefined
    );
  }
  return undefined;
}

/**
 * Callout directives → `<aside class="callout" data-type="…">` with an icon +
 * title head and the body markdown preserved. Works for the container form
 * (`:::warning` … `:::`) authored in `.md` posts.
 */
const calloutDirective: RemarkPlugin = () => {
  return (tree: Root) => {
    visit(tree, (node: DirectiveNode) => {
      if (
        (node.type === "containerDirective" || node.type === "leafDirective") &&
        CALLOUT_TYPES.has(node.name)
      ) {
        const title = takeLabel(node) ?? CALLOUT_LABELS[node.name];

        const data = node.data || (node.data = {});
        data.hName = "aside";
        // Keep the legacy `callout-<name>` class alongside `data-type` so any
        // existing selectors/usage keep working.
        data.hProperties = {
          class: `callout callout-${node.name}`,
          "data-type": node.name,
        };

        // Prepend a raw-HTML head (icon + title). Body children stay as mdast so
        // their rich Markdown (prose, code, lists) renders normally after it.
        const head = {
          type: "html",
          value:
            '<div class="callout-head">' +
            calloutIconSvg(node.name) +
            `<span class="callout-title">${title}</span>` +
            "</div>",
        };
        node.children = [head, ...(node.children ?? [])];
      }
    });
  };
};

/* ---- Journey (step timeline) -------------------------------------------- */

/**
 * `:::::journey` → `<ol class="jr">`, and each nested `::::step[Title]` →
 * `<li class="jr-step">` with a bubble (step number comes from a CSS counter in
 * theme.css, so no index needs threading), an optional title, and a body.
 *
 *   :::::journey
 *   ::::step[Create the table]
 *   Body markdown…
 *   ::::
 *   :::::
 */
const journeyDirective: RemarkPlugin = () => {
  return (tree: Root) => {
    visit(tree, (node: DirectiveNode) => {
      if (node.type !== "containerDirective") return;

      if (node.name === "journey") {
        const data = node.data || (node.data = {});
        data.hName = "ol";
        data.hProperties = { class: "jr" };
        return;
      }

      if (node.name === "step") {
        const title = takeLabel(node);
        const data = node.data || (node.data = {});
        data.hName = "li";
        data.hProperties = { class: "jr-step" };

        const bubble = {
          type: "html",
          value: '<span class="jr-bubble" aria-hidden="true"></span>',
        };
        const titleNode = title
          ? [{ type: "html", value: `<div class="jr-title">${title}</div>` }]
          : [];
        // Wrap the step's body markdown so it can be offset from the bubble.
        const body = {
          type: "html",
          value: '<div class="jr-body">',
        };
        const bodyEnd = { type: "html", value: "</div>" };
        node.children = [
          bubble,
          ...titleNode,
          body,
          ...(node.children ?? []),
          bodyEnd,
        ];
      }
    });
  };
};

/* ---- Interactive LikeC4 diagram ----------------------------------------- */

/**
 * `::likec4{view=<id>}` → `<likec4-view view-id="<id>" dynamic-variant="sequence">`.
 * The custom element is defined by a pre-built web-component bundle the post
 * author commits to `public/likec4/likec4-webcomponent.mjs`; it is lazily loaded
 * on pages that contain a diagram by `src/components/LikeC4Loader.astro`.
 * Attribute names (`view-id`, `dynamic-variant`) match the bundle's
 * observedAttributes.
 */
const likec4Directive: RemarkPlugin = () => {
  return (tree: Root) => {
    visit(tree, (node: DirectiveNode) => {
      if (
        (node.type === "leafDirective" ||
          node.type === "textDirective" ||
          node.type === "containerDirective") &&
        node.name === "likec4"
      ) {
        const viewId = node.attributes?.view ?? node.attributes?.["view-id"];
        const data = node.data || (node.data = {});
        data.hName = "likec4-view";
        data.hProperties = {
          class: "likec4-view",
          "view-id": viewId,
          "dynamic-variant": "sequence",
        };
        // A diagram has no inner markdown; drop any stray children.
        node.children = [];
      }
    });
  };
};

export const remarkPlugins = [
  remarkDirective,
  calloutDirective,
  journeyDirective,
  likec4Directive,
];
