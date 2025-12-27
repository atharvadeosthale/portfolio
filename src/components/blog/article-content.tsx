"use client";

import { useEffect, useRef } from "react";

interface ArticleContentProps {
  children: React.ReactNode;
  className?: string;
}

export function ArticleContent({ children, className }: ArticleContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    // Find all code blocks and add copy buttons
    const codeBlocks = contentRef.current.querySelectorAll("[data-rehype-pretty-code-figure]");

    codeBlocks.forEach((block) => {
      // Add group class for hover effects
      block.classList.add("group");

      // Skip if already has a copy button
      if (block.querySelector(".copy-button")) return;

      const pre = block.querySelector("pre");
      if (!pre) return;

      // Create copy button
      const button = document.createElement("button");
      button.className = "copy-button absolute right-3 top-3 p-2 rounded-lg bg-secondary/50 hover:bg-secondary/80 ring-1 ring-border/50 hover:ring-primary/30 text-muted-foreground hover:text-foreground transition-all duration-200 opacity-0 group-hover:opacity-100 z-10";
      button.setAttribute("aria-label", "Copy code");
      button.innerHTML = `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>`;

      button.addEventListener("click", async () => {
        const code = pre.textContent || "";
        await navigator.clipboard.writeText(code);

        button.innerHTML = `<svg class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`;
        button.setAttribute("aria-label", "Copied!");

        setTimeout(() => {
          button.innerHTML = `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>`;
          button.setAttribute("aria-label", "Copy code");
        }, 2000);
      });

      block.appendChild(button);
    });
  }, [children]);

  return (
    <div ref={contentRef} className={className}>
      {children}
    </div>
  );
}
