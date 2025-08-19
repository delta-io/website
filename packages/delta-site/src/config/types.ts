/*
 * Collections
 */
import type { CollectionEntry } from "astro:content";

/** Collection types which qualify as "post" collections. */
export type Post = CollectionEntry<"blog" | "userStories">;

/** Collection types which have permalinks to static pages. */
export type PermalinkedCollection = CollectionEntry<
  "blog" | "userStories" | "profiles"
>;
