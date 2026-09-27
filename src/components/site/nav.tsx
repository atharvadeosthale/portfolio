"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { EMAIL, navItems, socialLinks } from "@/lib/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the menu is open. The cleanup also runs on unmount,
  // so Back/Forward with the menu open doesn't leave the next page locked.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className="nav"
        data-scrolled={scrolled || open}
        data-open={open}
      >
        <nav className="nav-inner" aria-label="Main">
          <Link
            href="/"
            className="nav-logo"
            onClick={() => setOpen(false)}
            style={open ? { color: "hsl(var(--ink))" } : undefined}
          >
            Atharva<i />
          </Link>

          <div className="nav-links">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <a href={`mailto:${EMAIL}`} className="btn btn-ink nav-cta">
            Let&apos;s talk
            <FaArrowRight className="btn-arrow" />
          </a>

          <button
            type="button"
            className="nav-menu-btn"
            aria-expanded={open}
            aria-controls="menu-sheet"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
            <span className="nav-menu-lines" aria-hidden />
          </button>
        </nav>
      </header>

      <div id="menu-sheet" className="menu-sheet" data-open={open} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="menu-sheet-link font-display"
              style={{ "--i": i } as React.CSSProperties}
              tabIndex={open ? 0 : -1}
            >
              {item.label}
              <small>0{i + 1}</small>
            </Link>
          ))}
        </nav>
        <div className="mt-8 flex flex-wrap gap-2">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
              className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium"
              style={{ boxShadow: "inset 0 0 0 1px hsl(var(--paper-2) / 0.18)" }}
            >
              <s.icon className="h-3.5 w-3.5" />
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
