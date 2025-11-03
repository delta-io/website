import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("blog");

  // Sort posts by publishedAt date (newest first)
  posts.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );

  // Filter out posts that don't have required fields
  const validPosts = posts.filter((post) => {
    return post.data.title && post.data.description && post.data.publishedAt;
  });

  return rss({
    title: "Delta Lake Blog",
    description:
      "Latest news, updates, and insights from the Delta Lake project",
    site: context.site,
    items: validPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/blog/${post.id}/`,
      ...(post.data.updatedAt && { updatedDate: post.data.updatedAt }),
    })),
    customData: `<language>en-us</language>`,
  });
}
