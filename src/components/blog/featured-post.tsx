import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import type { PostMeta } from "@/lib/posts";

// The lead story on /blog: big type on ink, with the covers fanned out like
// prints on a desk. The covers are sparse by design, so the title carries it.
export function FeaturedPost({ post, others }: { post: PostMeta; others: PostMeta[] }) {
  const behind = others.slice(0, 2);

  return (
    <Link href={`/blog/post/${post.slug}`} className="feature group" data-reveal>
      <div className="feature-glow" aria-hidden />

      <div className="feature-copy">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="feature-tag">{post.featured ? "Featured" : "Latest"}</span>
          <span className="text-[13px] font-medium text-paper-2/55">
            {post.dateFormatted} · {post.readingTime}
          </span>
        </div>

        <h2 className="feature-title font-display">{post.title}</h2>

        <p className="feature-desc">{post.description}</p>

        <span className="feature-cta">
          <span className="round-arrow bg-brand text-brand-ink">
            <FaArrowRight />
          </span>
          Read the post
        </span>
      </div>

      <div className="feature-stack" aria-hidden>
        {behind.map((p, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={p.slug}
            src={p.cover}
            alt=""
            width={1920}
            height={1080}
            loading="lazy"
            className={`feature-print feature-print--${i + 1}`}
          />
        ))}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.cover}
          alt=""
          width={1920}
          height={1080}
          className="feature-print feature-print--main"
        />
      </div>
    </Link>
  );
}
