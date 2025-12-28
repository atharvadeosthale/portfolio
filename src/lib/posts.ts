import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { getAuthorBySlug, type Author } from "./authors";

export interface PostFrontmatter {
  title: string;
  date: string;
  cover: string;
  author: string;
  description: string;
  featured?: boolean;
}

export interface Post {
  slug: string;
  title: string;
  date: Date;
  dateFormatted: string;
  cover: string;
  author: Author | null;
  description: string;
  readingTime: string;
  featured: boolean;
  content: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: Date;
  dateFormatted: string;
  cover: string;
  author: Author | null;
  description: string;
  readingTime: string;
  featured: boolean;
}

const postsDirectory = path.join(process.cwd(), "content/posts");

function parseDate(dateStr: string): Date {
  // Parse DD-MM-YYYY format
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const frontmatter = data as PostFrontmatter;

    const date = parseDate(frontmatter.date);
    const stats = readingTime(content);

    return {
      slug,
      title: frontmatter.title,
      date,
      dateFormatted: formatDate(date),
      cover: frontmatter.cover,
      author: getAuthorBySlug(frontmatter.author),
      description: frontmatter.description,
      readingTime: stats.text,
      featured: frontmatter.featured ?? false,
      content,
    };
  } catch {
    return null;
  }
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const post = getPostBySlug(slug);
      if (!post) return null;

      // Return without content for list views
      const { content: _, ...meta } = post;
      return meta;
    })
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return posts;
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getPostsByAuthor(authorSlug: string): PostMeta[] {
  return getAllPosts().filter((post) => post.author?.slug === authorSlug);
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export function extractTableOfContents(content: string): TableOfContentsItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TableOfContentsItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    toc.push({ id, title, level });
  }

  return toc;
}
