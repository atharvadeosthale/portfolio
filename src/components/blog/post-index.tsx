"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

type Row = {
  slug: string;
  title: string;
  cover: string;
  dateFormatted: string;
  readingTime: string;
};

// Numbered list of posts. On devices with a mouse, the hovered post's cover
// trails the cursor; touch devices get a thumbnail in the row instead.
export function PostIndex({ posts, start = 1 }: { posts: Row[]; start?: number }) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const on = active !== null;

  // Follow the cursor, but stay in the right half of the list so the preview
  // never sits on the titles
  const aim = (list: Element, clientX: number, clientY: number) => {
    const rect = list.getBoundingClientRect();
    const width = previewRef.current?.offsetWidth ?? 360;
    const x = Math.max(clientX + 40, rect.left + rect.width * 0.5);
    target.current = { x: Math.min(x, rect.right - width - 80), y: clientY };
  };

  // Only animate while a row is hovered
  useEffect(() => {
    const el = previewRef.current;
    if (!el || !on) return;
    let x = target.current.x;
    let y = target.current.y;
    let frame = 0;
    const tick = () => {
      const dx = target.current.x - x;
      x += dx * 0.16;
      y += (target.current.y - y) * 0.16;
      // Lean into the direction of travel
      const tilt = Math.max(-12, Math.min(12, dx * 0.08));
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(0, -50%) rotate(${tilt}deg)`;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [on]);

  return (
    <div
      className="post-index"
      onPointerMove={(e) => aim(e.currentTarget, e.clientX, e.clientY)}
      onPointerLeave={() => setActive(null)}
    >
      <ol>
        {posts.map((post, i) => (
          <li key={post.slug} data-reveal style={{ "--d": i * 80 } as React.CSSProperties}>
            <Link
              href={`/blog/post/${post.slug}`}
              className="index-row"
              onPointerEnter={(e) => {
                aim(e.currentTarget.closest(".post-index")!, e.clientX, e.clientY);
                setActive(i);
              }}
            >
              <span className="index-num">{String(i + start).padStart(2, "0")}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.cover} alt="" width={1920} height={1080} loading="lazy" className="index-thumb" />
              <span className="index-title">{post.title}</span>
              <span className="index-meta">
                <span>{post.dateFormatted}</span>
                <span>{post.readingTime}</span>
              </span>
              <span className="round-arrow index-arrow">
                <FaArrowRight />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div ref={previewRef} className="index-preview" data-on={on} aria-hidden>
        {posts.map((post, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={post.slug}
            src={post.cover}
            alt=""
            loading="lazy"
            className={i === active ? "is-active" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
