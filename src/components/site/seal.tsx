import { EMAIL } from "@/lib/site";
import { FaArrowRight } from "react-icons/fa6";
import { cn } from "@/lib/utils";

// Rotating circular "say hello" badge that links to email.
export default function Seal({
  className,
  label = "Say hello • Say hello • Say hello • ",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a href={`mailto:${EMAIL}`} className={cn("seal", className)} aria-label={`Email ${EMAIL}`}>
      <svg viewBox="0 0 100 100" className="seal-ring" aria-hidden>
        <defs>
          <path id="seal-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text>
          <textPath href="#seal-circle" textLength="232">
            {label}
          </textPath>
        </text>
      </svg>
      <span className="seal-core">
        <FaArrowRight />
      </span>
    </a>
  );
}
