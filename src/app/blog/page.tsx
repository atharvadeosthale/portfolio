import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FeaturedPost } from "@/components/blog/featured-post";
import { BlogCard } from "@/components/blog/blog-card";
import { getAllPosts } from "@/lib/posts";
import Navbar from "@/components/navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Atharva Deosthale",
  description:
    "Thoughts on development, DevRel, and building things on the web.",
  openGraph: {
    title: "Blog — Atharva Deosthale",
    description:
      "Thoughts on development, DevRel, and building things on the web.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPost = posts.find((post) => post.featured);
  const otherPosts = posts.filter((post) => !post.featured);

  return (
    <Container>
      <Navbar />

      <main className="pt-4 pb-10 md:pt-6 md:pb-16">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            ← Back to Home
          </Link>
          <SectionHeader
            overline="Blog"
            title="Thoughts & Tutorials"
          />
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No posts yet. Check back soon!</p>
          </div>
        ) : featuredPost ? (
          <>
            {/* Featured Post */}
            <div className="mb-12">
              <FeaturedPost post={featuredPost} />
            </div>

            {/* Other Posts Grid */}
            {otherPosts.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                {otherPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </>
        ) : (
          /* Grid Layout - No Featured Post */
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
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
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              RSS
            </Link>
          </div>
        </div>
      </footer>
    </Container>
  );
}
