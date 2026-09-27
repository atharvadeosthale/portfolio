"use client";

import { useEffect, useRef } from "react";
import { FaCode, FaPlay } from "react-icons/fa6";

type Token =
  | { type: "word"; text: string; italic?: boolean }
  | { type: "pic"; src: string; alt: string; logo?: boolean }
  | { type: "icon"; icon: "code" | "play" };

const words = (text: string, italic = false): Token[] =>
  text.split(" ").map((w) => ({ type: "word", text: w, italic }));

// The statement fills in word by word as it scrolls through the viewport.
const tokens: Token[] = [
  ...words("I write code"),
  { type: "icon", icon: "code" },
  ...words("and make"),
  ...words("content", true),
  ...words("about it: videos"),
  { type: "icon", icon: "play" },
  ...words("on my YouTube channel, docs and blog posts for developers."),
];

export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-t]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((i) => i.style.setProperty("--on", "1"));
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block's top hits 85% of the viewport, 1 when its bottom hits 62%
      const start = vh * 0.85;
      const end = vh * 0.62;
      const total = rect.height + (start - end);
      const p = Math.min(1, Math.max(0, (start - rect.top) / total));
      const lit = p * items.length;
      items.forEach((item, i) => {
        const v = Math.min(1, Math.max(0, lit - i));
        item.style.setProperty("--on", v.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <p ref={ref} className="statement-text">
      {tokens.map((t, i) =>
        t.type === "word" ? (
          <span key={i}>
            <span
              data-t
              className={t.italic ? "statement-word statement-italic" : "statement-word"}
            >
              {t.text}
            </span>{" "}
          </span>
        ) : t.type === "icon" ? (
          <span key={i}>
            <span data-t className="statement-pic statement-icon" aria-hidden>
              {t.icon === "code" ? <FaCode /> : <FaPlay />}
            </span>{" "}
          </span>
        ) : (
          <span key={i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              data-t
              src={t.src}
              alt={t.alt}
              className={t.logo ? "statement-pic statement-pic--logo" : "statement-pic"}
            />{" "}
          </span>
        )
      )}
    </p>
  );
}
