import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import type { PostMeta } from "@/lib/posts";
import { cn } from "@/lib/utils";

export function PostCard({
  post,
  className,
  large = false,
  delay = 0,
}: {
  post: PostMeta;
  className?: string;
  large?: boolean;
  delay?: number;
}) {
  return (
    <Link
      href={`/blog/post/${post.slug}`}
      className={cn("post-card group flex flex-col", className)}
      data-reveal
      style={{ "--d": delay } as React.CSSProperties}
    >
      <div className={cn("post-card-media", large ? "aspect-[16/10]" : "aspect-video")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.cover}
          alt=""
          width={1920}
          height={1080}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
          <span className="pill">{post.readingTime}</span>
          <span className="round-arrow">
            <FaArrowRight />
          </span>
        </div>
      </div>
      <div className="px-1 pt-5">
        <p className="text-[13px] font-medium text-muted-foreground">{post.dateFormatted}</p>
        <h3
          className={cn(
            "mt-2 font-semibold leading-[1.15] tracking-[-0.025em] text-balance",
            large ? "text-[26px] md:text-[34px]" : "text-[22px] md:text-[24px]"
          )}
        >
          <span className="post-card-title">{post.title}</span>
        </h3>
        <p className="mt-3 line-clamp-2 max-w-[560px] text-[15px] leading-relaxed text-muted-foreground">
          {post.description}
        </p>
      </div>
    </Link>
  );
}
