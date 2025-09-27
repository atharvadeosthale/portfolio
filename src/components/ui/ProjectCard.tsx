import { Button } from "./button";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  tags?: string[];
  image?: string;
  href?: string;
  repo?: string;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  tags = [],
  image,
  href,
  repo,
  className,
}: ProjectCardProps) {
  return (
    <div
      className={cn(
        "group rounded-xl overflow-hidden border border-border bg-secondary/5 hover:bg-secondary/10 shadow-sm hover:shadow-md transition-all",
        className
      )}
    >
      {image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs rounded-full border border-border px-2 py-1 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {(href || repo) && (
          <div className="flex gap-2 mt-5">
            {href && (
              <a href={href} target="_blank" rel="noreferrer">
                <Button size="sm">Live</Button>
              </a>
            )}
            {repo && (
              <a href={repo} target="_blank" rel="noreferrer">
                <Button size="sm" variant="outline">
                  Code
                </Button>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
