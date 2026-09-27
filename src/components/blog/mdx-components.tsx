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
      className="text-[40px] md:text-[48px] font-semibold leading-[1.05] tracking-[-0.04em] mt-16 mb-6 scroll-mt-28"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      id={typeof children === "string" ? slugify(children) : undefined}
      className="text-[30px] md:text-[36px] font-semibold leading-[1.1] tracking-[-0.035em] mt-16 mb-5 scroll-mt-28 group"
      {...props}
    >
      <a
        href={`#${typeof children === "string" ? slugify(children) : ""}`}
        className="no-underline transition-colors hover:text-brand-text"
      >
        {children}
      </a>
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      id={typeof children === "string" ? slugify(children) : undefined}
      className="text-[23px] md:text-[26px] font-semibold leading-[1.2] tracking-[-0.03em] mt-12 mb-4 scroll-mt-28 group"
      {...props}
    >
      <a
        href={`#${typeof children === "string" ? slugify(children) : ""}`}
        className="no-underline transition-colors hover:text-brand-text"
      >
        {children}
      </a>
    </h3>
  ),
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="text-[20px] font-semibold tracking-[-0.02em] mt-10 mb-3"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-foreground/85 leading-[1.75] mb-6 text-[18px]"
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
      className="font-medium text-foreground underline decoration-brand/60 decoration-[1.5px] underline-offset-[5px] transition-colors hover:text-brand-text hover:decoration-brand"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="list-none mb-6 space-y-2.5 text-foreground/85 text-[18px]"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="list-decimal list-outside ml-6 mb-6 space-y-2.5 text-foreground/85 text-[18px] marker:text-muted-foreground marker:font-medium"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-[1.75] relative pl-6 [ul>&]:before:absolute [ul>&]:before:left-1 [ul>&]:before:top-[0.7em] [ul>&]:before:h-1.5 [ul>&]:before:w-1.5 [ul>&]:before:rounded-full [ul>&]:before:bg-brand [ol>&]:pl-1" {...props}>
      {children}
    </li>
  ),
  blockquote: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-10 rounded-[20px] bg-paper-2 px-7 py-6 font-serif italic text-[22px] leading-snug tracking-[-0.02em] text-foreground/80 [&_p]:mb-0 [&_p]:text-[inherit] [&_p]:leading-[inherit]"
      {...props}
    >
      {children}
    </blockquote>
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="border-0 h-px bg-ink/10 my-14" {...props} />
  ),
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic" {...props}>
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
          className="rounded-md bg-ink/[0.07] px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
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
          "overflow-x-auto p-6 text-sm my-8 font-mono rounded-[18px]",
          "[&_code]:bg-transparent [&_code]:p-0 [&_code]:border-0"
        )}
        {...props}
      >
        {children}
      </pre>
    );
  },
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-8 rounded-[18px] bg-paper-2 p-2">
      <table
        className="w-full border-collapse text-[15px]"
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
      className="border-b border-ink/15 px-4 py-3 text-left text-[13px] font-semibold text-muted-foreground"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border-b border-ink/10 px-4 py-3" {...props}>
      {children}
    </td>
  ),
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt || ""}
      className="my-8 max-w-full h-auto rounded-[14px]"
      {...props}
    />
  ),
};
