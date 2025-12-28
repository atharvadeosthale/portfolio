import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Author } from "@/lib/authors";

interface AuthorBadgeProps {
  author: Author;
  size?: "sm" | "md" | "lg";
  showBio?: boolean;
  linked?: boolean;
  className?: string;
}

export function AuthorBadge({
  author,
  size = "md",
  showBio = false,
  linked = true,
  className,
}: AuthorBadgeProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-9 w-9",
    lg: "h-12 w-12",
  };

  const textClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const content = (
    <div
      className={cn(
        "flex items-center gap-3",
        linked && "group cursor-pointer",
        className
      )}
    >
      <div className="relative">
        {/* Glow effect on hover */}
        {linked && (
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={author.image}
          alt={author.name}
          className={cn(
            "relative rounded-full object-cover ring-2 ring-border transition-all duration-300",
            linked && "group-hover:ring-primary/50",
            sizeClasses[size]
          )}
        />
      </div>
      <div className="flex flex-col">
        <span
          className={cn(
            "font-medium transition-colors duration-300",
            linked && "group-hover:text-primary",
            textClasses[size]
          )}
        >
          {author.name}
        </span>
        {showBio && (
          <span className="text-xs text-muted-foreground line-clamp-1">
            {author.bio}
          </span>
        )}
      </div>
    </div>
  );

  if (linked) {
    return <Link href={`/blog/author/${author.slug}`}>{content}</Link>;
  }

  return content;
}
