const steps = [
  {
    n: "01",
    title: "Build",
    body: "I write the code first. I believe anyone in DevRel must be technical.",
  },
  {
    n: "02",
    title: "Explain",
    body: "Then I turn it into docs, blog posts and videos that developers can follow.",
  },
  {
    n: "03",
    title: "Listen",
    body: "I support the community and take their feedback back to the team.",
  },
];

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-24 md:py-40">
      <div className="shell">
        <div className="text-center" data-reveal>
          <p className="font-serif text-[22px] italic tracking-[-0.02em] text-muted-foreground md:text-[26px]">
            / How I work
          </p>
          <h2 className="mt-3 text-[clamp(40px,5.6vw,80px)] font-semibold leading-none tracking-[-0.05em]">
            Build, explain, listen
          </h2>
        </div>

        <div className="process" data-reveal="fade">
          <div className="process-glow" aria-hidden />

          <svg className="process-line process-line--a" viewBox="0 0 200 110" fill="none" aria-hidden>
            <path pathLength={1} d="M6 104 C 10 40, 60 8, 120 10 S 190 18, 194 14" />
            <circle cx="6" cy="104" r="5" />
            <circle cx="194" cy="14" r="5" />
          </svg>
          <svg className="process-line process-line--b" viewBox="0 0 160 120" fill="none" aria-hidden>
            <path pathLength={1} d="M6 30 C 50 30, 80 20, 100 30 C 140 50, 110 100, 95 80 C 80 60, 120 60, 150 112" />
            <circle cx="6" cy="30" r="5" />
            <circle cx="150" cy="112" r="5" />
          </svg>

          {steps.map((s, i) => (
            <article key={s.n} className="process-card" style={{ "--i": i } as React.CSSProperties}>
              <p className="process-num">{s.n}</p>
              <div>
                <h3 className="text-[34px] font-medium leading-none tracking-[-0.045em] md:text-[40px]">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[260px] text-[15px] leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
