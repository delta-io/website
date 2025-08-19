import type { PermalinkedCollection } from "@config/types";

/**
 * Gets a permalink for a given collection item
 *
 * @note Not all collection types are supported.
 */
export const getPermalink = (post: PermalinkedCollection): string => {
  // Add error checking
  if (!post || typeof post !== "object") {
    throw new Error("Invalid post object passed to getPermalink:", post);
  }

  // Check for collection property
  if (!post.collection) {
    throw new Error("Post missing collection property:", post);
  }

  const collectionRoutes: Record<string, string> = {
    blog: "blog",
    profiles: "profiles",
    userStories: "user-stories",
  };

  const route = collectionRoutes[post.collection];
  if (!route) {
    throw new Error(`Unknown collection type: ${post}`);
  }

  return `/${route}/${post.id}`;
};
