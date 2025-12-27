import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  id?: string;
  overline?: string;
  title: string;
  className?: string;
}

export function SectionHeader({
  id,
  overline,
  title,
  className,
}: SectionHeaderProps) {
  return (
    <div id={id} className={cn("mb-8", className)}>
      {overline && (
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/80 mb-2">
          {overline}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight relative inline-block display">
        {title}
        <span className="absolute -z-10 left-0 right-0 -bottom-1 h-2 bg-primary/10 blur-[6px]"></span>
      </h2>
    </div>
  );
}
