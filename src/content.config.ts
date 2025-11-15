import { defineCollection, z, reference } from "astro:content";
import { glob, file } from "astro/loaders";

/*
 * Abstract types
 */

const link = z.object({
  label: z.string(),
  url: z.string().url(),
});
const textOrLink = z.union([z.string(), link]);

/*
 * Collections
 */

const profiles = defineCollection({
  loader: glob({
    pattern: "**/index.md",
    base: "./src/content/profiles",
  }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      photo: image().optional(),
      role: z.string().optional(),
      quote: z.string().optional(),
      quoteSource: textOrLink.optional(),
      linkedin: z.string().url().optional(),
      videos: z.array(z.string()).optional(),
      otherReferences: z
        .array(
          z.object({
            title: z.string(),
            url: z.string(),
            publishedAt: z.coerce.date(),
            thumbnail: image(),
          }),
        )
        .optional(),
    }),
});

const blog = defineCollection({
  loader: glob({
    pattern: "**/index.md",
    base: "./src/content/blog",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      author: z.union([reference("profiles"), z.array(reference("profiles"))]),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      thumbnail: image(),
    }),
});

const userStories = defineCollection({
  loader: glob({
    pattern: "**/index.md",
    base: "./src/content/user-stories",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      author: reference("profiles"),
      publishedAt: z.coerce.date(),
      thumbnail: image(),
    }),
});

const integrations = ["community", "connectors", "services", "sharing"].reduce(
  (acc, name) => {
    return {
      ...acc,
      [`integration-${name}`]: defineCollection({
        loader: file(`./src/content/integrations/${name}.json`),
        schema: ({ image }) =>
          z.object({
            id: z.string(),
            name: z.string(),
            description: z.string(),
            url: z.string(),
            docs: z.string(),
            source_code: z.string(),
            tags: z.array(z.string()),
            thumbnail: image(),
          }),
      }),
    };
  },
  {},
);

export const collections = {
  blog,
  profiles,
  userStories,
  ...integrations,
};
