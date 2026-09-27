import { experiences } from "../../../constants/experiences";

export default function Experience() {
  return (
    <div className="border-b border-ink/10">
      {experiences.map((exp, i) => (
        <article
          key={exp.company}
          className="exp-row grid gap-5 px-1 py-8 md:grid-cols-[180px_minmax(0,1fr)_minmax(0,1.1fr)] md:gap-10 md:px-6 md:py-10"
          data-reveal
          style={{ "--d": i * 60 } as React.CSSProperties}
        >
          <p className="text-[14px] font-semibold tabular-nums text-muted-foreground md:pt-2">
            {exp.years}
          </p>

          <div className="flex items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={exp.logo}
              alt=""
              width={56}
              height={56}
              loading="lazy"
              className="exp-logo h-12 w-12 shrink-0 rounded-2xl object-cover md:h-14 md:w-14"
            />
            <div>
              <h3 className="font-display text-[44px] md:text-[64px]">{exp.company}</h3>
              <p className="mt-2 text-[15px] font-medium text-muted-foreground">
                {exp.role} · {exp.duration}
              </p>
            </div>
          </div>

          <div className="text-[16px] leading-relaxed md:pt-2">
            <p className="text-pretty">{exp.summary}</p>
            <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {exp.points.map((point) => (
                <li
                  key={point}
                  className="relative pl-4 text-[14px] leading-snug text-muted-foreground before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
