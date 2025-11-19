import type { ComponentProps } from "astro/types";
import Icon from "./components/Icon.astro";

/*
 * Compnoents
 */
type IconType = ComponentProps<typeof Icon>["icon"];

/*
 * Menus
 */
interface SingleMenuItem {
  label: string;
  url: string;
  icon?: IconType;
}

interface GroupMenuItem {
  label: string;
  items: SingleMenuItem[];
  icon?: IconType;
}

export type MenuItem = SingleMenuItem | GroupMenuItem;
