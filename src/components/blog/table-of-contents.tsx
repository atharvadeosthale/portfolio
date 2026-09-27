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
        "rounded-[22px] bg-paper-2 p-5 lg:bg-transparent lg:p-0",
        className
      )}
    >
      <p className="kicker mb-4">
        On this page
      </p>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(item.level === 3 && "ml-4")}
          >
            <a
              href={`#${item.id}`}
              className={cn(
                "block text-[14px] leading-snug py-1.5 transition-colors duration-200 border-l pl-4",
                activeId === item.id
                  ? "text-foreground border-brand font-medium"
                  : "text-muted-foreground hover:text-foreground border-ink/10"
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
