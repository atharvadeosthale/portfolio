import Link from "next/link";
import { cn } from "@/lib/utils";
import { AuthorBadge } from "./author-badge";
import { Button } from "@/components/ui/button";
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
          "relative rounded-2xl overflow-hidden border border-border shadow-lg hover:shadow-xl transition-all",
          className
        )}
      >
        {/* Cover Image with Gradient Overlay */}
        <div className="relative aspect-video overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
            {/* Featured Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary backdrop-blur-sm ring-1 ring-primary/20">
                Featured Post
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors">
              {post.title}
            </h2>

            {/* Description */}
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mb-4 line-clamp-2">
              {post.description}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4">
              {post.author && <AuthorBadge author={post.author} size="md" linked={false} />}
              <span className="text-muted-foreground">•</span>
              <time className="text-sm text-muted-foreground">
                {post.dateFormatted}
              </time>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {post.readingTime}
              </span>
            </div>

            {/* CTA Button */}
            <div className="mt-6">
              <Button
                size="lg"
                className="group-hover:bg-primary/90 transition-colors"
              >
                Read Article
              </Button>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
