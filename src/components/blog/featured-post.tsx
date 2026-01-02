import Link from "next/link";
import { cn } from "@/lib/utils";
import { AuthorBadge } from "./author-badge";
import type { PostMeta } from "@/lib/posts";
import { FaArrowRight } from "react-icons/fa6";

interface FeaturedPostProps {
  post: PostMeta;
  className?: string;
}

export function FeaturedPost({ post, className }: FeaturedPostProps) {
  return (
    <Link href={`/blog/post/${post.slug}`} className="block group">
      <article
        className={cn(
          "relative border-2 border-foreground overflow-hidden",
          "hover:border-primary transition-all duration-300",
          "hover:-translate-y-1 hover:shadow-xl",
          className
        )}
      >
        <div className="grid md:grid-cols-[1.2fr,1fr]">
          {/* Cover Image */}
          <div className="relative aspect-video md:aspect-auto overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover}
              alt={post.title}
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content */}
          <div className="p-8 md:p-10 flex flex-col justify-between bg-card">
            <div>
              {/* Featured Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary">
                  <span className="w-2 h-2 bg-primary animate-pulse-slow" />
                  Featured
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-4 group-hover:text-primary transition-colors duration-300">
                {post.title}
              </h2>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                {post.description}
              </p>
            </div>

            <div>
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b-2 border-foreground/10">
                {post.author && (
                  <AuthorBadge author={post.author} size="md" linked={false} />
                )}
                <span className="font-mono text-xs text-muted-foreground">
                  {post.dateFormatted}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {post.readingTime}
                </span>
              </div>

              {/* Read button */}
              <div className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider group-hover:text-primary transition-colors">
                Read Article
                <FaArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
