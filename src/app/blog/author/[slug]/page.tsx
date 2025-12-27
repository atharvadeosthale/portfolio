import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAuthorBySlug, getAllAuthorSlugs } from "@/lib/authors";
import { getPostsByAuthor } from "@/lib/posts";
import { Container } from "@/components/ui/Container";
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

  return {
    title: `${author.name} — Blog`,
    description: author.bio,
    openGraph: {
      title: `${author.name} — Blog`,
      description: author.bio,
      type: "profile",
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
    <Container>
      <Navbar />

      <main className="pt-4 pb-10 md:pt-6 md:pb-16">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          ← Back to Blog
        </Link>

        {/* Author Header */}
        <div className="flex flex-col items-center text-center mb-16">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={author.image}
            alt={author.name}
            className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover ring-4 ring-border mb-6"
          />
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 display">
            {author.name}
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mb-2">
            {author.bio}
          </p>
          <p className="text-sm text-muted-foreground">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No posts yet.</p>
          </div>
        )}
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
