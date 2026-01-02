import { cn } from "@/lib/utils";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const mdxComponents = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      id={typeof children === "string" ? slugify(children) : undefined}
      className="font-serif text-4xl md:text-5xl tracking-tight mt-12 mb-6 scroll-mt-24"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      id={typeof children === "string" ? slugify(children) : undefined}
      className="font-serif text-3xl md:text-4xl tracking-tight mt-12 mb-6 scroll-mt-24 group border-b-2 border-foreground/10 pb-4"
      {...props}
    >
      <a
        href={`#${typeof children === "string" ? slugify(children) : ""}`}
        className="no-underline hover:text-primary transition-colors"
      >
        {children}
      </a>
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      id={typeof children === "string" ? slugify(children) : undefined}
      className="font-serif text-2xl md:text-3xl tracking-tight mt-10 mb-4 scroll-mt-24 group"
      {...props}
    >
      <a
        href={`#${typeof children === "string" ? slugify(children) : ""}`}
        className="no-underline hover:text-primary transition-colors"
      >
        {children}
      </a>
    </h3>
  ),
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="font-serif text-xl tracking-tight mt-8 mb-3"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-foreground/90 leading-[1.8] mb-6 text-lg"
      {...props}
    >
      {children}
    </p>
  ),
  a: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-primary font-medium underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-none mb-6 space-y-3 text-foreground/90 text-lg"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal list-outside ml-6 mb-6 space-y-3 text-foreground/90 text-lg"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-[1.8] relative pl-6 before:content-['—'] before:absolute before:left-0 before:text-primary" {...props}>
      {children}
    </li>
  ),
  blockquote: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-primary pl-6 my-8 font-serif italic text-xl text-muted-foreground"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="border-0 h-[2px] bg-foreground/10 my-12" {...props} />
  ),
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className="font-serif italic" {...props}>
      {children}
    </em>
  ),
  code: ({
    children,
    className,
    ...props
  }: React.HTMLAttributes<HTMLElement>) => {
    // Inline code (not inside pre)
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="px-2 py-1 bg-foreground/10 text-sm font-mono text-foreground border border-foreground/20"
          {...props}
        >
          {children}
        </code>
      );
    }
    // Code block (handled by pre)
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    return (
      <pre
        className={cn(
          "overflow-x-auto p-6 text-sm my-8 font-mono",
          "border-2 border-foreground",
          "[&_code]:bg-transparent [&_code]:p-0 [&_code]:border-0"
        )}
        {...props}
      >
        {children}
      </pre>
    );
  },
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-8">
      <table
        className="w-full border-collapse border-2 border-foreground"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  th: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border-2 border-foreground bg-foreground text-background px-4 py-3 text-left font-mono text-sm uppercase tracking-wider"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border-2 border-foreground px-4 py-3" {...props}>
      {children}
    </td>
  ),
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt || ""}
      className="my-8 max-w-full h-auto border-2 border-foreground"
      {...props}
    />
  ),
};
