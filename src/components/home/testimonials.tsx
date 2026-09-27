import { testimonials } from "../../../constants/testimonials";

function Quote() {
  return (
    <svg viewBox="0 0 32 24" className="h-6 w-8 shrink-0" aria-hidden>
      <path
        fill="currentColor"
        d="M4 24 0 20.5 5.5 12H0V0h13.5v11L7 24H4Zm18.5 0-4-3.5L24 12h-5.5V0H32v11l-6.5 13h-3Z"
      />
    </svg>
  );
}

export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 md:py-36">
      <div className="shell">
        <div className="mb-12 text-center md:mb-20" data-reveal>
          <p className="font-serif text-[22px] italic tracking-[-0.02em] text-muted-foreground md:text-[26px]">
            / Kind words
          </p>
          <h2 className="mt-3 text-[clamp(40px,5.6vw,80px)] font-semibold leading-none tracking-[-0.05em]">
            What people say
          </h2>
        </div>

        <div className="testimonials">
          {testimonials.map((t, i) => (
            <figure key={t.name + i} className="testimonial" data-reveal style={{ "--d": (i % 2) * 120 } as React.CSSProperties}>
              <div className="flex items-start justify-between gap-8">
                <blockquote className="max-w-[440px] text-pretty text-[19px] leading-[1.5] tracking-[-0.01em] md:text-[21px]">
                  {t.quote}
                </blockquote>
                <Quote />
              </div>
              <figcaption className="mt-8 flex items-center gap-3">
                {t.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.avatar} alt="" width={44} height={44} loading="lazy" className="h-11 w-11 rounded-full object-cover" />
                ) : (
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-[15px] font-semibold text-brand-ink">
                    {t.name.charAt(0)}
                  </span>
                )}
                <span>
                  <span className="block text-[15px] font-semibold">{t.name}</span>
                  <span className="block text-[13px] text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
