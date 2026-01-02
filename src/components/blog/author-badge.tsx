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
    md: "h-10 w-10",
    lg: "h-14 w-14",
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={author.image}
        alt={author.name}
        className={cn(
          "object-cover transition-all duration-300",
          sizeClasses[size]
        )}
      />
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
