import { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/post-card";
import { BackLink } from "@/components/blog/page-header";
import Nav from "@/components/site/nav";
import Contact from "@/components/site/contact";

export const metadata: Metadata = {
  title: "Blog — Atharva Deosthale",
  description:
    "Thoughts on development, DevRel, and building things on the web.",
  alternates: {
    canonical: "https://www.atharva.codes/blog",
  },
  openGraph: {
    title: "Blog — Atharva Deosthale",
    description:
      "Thoughts on development, DevRel, and building things on the web.",
    url: "https://www.atharva.codes/blog",
    siteName: "Atharva Deosthale",
    type: "website",
    images: [{ url: "/og.jpg", width: 2400, height: 1260, alt: "Atharva Deosthale" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.jpg"],
    title: "Blog — Atharva Deosthale",
    description:
      "Thoughts on development, DevRel, and building things on the web.",
    creator: "@atharvabuilds",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const rest = posts.filter((post) => post !== featured);

  return (
    <>
      <Nav />
      <main className="relative overflow-x-clip">
        <div className="page-glow" aria-hidden />

        <section className="shell pb-16 pt-32 md:pb-24 md:pt-44">
          <div data-reveal>
            <BackLink href="/" label="Home" />
          </div>
          <div className="blog-head">
            <h1 className="blog-title font-display" data-reveal>
              Writ<span className="blog-title-outline">ing</span>
            </h1>
            <p
              className="mt-8 max-w-[340px] text-[17px] leading-relaxed text-muted-foreground md:ml-auto"
              data-reveal
            >
              Deep dives into development, DevRel insights, and everything I
              learn along the way.
              <span className="mt-4 block text-[13px] font-medium text-foreground">
                {posts.length} {posts.length === 1 ? "post" : "posts"}
              </span>
            </p>
          </div>
        </section>

        <section className="shell pb-28 md:pb-40">
          {posts.length === 0 ? (
            <div className="rounded-[28px] bg-paper-2 px-6 py-24 text-center text-muted-foreground">
              No posts yet. Check back soon!
            </div>
          ) : (
            <>
              <PostCard post={featured} large className="lg:max-w-none" />
              {rest.length > 0 && (
                <div className="mt-16 grid gap-x-6 gap-y-14 border-t border-ink/10 pt-16 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post, i) => (
                    <PostCard key={post.slug} post={post} delay={(i % 3) * 80} />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Contact compact />
    </>
  );
}
