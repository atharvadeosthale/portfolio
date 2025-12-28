"use client";

import { useState, useEffect } from "react";
import ThemeToggler from "./theme-toggler";
import { Button } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="py-6 flex justify-between items-center sticky top-0 z-50 relative">
      {/* Full-width frosted background */}
      <div
        className={cn(
          "absolute inset-0 -z-10 w-screen left-1/2 -translate-x-1/2 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border/50"
            : "bg-transparent"
        )}
      />

      <a
        href="/"
        className="text-base md:text-lg font-semibold tracking-tight"
      >
        Atharva <span className="text-primary">Deosthale</span>
      </a>
      <div className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm text-muted-foreground hover:text-foreground transition-colors"
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <a href="https://github.com/atharvadeosthale" target="_blank">
          <Button
            variant="secondary"
            size="sm"
            className="hidden md:inline-flex gap-2 items-center"
          >
            <GitHubLogoIcon />
            GitHub
          </Button>
        </a>
        <ThemeToggler />
      </div>
    </div>
  );
}
