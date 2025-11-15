declare module "*.svg" {
  import type { ComponentProps } from "astro/types";
  const content: (props: ComponentProps<"svg">) => JSX.Element;
  export default content;
}
