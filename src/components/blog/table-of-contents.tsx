import { cn } from "@/lib/utils";
import type { TableOfContentsItem } from "@/lib/posts";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <nav
      className={cn(
        "rounded-xl border border-border bg-secondary/5 p-5",
        className
      )}
    >
      <h4 className="text-sm font-semibold mb-4 text-foreground">
        Table of Contents
      </h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(item.level === 3 && "ml-4")}
          >
            <a
              href={`#${item.id}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors block py-1"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
