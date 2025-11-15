declare module "virtual:config" {
  interface SingleMenuItem {
    label: string;
    url: string;
    icon?: string;
  }

  interface GroupedMenuItem {
    label: string;
    items: SingleMenuItem;
    icon?: string;
  }

  export type MenuItem = SingleMenuItem | GroupedMenuItem;

  export interface SiteConfig {
    /** Website title */
    title: string;
    /** Website menus */
    menus: {
      header: MenuItem[];
      footerMain: MenuItem[];
      footerLearn: MenuItem[];
      footerCommunity: MenuItem[];
      social: MenuItem[];
    };
  }

  export const config: SiteConfig;
}
