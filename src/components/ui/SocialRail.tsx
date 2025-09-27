import { FaGithub, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";

export function SocialRail() {
  const items = [
    { href: "https://github.com/atharvadeosthale", icon: <FaGithub /> },
    { href: "https://x.com/atharvabuilds", icon: <FaXTwitter /> },
    { href: "https://linkedin.com/in/atharvadeosthale", icon: <FaLinkedin /> },
    { href: "https://youtube.com/AtharvaDeosthale", icon: <FaYoutube /> },
  ];
  return (
    <div className="hidden lg:flex fixed left-6 bottom-10 z-40 flex-col items-center gap-4 text-muted-foreground">
      {items.map((it) => (
        <a
          key={it.href}
          href={it.href}
          target="_blank"
          className="hover:text-foreground transition-colors"
        >
          <span className="text-xl">{it.icon}</span>
        </a>
      ))}
      <div className="mt-2 h-16 w-px bg-border" />
    </div>
  );
}
