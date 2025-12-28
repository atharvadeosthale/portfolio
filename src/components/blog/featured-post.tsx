import Link from "next/link";
import { cn } from "@/lib/utils";
import { AuthorBadge } from "./author-badge";
import type { PostMeta } from "@/lib/posts";

interface FeaturedPostProps {
  post: PostMeta;
  className?: string;
}

export function FeaturedPost({ post, className }: FeaturedPostProps) {
  return (
    <Link href={`/blog/post/${post.slug}`} className="block group">
      <article
        className={cn(
          "relative rounded-2xl overflow-hidden",
          "bg-gradient-to-br from-primary/5 via-transparent to-accent/5",
          "ring-1 ring-border/50 hover:ring-primary/30",
          "shadow-xl hover:shadow-2xl hover:shadow-primary/5",
          "transition-all duration-500",
          className
        )}
      >
        {/* Gradient border glow effect */}
        <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/20 via-transparent to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />

        {/* Cover Image with Gradient Overlay */}
        <div className="relative aspect-video overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          {/* Multi-layer gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
            {/* Featured Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary backdrop-blur-md ring-1 ring-primary/20 shadow-lg shadow-primary/5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Featured Post
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors duration-300 display">
              {post.title}
            </h2>

            {/* Description */}
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mb-6 line-clamp-2">
              {post.description}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4">
              {post.author && <AuthorBadge author={post.author} size="md" linked={false} />}
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              <time className="text-sm text-muted-foreground">
                {post.dateFormatted}
              </time>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              <span className="text-sm text-muted-foreground">
                {post.readingTime}
              </span>
            </div>

            {/* Read button */}
            <div className="mt-6">
              <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300 group-hover:gap-3">
                Read Article
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
