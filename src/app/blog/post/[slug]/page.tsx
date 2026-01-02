import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getPostBySlug,
  getAllPostSlugs,
  extractTableOfContents,
} from "@/lib/posts";
import { AuthorBadge } from "@/components/blog/author-badge";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { mdxComponents } from "@/components/blog/mdx-components";
import { CodeCopyInjector } from "@/components/blog/code-copy-injector";
import Navbar from "@/components/navbar";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

// Generate static paths for all posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const postUrl = `https://atharva.codes/blog/post/${slug}`;

  return {
    title: `${post.title} — Atharva Deosthale`,
    description: post.description,
    authors: post.author ? [{ name: post.author.name }] : undefined,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: postUrl,
      siteName: "Atharva Deosthale",
      type: "article",
      publishedTime: post.date.toISOString(),
      authors: post.author ? [post.author.name] : undefined,
      images: post.cover
        ? [{ url: post.cover, width: 1920, height: 1080, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: post.cover ? "summary_large_image" : "summary",
      title: post.title,
      description: post.description,
      creator: "@atharvabuilds",
      images: post.cover ? [post.cover] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const toc = extractTableOfContents(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.cover,
    datePublished: post.date.toISOString(),
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
          image: post.author.image,
        }
      : undefined,
    publisher: {
      "@type": "Person",
      name: "Atharva Deosthale",
      url: "https://atharva.codes",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://atharva.codes/blog/post/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="relative">
        {/* Noise texture */}
        <div className="noise" />

        <Navbar />

        {/* Header */}
        <header className="py-16 md:py-24 border-b-2 border-foreground">
          <div className="max-w-[1200px] mx-auto px-6">
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Back to Blog
            </Link>

            <div className="max-w-4xl">
              {/* Reading time badge */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider border-2 border-primary text-primary px-3 py-1.5">
                  {post.readingTime}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-8">
                {post.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                {post.description}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 pt-8 border-t-2 border-foreground/10">
                {post.author && (
                  <AuthorBadge author={post.author} size="md" />
                )}
                <span className="font-mono text-sm text-muted-foreground">
                  {post.dateFormatted}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.cover && (
          <div className="border-b-2 border-foreground">
            <div className="max-w-[1400px] mx-auto px-6">
              <div className="relative aspect-video overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.cover}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="py-16 md:py-24">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex gap-16">
              {/* Table of Contents - Desktop */}
              {toc.length > 0 && (
                <aside className="hidden lg:block w-64 flex-shrink-0">
                  <div className="sticky top-24">
                    <TableOfContents items={toc} />
                  </div>
                </aside>
              )}

              {/* Article Content */}
              <article className="flex-1 min-w-0 max-w-3xl">
                {/* Table of Contents - Mobile */}
                {toc.length > 0 && (
                  <div className="lg:hidden mb-12">
                    <TableOfContents items={toc} />
                  </div>
                )}

                <div className="prose-editorial">
                  <CodeCopyInjector />
                  <MDXRemote
                    source={post.content}
                    components={mdxComponents}
                    options={{
                      mdxOptions: {
                        remarkPlugins: [remarkGfm],
                        rehypePlugins: [
                          rehypeSlug,
                          [
                            rehypePrettyCode,
                            {
                              theme: {
                                dark: "github-dark",
                                light: "github-light",
                              },
                              keepBackground: true,
                            },
                          ],
                        ],
                      },
                    }}
                  />
                </div>

                {/* Post Footer */}
                {post.author && (
                  <div className="mt-16 pt-8 border-t-2 border-foreground">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-8 border-2 border-foreground bg-card">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.author.image}
                        alt={post.author.name}
                        className="w-20 h-20 object-cover"
                      />
                      <div className="text-center sm:text-left">
                        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                          Written by
                        </span>
                        <Link
                          href={`/blog/author/${post.author.slug}`}
                          className="block font-serif text-2xl mt-2 hover:text-primary transition-colors"
                        >
                          {post.author.name}
                        </Link>
                        <p className="text-muted-foreground mt-2">
                          {post.author.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-8 border-t-2 border-foreground">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="font-mono text-sm text-muted-foreground">
                © {new Date().getFullYear()} Atharva Deosthale
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href="/"
                  className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/blog"
                  className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
