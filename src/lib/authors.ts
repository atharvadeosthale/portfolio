import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Author {
  slug: string;
  name: string;
  image: string;
  bio: string;
}

const authorsDirectory = path.join(process.cwd(), "content/authors");

export function getAuthorBySlug(slug: string): Author | null {
  try {
    const fullPath = path.join(authorsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      name: data.name,
      image: data.image,
      bio: data.bio,
    };
  } catch {
    return null;
  }
}

export function getAllAuthors(): Author[] {
  if (!fs.existsSync(authorsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(authorsDirectory);
  const authors = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      return getAuthorBySlug(slug);
    })
    .filter((author): author is Author => author !== null);

  return authors;
}

export function getAllAuthorSlugs(): string[] {
  if (!fs.existsSync(authorsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(authorsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}
