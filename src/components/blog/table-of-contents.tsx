"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { TableOfContentsItem } from "@/lib/posts";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav
      className={cn(
        "border-2 border-foreground p-6",
        className
      )}
    >
      <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 pb-4 border-b-2 border-foreground/10">
        On this page
      </h4>
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(item.level === 3 && "ml-4")}
          >
            <a
              href={`#${item.id}`}
              className={cn(
                "block text-sm py-2 transition-all duration-200 border-l-2 pl-4 -ml-[2px]",
                activeId === item.id
                  ? "text-primary border-primary font-medium"
                  : "text-muted-foreground hover:text-foreground border-transparent hover:border-foreground/30"
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
