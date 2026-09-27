import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="pill group gap-2 text-muted-foreground transition-colors hover:text-foreground"
    >
      <FaArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-0.5" />
      {label}
    </Link>
  );
}
