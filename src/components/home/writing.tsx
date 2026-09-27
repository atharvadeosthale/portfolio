import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/post-card";

export default function Writing() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;
  const [first, ...rest] = posts;

  return (
    <section id="writing" className="py-24 md:py-36">
      <div className="shell">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div data-reveal>
            <p className="kicker mb-5">Writing</p>
            <h2 className="font-display text-[clamp(64px,10vw,168px)]">
              Latest <span className="font-serif font-normal normal-case italic tracking-[-0.04em]">notes</span>
            </h2>
          </div>
          <Link href="/blog" className="btn btn-ghost self-start md:self-auto" data-reveal>
            All posts
            <FaArrowRight className="btn-arrow" />
          </Link>
        </div>

        <div className="grid gap-x-6 gap-y-14 lg:grid-cols-[1.35fr_1fr]">
          <PostCard post={first} large />
          <div className="grid gap-y-14 gap-x-6 sm:grid-cols-2 lg:grid-cols-1 lg:gap-y-10">
            {rest.map((post, i) => (
              <PostCard key={post.slug} post={post} delay={(i + 1) * 90} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
