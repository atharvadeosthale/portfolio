import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPostSlugs, extractTableOfContents } from "@/lib/posts";
import { Container } from "@/components/ui/Container";
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

  return {
    title: `${post.title} — Atharva Deosthale`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date.toISOString(),
      authors: post.author ? [post.author.name] : undefined,
      images: post.cover ? [post.cover] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
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

  return (
    <Container>
      <Navbar />

      <main className="pt-4 pb-10 md:pt-6 md:pb-16">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back to Blog
        </Link>

        {/* Cover Image */}
        {post.cover && (
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 ring-1 ring-border/50 shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          </div>
        )}

        {/* Post Header */}
        <header className="mb-12">
          {/* Reading time badge */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium ring-1 ring-primary/20">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readingTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 display">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">
            {post.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-border/50">
            {post.author && (
              <>
                <AuthorBadge author={post.author} size="md" />
                <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              </>
            )}
            <time className="text-sm text-muted-foreground">
              {post.dateFormatted}
            </time>
          </div>
        </header>

        {/* Content Layout */}
        <div className="flex gap-10">
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
              <div className="lg:hidden mb-8">
                <TableOfContents items={toc} />
              </div>
            )}

            <div>
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
            <div className="mt-16 pt-8 border-t border-border/50">
              {post.author && (
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-6 rounded-xl bg-secondary/5 ring-1 ring-border/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.author.image}
                    alt={post.author.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-border"
                  />
                  <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground mb-1">Written by</p>
                    <Link href={`/blog/author/${post.author.slug}`} className="font-semibold hover:text-primary transition-colors">
                      {post.author.name}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">{post.author.bio}</p>
                  </div>
                </div>
              )}
            </div>
          </article>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Atharva Deosthale
          </p>
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>
      </footer>
    </Container>
  );
}
