import { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { FeaturedPost } from "@/components/blog/featured-post";
import { PostIndex } from "@/components/blog/post-index";
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

        <section className="shell pb-14 pt-32 md:pb-20 md:pt-44">
          <div data-reveal>
            <BackLink href="/" label="Home" />
          </div>

          <div className="blog-head">
            <h1 className="blog-title font-display" data-reveal>
              Writ<span className="blog-title-outline">ing</span>
            </h1>
            <a href="/feed.xml" className="blog-chip blog-chip--rss">
              RSS
            </a>
            <span className="blog-chip blog-chip--count">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-6 border-t border-ink/10 pt-6 md:flex-row md:items-start md:justify-between" data-reveal>
            <p className="kicker">Blog</p>
            <p className="max-w-[420px] text-[17px] leading-relaxed text-muted-foreground">
              Deep dives into development, DevRel insights, and everything I
              learn along the way.
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
              <FeaturedPost post={featured} others={rest} />
              {rest.length > 0 && (
                <div className="mt-20 md:mt-28">
                  <div className="mb-6 flex items-end justify-between gap-6" data-reveal>
                    <h2 className="font-display text-[clamp(48px,7vw,104px)]">
                      More <span className="font-serif font-normal normal-case italic tracking-[-0.04em]">posts</span>
                    </h2>
                  </div>
                  <PostIndex
                    start={2}
                    posts={rest.map(({ slug, title, cover, dateFormatted, readingTime }) => ({
                      slug,
                      title,
                      cover,
                      dateFormatted,
                      readingTime,
                    }))}
                  />
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
