import Link from "next/link";
import { cn } from "@/lib/utils";
import { AuthorBadge } from "./author-badge";
import type { PostMeta } from "@/lib/posts";
import { FaArrowRight } from "react-icons/fa6";

interface BlogCardProps {
  post: PostMeta;
  className?: string;
}

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Link href={`/blog/post/${post.slug}`} className="block group h-full">
      <article
        className={cn(
          "relative border-2 border-foreground/20 overflow-hidden h-full flex flex-col",
          "hover:border-foreground transition-all duration-300",
          "hover:-translate-y-1 hover:shadow-lg",
          className
        )}
      >
        {/* Cover Image */}
        <div className="relative aspect-video overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover}
            alt={post.title}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Reading time badge */}
          <div className="absolute top-4 right-4">
            <span className="font-mono text-xs uppercase tracking-wider bg-background px-3 py-1.5 border-2 border-foreground">
              {post.readingTime}
            </span>
          </div>
        </div>

        <div className="p-6 bg-card flex-1 flex flex-col">
          {/* Author and Date */}
          <div className="flex items-center gap-3 mb-4">
            {post.author && (
              <AuthorBadge author={post.author} size="sm" linked={false} />
            )}
            <span className="font-mono text-xs text-muted-foreground">
              {post.dateFormatted}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl md:text-2xl leading-tight mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-1">
            {post.description}
          </p>

          {/* Read more link */}
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors mt-auto">
            Read more
            <FaArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  );
}
