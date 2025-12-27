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
        "relative rounded-xl overflow-hidden",
        "bg-secondary/5 ring-1 ring-border/50",
        "p-5",
        className
      )}
    >
      {/* Gradient accent */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent" />

      <h4 className="text-sm font-semibold mb-4 text-foreground flex items-center gap-2">
        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
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
                "block text-sm py-1.5 px-3 -ml-3 rounded-lg transition-all duration-200",
                activeId === item.id
                  ? "text-primary bg-primary/10 font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
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
