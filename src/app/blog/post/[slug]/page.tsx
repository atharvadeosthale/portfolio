import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getPostBySlug,
  getAllPostSlugs,
  getAllPosts,
  extractTableOfContents,
} from "@/lib/posts";
import { PostCard } from "@/components/blog/post-card";
import { AuthorBadge } from "@/components/blog/author-badge";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { mdxComponents } from "@/components/blog/mdx-components";
import { CodeCopyInjector } from "@/components/blog/code-copy-injector";
import { BackLink } from "@/components/blog/page-header";
import Nav from "@/components/site/nav";
import Contact from "@/components/site/contact";
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

  const postUrl = `https://www.atharva.codes/blog/post/${slug}`;

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

  const recentPosts = getAllPosts()
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

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
      url: "https://www.atharva.codes",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.atharva.codes/blog/post/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Nav />

      <main className="relative overflow-x-clip">
        <div className="page-glow" aria-hidden />

        {/* Header */}
        <header className="shell pb-12 pt-32 md:pb-16 md:pt-44">
          <div data-reveal>
            <BackLink href="/blog" label="All posts" />
          </div>

          <div className="mt-10 max-w-[1080px]" data-reveal>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px] font-medium text-muted-foreground">
              <span>{post.dateFormatted}</span>
              <span className="h-1 w-1 rounded-full bg-ink/30" />
              <span>{post.readingTime}</span>
            </div>

            <h1 className="mt-6 text-balance text-[clamp(40px,6.4vw,96px)] font-semibold leading-[0.98] tracking-[-0.045em]">
              {post.title}
            </h1>

            <div className="mt-10 flex flex-col gap-8 border-t border-ink/10 pt-8 md:flex-row md:items-start md:justify-between">
              <p className="max-w-[640px] text-pretty text-[19px] leading-relaxed text-muted-foreground md:text-[21px]">
                {post.description}
              </p>
              {post.author && <AuthorBadge author={post.author} size="md" className="shrink-0" />}
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {post.cover && (
          <div className="shell" data-reveal="scale">
            <div className="relative aspect-video overflow-hidden rounded-[clamp(20px,2.6vw,36px)] bg-ink/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover}
                alt={post.title}
                width={1920}
                height={1080}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="shell py-16 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,720px)] lg:justify-between xl:grid-cols-[260px_minmax(0,720px)_260px]">
            {/* Table of Contents - Desktop */}
            <aside className="hidden lg:block">
              {toc.length > 0 && (
                <div className="sticky top-28">
                  <TableOfContents items={toc} />
                </div>
              )}
            </aside>

            {/* Article Content */}
            <article className="min-w-0">
              {/* Table of Contents - Mobile */}
              {toc.length > 0 && (
                <div className="mb-12 lg:hidden">
                  <TableOfContents items={toc} />
                </div>
              )}

              <div className="article-body">
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
                <div className="mt-20 flex flex-col items-start gap-6 rounded-[28px] bg-paper-2 p-7 sm:flex-row sm:items-center md:p-9">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.author.image}
                    alt={post.author.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-[13px] font-medium text-muted-foreground">Written by</p>
                    <Link
                      href={`/blog/author/${post.author.slug}`}
                      className="mt-1 block text-[24px] font-semibold tracking-[-0.03em] hover:text-brand-text"
                    >
                      {post.author.name}
                    </Link>
                    <p className="mt-1 text-muted-foreground">{post.author.bio}</p>
                  </div>
                  <a href="#contact" className="btn btn-ink">
                    Say hello
                  </a>
                </div>
              )}
            </article>
          </div>
        </div>

        {/* Recent Posts */}
        {recentPosts.length > 0 && (
          <section className="shell pb-28 md:pb-40">
            <div className="mb-12 flex items-end justify-between border-t border-ink/10 pt-16">
              <h2 className="font-display text-[clamp(56px,8vw,128px)]">
                Keep <span className="font-serif font-normal normal-case italic tracking-[-0.04em]">reading</span>
              </h2>
            </div>
            <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((p, i) => (
                <PostCard key={p.slug} post={p} delay={i * 80} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Contact compact />
    </>
  );
}
