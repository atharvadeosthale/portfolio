"use client";

import { useEffect } from "react";

export function CodeCopyInjector() {
  useEffect(() => {
    // Find all code blocks (rehype-pretty-code figures)
    const codeBlocks = document.querySelectorAll("[data-rehype-pretty-code-figure]");

    codeBlocks.forEach((block) => {
      // Skip if already has a copy button
      if (block.querySelector(".code-copy-btn")) return;

      // Make block relative for absolute positioning of button
      (block as HTMLElement).style.position = "relative";
      block.classList.add("group");

      const pre = block.querySelector("pre");
      if (!pre) return;

      // Create copy button
      const button = document.createElement("button");
      button.className = "code-copy-btn absolute right-3 top-3 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100 z-10";
      button.setAttribute("aria-label", "Copy code");
      button.innerHTML = `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>`;

      button.addEventListener("click", async () => {
        const code = pre.textContent || "";
        await navigator.clipboard.writeText(code);

        button.innerHTML = `<svg class="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`;

        setTimeout(() => {
          button.innerHTML = `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>`;
        }, 2000);
      });

      block.appendChild(button);
    });
  }, []);

  return null;
}
