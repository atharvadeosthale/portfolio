import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAuthorBySlug, getAllAuthorSlugs } from "@/lib/authors";
import { getPostsByAuthor } from "@/lib/posts";
import { BlogCard } from "@/components/blog/blog-card";
import Navbar from "@/components/navbar";

// Generate static paths for all authors
export async function generateStaticParams() {
  const slugs = getAllAuthorSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    return {
      title: "Author Not Found",
    };
  }

  const authorUrl = `https://atharva.codes/blog/author/${slug}`;

  return {
    title: `${author.name} — Blog`,
    description: author.bio,
    alternates: {
      canonical: authorUrl,
    },
    openGraph: {
      title: `${author.name} — Blog`,
      description: author.bio,
      url: authorUrl,
      siteName: "Atharva Deosthale",
      type: "profile",
      images: author.image
        ? [{ url: author.image, width: 400, height: 400, alt: author.name }]
        : undefined,
    },
    twitter: {
      card: "summary",
      title: `${author.name} — Blog`,
      description: author.bio,
      creator: "@atharvabuilds",
      images: author.image ? [author.image] : undefined,
    },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const posts = getPostsByAuthor(slug);

  return (
    <main className="relative">
      {/* Noise texture */}
      <div className="noise" />

      <Navbar />

      {/* Author Header */}
      <section className="py-16 md:py-24 border-b-2 border-foreground">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors mb-12"
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

          <div className="grid md:grid-cols-[200px,1fr] gap-12 items-start">
            {/* Author Image */}
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={author.image}
                alt={author.name}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2">
                <span className="font-mono text-xs uppercase tracking-wider">
                  {posts.length} {posts.length === 1 ? "Post" : "Posts"}
                </span>
              </div>
            </div>

            {/* Author Info */}
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                Author
              </span>
              <h1 className="font-serif text-5xl md:text-7xl mt-4 mb-6">
                {author.name}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                {author.bio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8 block">
            Articles by {author.name}
          </span>

          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-foreground/20">
              <span className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
                No posts yet.
              </span>
            </div>
          )}
        </div>
      </section>

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
  );
}
