import Link from "next/link";
import { cn } from "@/lib/utils";
import { AuthorBadge } from "./author-badge";
import type { PostMeta } from "@/lib/posts";

interface BlogCardProps {
  post: PostMeta;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Link href={`/blog/post/${post.slug}`} className="block group">
      <article
        className={cn(
          "relative rounded-xl overflow-hidden",
          "bg-secondary/5 hover:bg-secondary/10",
          "ring-1 ring-border/50 hover:ring-primary/20",
          "shadow-sm hover:shadow-lg hover:shadow-primary/5",
          "transition-all duration-500",
          className
        )}
      >
        {/* Gradient accent line on left */}
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Cover Image */}
        <div className="relative aspect-video overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover}
            alt={post.title}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.05] group-hover:brightness-110"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Reading time badge */}
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium text-muted-foreground ring-1 ring-border/50">
            {post.readingTime}
          </div>
        </div>

        <div className="p-5">
          {/* Author and Date */}
          <div className="flex items-center gap-3 mb-3">
            {post.author && <AuthorBadge author={post.author} size="sm" linked={false} />}
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <time className="text-xs text-muted-foreground">
              {post.dateFormatted}
            </time>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold tracking-tight mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2 display">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {post.description}
          </p>

          {/* Read more link */}
          <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            Read more
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
