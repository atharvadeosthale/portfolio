import ThemeToggler from "./theme-toggler";
import { Button } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <div className="py-6 flex justify-between items-center mb-10 sticky top-0 z-50 bg-transparent">
      <a
        href="#hero"
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
