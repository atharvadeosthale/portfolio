import { Metadata } from "next";
import { FeaturedPost } from "@/components/blog/featured-post";
import { BlogCard } from "@/components/blog/blog-card";
import { getAllPosts } from "@/lib/posts";
import Navbar from "@/components/navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Atharva Deosthale",
  description:
    "Thoughts on development, DevRel, and building things on the web.",
  alternates: {
    canonical: "https://atharva.codes/blog",
  },
  openGraph: {
    title: "Blog — Atharva Deosthale",
    description:
      "Thoughts on development, DevRel, and building things on the web.",
    url: "https://atharva.codes/blog",
    siteName: "Atharva Deosthale",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Blog — Atharva Deosthale",
    description:
      "Thoughts on development, DevRel, and building things on the web.",
    creator: "@atharvabuilds",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPost = posts.find((post) => post.featured);
  const otherPosts = posts.filter((post) => !post.featured);

  return (
    <main className="relative">
      {/* Noise texture */}
      <div className="noise" />

      <Navbar />

      {/* Hero */}
      <section className="py-16 md:py-24 border-b-2 border-foreground">
        <div className="max-w-[1200px] mx-auto px-6">
          <Link
            href="/"
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
            Back to Home
          </Link>

          <div className="flex items-end justify-between">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                Writing
              </span>
              <h1 className="font-serif text-5xl md:text-7xl mt-4">
                Thoughts &<br />
                <span className="text-primary">Tutorials</span>
              </h1>
              <p className="text-lg text-muted-foreground mt-6 max-w-xl">
                Deep dives into development, DevRel insights, and everything I
                learn along the way.
              </p>
            </div>
            <div className="hidden md:block h-[2px] flex-1 bg-foreground/10 ml-12 mb-4" />
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          {posts.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-foreground/20">
              <span className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
                No posts yet. Check back soon!
              </span>
            </div>
          ) : featuredPost ? (
            <>
              {/* Featured Post */}
              <div className="mb-16">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 block">
                  Featured Article
                </span>
                <FeaturedPost post={featuredPost} />
              </div>

              {/* Other Posts Grid */}
              {otherPosts.length > 0 && (
                <div>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 block">
                    All Articles
                  </span>
                  <div className="grid md:grid-cols-2 gap-8">
                    {otherPosts.map((post) => (
                      <BlogCard key={post.slug} post={post} />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Grid Layout - No Featured Post */
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 block">
                All Articles
              </span>
              <div className="grid md:grid-cols-2 gap-8">
                {posts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
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
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
