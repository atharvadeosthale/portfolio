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

        <div
          className="mx-auto mt-16 flex w-fit items-center gap-5 border-t border-ink/10 pt-10 md:mt-24 md:gap-6"
          data-reveal
        >
          <p className="font-display stat-num">
            <CountUp to={5} />
            <sup>+</sup>
          </p>
          <p className="max-w-[170px] text-[15px] leading-snug text-muted-foreground">
            Years making content for developers
          </p>
        </div>
      </div>
    </section>
  );
}
