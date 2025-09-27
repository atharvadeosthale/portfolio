import { cn } from "@/lib/utils";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn("max-w-6xl mx-auto px-5 xl:px-0", className)}>
      {children}
    </div>
  );
}
