"use client";

import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  "data-language"?: string;
}

export function CodeBlock({ children, className, "data-language": language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    const code = preRef.current?.textContent || "";
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      {/* Language label */}
      {language && (
        <div className="absolute left-4 top-0 -translate-y-1/2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono font-medium ring-1 ring-primary/20 z-10">
          {language}
        </div>
      )}

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={cn(
          "absolute right-3 top-3 p-2 rounded-lg z-10",
          "bg-secondary/50 hover:bg-secondary/80",
          "ring-1 ring-border/50 hover:ring-primary/30",
          "text-muted-foreground hover:text-foreground",
          "transition-all duration-200",
          "opacity-0 group-hover:opacity-100"
        )}
        aria-label={copied ? "Copied!" : "Copy code"}
      >
        {copied ? (
          <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>

      {/* Code block */}
      <pre
        ref={preRef}
        className={cn(
          "overflow-x-auto rounded-xl p-4 pt-8 text-sm",
          "bg-[#0d1117] ring-1 ring-border/50",
          "[&_code]:bg-transparent [&_code]:p-0",
          className
        )}
      >
        {children}
      </pre>
    </div>
  );
}
