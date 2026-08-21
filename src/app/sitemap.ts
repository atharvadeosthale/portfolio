import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getAllAuthorSlugs } from "@/lib/authors";

const BASE_URL = "https://www.atharva.codes";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latestPostDate = posts.length > 0 ? posts[0].date : new Date();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/post/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const authorEntries: MetadataRoute.Sitemap = getAllAuthorSlugs().map(
    (slug) => ({
      url: `${BASE_URL}/blog/author/${slug}`,
      lastModified: latestPostDate,
      changeFrequency: "monthly",
      priority: 0.4,
    })
  );

  return [
    {
      url: BASE_URL,
      lastModified: latestPostDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...postEntries,
    ...authorEntries,
  ];
}
