import {
  FaBolt,
  FaBookOpen,
  FaCodeBranch,
  FaPenNib,
  FaUsers,
  FaYoutube,
} from "react-icons/fa6";
import Statement from "./statement";
import CountUp from "./count-up";

const stats = [
  {
    value: 5,
    suffix: "+",
    label: "Years making content for developers, starting with LogRocket in 2021",
  },
  {
    value: 4,
    pad: 2,
    label: "Developer-focused companies I've created docs, posts and videos for",
  },
  {
    value: 6,
    suffix: "×",
    label: "Estimated speed-up from the AI automation I brought to DevRel work",
  },
];

const companies = [
  { src: "/appwrite.png", name: "Appwrite" },
  { src: "/myshell.png", name: "MyShell.ai" },
  { src: "/thirdweb.jpeg", name: "thirdweb" },
  { src: "/logrocket.jpeg", name: "LogRocket" },
];

// Floating skill pills around the statement (desktop), a wrapped row on mobile
const skills = [
  { label: "DevRel", icon: FaUsers, color: "#2a3cff", side: "l", y: "4%", x: "2%", r: -6 },
  { label: "Documentation", icon: FaBookOpen, color: "#0f0f12", side: "l", y: "40%", x: "7%", r: 4 },
  { label: "Technical writing", icon: FaPenNib, color: "#ff6a3d", side: "l", y: "76%", x: "0%", r: -3 },
  { label: "YouTube", icon: FaYoutube, color: "#ff2d55", side: "r", y: "2%", x: "4%", r: 5 },
  { label: "AI automation", icon: FaBolt, color: "#f5b400", side: "r", y: "40%", x: "0%", r: -5 },
  { label: "Open source", icon: FaCodeBranch, color: "#16a34a", side: "r", y: "78%", x: "6%", r: 3 },
];

export default function About() {
  return (
    <section id="about" className="relative pb-10 pt-24 md:pb-20 md:pt-40">
      <div className="shell">
        <p
          className="mb-8 text-center font-serif text-[26px] italic tracking-[-0.02em] md:mb-12 md:text-[32px]"
          data-reveal
        >
          A little about me
        </p>

        <div className="relative mx-auto max-w-[1320px]">
          <ul className="about-skills" aria-label="What I work on">
            {skills.map((s, i) => (
              <li
                key={s.label}
                className="about-skill"
                data-side={s.side}
                style={
                  {
                    "--y": s.y,
                    "--x": s.x,
                    "--r": `${s.r}deg`,
                    "--d": i * 80,
                  } as React.CSSProperties
                }
                data-reveal="scale"
              >
                <span className="about-skill-icon" style={{ background: s.color }}>
                  <s.icon />
                </span>
                {s.label}
              </li>
            ))}
          </ul>

          <div className="mx-auto max-w-[860px] text-center">
            <Statement />
          </div>
        </div>

        <div className="mt-20 grid gap-2 md:mt-32 md:grid-cols-3 md:gap-3">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col justify-between gap-10 rounded-[28px] bg-paper-2 p-6 md:min-h-[260px] md:p-8"
              data-reveal
              style={{ "--d": i * 90 } as React.CSSProperties}
            >
              <p className="font-display stat-num">
                <CountUp to={stat.value} pad={stat.pad} />
                {stat.suffix && <sup>{stat.suffix}</sup>}
              </p>
              <p className="max-w-[280px] text-[15px] leading-snug text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-2 flex flex-col gap-4 rounded-[28px] bg-paper-2 p-6 md:mt-3 md:flex-row md:items-center md:justify-between md:p-8"
          data-reveal
        >
          <p className="text-[15px] font-medium">Worked with</p>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-4 sm:flex sm:flex-wrap sm:items-center sm:gap-x-10">
            {companies.map((c) => (
              <li key={c.name} className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.src}
                  alt=""
                  width={32}
                  height={32}
                  loading="lazy"
                  className="h-8 w-8 rounded-[10px] object-cover"
                />
                <span className="text-[17px] font-semibold tracking-tight">{c.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
