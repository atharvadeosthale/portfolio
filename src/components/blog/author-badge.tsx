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
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const textClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const content = (
    <div className={cn("flex items-center gap-3", linked && "hover:opacity-80 transition-opacity", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={author.image}
        alt={author.name}
        className={cn(
          "rounded-full object-cover ring-2 ring-border",
          sizeClasses[size]
        )}
      />
      <div className="flex flex-col">
        <span className={cn("font-medium", textClasses[size])}>
          {author.name}
        </span>
        {showBio && (
          <span className="text-xs text-muted-foreground">{author.bio}</span>
        )}
      </div>
    </div>
  );

  if (linked) {
    return (
      <Link href={`/blog/author/${author.slug}`}>
        {content}
      </Link>
    );
  }

  return content;
}
