import { z } from "astro/zod";

const singleMenuItem = z.object({
  label: z.string(),
  url: z.string(),
  icon: z.string().optional(),
});

const groupedMenuItem = z.object({
  label: z.string(),
  items: z.array(singleMenuItem),
  icon: z.string().optional(),
});

const menuItem = z.union([singleMenuItem, groupedMenuItem]);

export const configSchema = z.object({
  title: z.string(),
  menus: z.object({
    header: z.array(menuItem),
    footerMain: z.array(menuItem),
    footerLearn: z.array(menuItem),
    footerCommunity: z.array(menuItem),
    social: z.array(menuItem),
  }),
});

export type ConfigOptions = z.infer<typeof configSchema>;
export type MenuItem = z.infer<typeof menuItem>;
