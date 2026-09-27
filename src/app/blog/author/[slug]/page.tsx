import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAuthorBySlug, getAllAuthorSlugs } from "@/lib/authors";
import { getPostsByAuthor } from "@/lib/posts";
import { PostCard } from "@/components/blog/post-card";
import { BackLink } from "@/components/blog/page-header";
import Nav from "@/components/site/nav";
import Contact from "@/components/site/contact";

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

  const authorUrl = `https://www.atharva.codes/blog/author/${slug}`;

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
    <>
      <Nav />
      <main className="relative overflow-x-clip">
        <div className="page-glow" aria-hidden />

        <section className="shell pb-16 pt-32 md:pb-24 md:pt-44">
          <div data-reveal>
            <BackLink href="/blog" label="All posts" />
          </div>

          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end" data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={author.image}
              alt={author.name}
              width={160}
              height={160}
              className="h-28 w-28 rounded-full object-cover md:h-40 md:w-40"
            />
            <div>
              <p className="kicker mb-4">
                Author · {posts.length} {posts.length === 1 ? "post" : "posts"}
              </p>
              <h1 className="font-display text-[clamp(64px,11vw,176px)]">{author.name}</h1>
              <p className="mt-4 max-w-xl text-[19px] text-muted-foreground">{author.bio}</p>
            </div>
          </div>
        </section>

        <section className="shell pb-28 md:pb-40">
          {posts.length > 0 ? (
            <div className="grid gap-x-6 gap-y-14 border-t border-ink/10 pt-16 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <PostCard key={post.slug} post={post} delay={(i % 3) * 80} />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] bg-paper-2 px-6 py-24 text-center text-muted-foreground">
              No posts yet.
            </div>
          )}
        </section>
      </main>
      <Contact compact />
    </>
  );
}
