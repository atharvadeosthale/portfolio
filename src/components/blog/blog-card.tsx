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
          "rounded-xl overflow-hidden border border-border bg-secondary/5 hover:bg-secondary/10 shadow-sm hover:shadow-md transition-all",
          className
        )}
      >
        <div className="aspect-video overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            {post.author && <AuthorBadge author={post.author} size="sm" linked={false} />}
            <span className="text-xs text-muted-foreground">•</span>
            <time className="text-xs text-muted-foreground">
              {post.dateFormatted}
            </time>
          </div>
          <h3 className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {post.description}
          </p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-muted-foreground">
              {post.readingTime}
            </span>
            <span className="text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Read more →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
