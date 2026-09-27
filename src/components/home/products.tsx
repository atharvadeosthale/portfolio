import { FaArrowRight } from "react-icons/fa6";
import { products } from "../../../constants/products";

export default function Products() {
  if (products.length === 0) return null;

  return (
    <section id="products">
      <div className="shell">
        <div className="mb-10 md:mb-14" data-reveal>
          <p className="kicker mb-5">Products</p>
          <h2 className="font-display text-[clamp(64px,10vw,168px)]">
            What I&apos;ve <span className="font-serif font-normal normal-case italic tracking-[-0.04em]">launched</span>
          </h2>
        </div>

        <div className="border-b border-ink/10">
          {products.map((p, i) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="exp-row group grid items-center gap-5 px-1 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_auto] md:gap-10 md:px-6 md:py-10"
              data-reveal
              style={{ "--d": i * 60 } as React.CSSProperties}
            >
              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.logo}
                  alt=""
                  width={56}
                  height={56}
                  loading="lazy"
                  className="exp-logo h-12 w-12 shrink-0 rounded-2xl md:h-14 md:w-14"
                />
                <div>
                  <h3 className="font-display text-[44px] md:text-[64px]">{p.name}</h3>
                  <p className="mt-2 text-[15px] font-medium text-muted-foreground">{p.label}</p>
                </div>
              </div>

              <p className="max-w-[520px] text-pretty text-[16px] leading-relaxed">{p.description}</p>

              <span className="round-arrow hidden group-hover:bg-brand group-hover:text-brand-ink md:inline-flex">
                <FaArrowRight />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
