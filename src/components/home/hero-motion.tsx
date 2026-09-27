"use client";

import { useEffect } from "react";

// Drives the hero's parallax: pointer position (--mx, --my in -1..1) and
// scroll progress through the hero (--sp in 0..1). Pure CSS does the rest.
export default function HeroMotion() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    if (!hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let mx = 0;
    let my = 0;
    let tx = 0;
    let ty = 0;

    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const onPointer = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const sp = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));
      hero.style.setProperty("--sp", sp.toFixed(4));
    };

    const tick = () => {
      mx += (tx - mx) * 0.08;
      my += (ty - my) * 0.08;
      hero.style.setProperty("--mx", mx.toFixed(4));
      hero.style.setProperty("--my", my.toFixed(4));
      frame =
        Math.abs(tx - mx) > 0.001 || Math.abs(ty - my) > 0.001
          ? requestAnimationFrame(tick)
          : 0;
    };

    if (finePointer) window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
