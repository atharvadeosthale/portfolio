"use client";

import { useState } from "react";
import { FaCheck, FaRegCopy } from "react-icons/fa6";
import { EMAIL } from "@/lib/site";

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(EMAIL);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          window.location.href = `mailto:${EMAIL}`;
        }
      }}
      className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-[14px] font-medium transition-colors hover:bg-paper-2 hover:text-ink"
      style={{ boxShadow: "inset 0 0 0 1px hsl(var(--paper-2) / 0.2)" }}
      aria-live="polite"
    >
      {copied ? <FaCheck className="h-3.5 w-3.5" /> : <FaRegCopy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy email"}
    </button>
  );
}
