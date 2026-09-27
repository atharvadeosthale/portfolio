import { FaArrowRight } from "react-icons/fa6";
import {
  SiAppwrite,
  SiGithub,
  SiMarkdown,
  SiNextdotjs,
  SiTypescript,
  SiYoutube,
} from "react-icons/si";
import { EMAIL } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

const videoPills = [
  { label: "Recording", x: "6%", y: "62%", r: -4 },
  { label: "Editing", x: "38%", y: "50%", r: 18 },
  { label: "Publishing", x: "58%", y: "70%", r: -8 },
  { label: "Appwrite channel", x: "4%", y: "80%", r: 3 },
  { label: "My channel", x: "52%", y: "86%", r: 0 },
];

const orbit = [
  { icon: SiMarkdown, a: -64 },
  { icon: SiGithub, a: -38 },
  { icon: SiAppwrite, a: -13 },
  { icon: SiYoutube, a: 13 },
  { icon: SiNextdotjs, a: 38 },
  { icon: SiTypescript, a: 64 },
];

function Tile({
  tone,
  title,
  body,
  children,
  className = "",
  delay = 0,
}: {
  tone: "glass" | "white";
  title: string;
  body: string;
  children?: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <article
      className={`bento-tile bento-tile--${tone} ${className}`}
      data-reveal
      style={{ "--d": delay } as React.CSSProperties}
    >
      <div className="relative z-10 p-6 md:p-7">
        <h3 className="text-[28px] font-semibold leading-none tracking-[-0.04em] md:text-[34px]">
          {title}
        </h3>
        <p className="mt-4 max-w-[300px] text-[15px] leading-relaxed opacity-75">{body}</p>
      </div>
      {children}
    </article>
  );
}

export default function Bento() {
  const covers = getAllPosts()
    .slice(0, 3)
    .map((p) => p.cover);

  return (
    <section id="work" className="bento">
      <div className="shell relative">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="inline-flex items-center gap-2 text-[14px] font-medium text-white/75" data-reveal>
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            What I do
          </p>
          <h2
            className="mt-5 text-balance text-[clamp(40px,5.6vw,80px)] font-semibold leading-[0.98] tracking-[-0.05em] text-white"
            data-reveal
          >
            Developer content, built by a{" "}
            <span className="font-serif font-normal italic tracking-[-0.04em]">developer</span>
          </h2>
        </div>

        <div className="bento-panel">
          <div className="bento-grid">
            <Tile
              tone="glass"
              title="Videos"
              body="Recording, editing and publishing YouTube videos for Appwrite, plus videos on my own channel."
              className="bento-a"
            >
              <div className="bento-pills" aria-hidden>
                {videoPills.map((p) => (
                  <span
                    key={p.label}
                    style={{ left: p.x, top: p.y, rotate: `${p.r}deg` } as React.CSSProperties}
                  >
                    {p.label}
                  </span>
                ))}
              </div>
            </Tile>

            <Tile
              tone="white"
              title="Docs"
              body="High quality documentation at Appwrite, the docs at MyShell.ai, and guides at thirdweb."
              className="bento-b"
              delay={80}
            >
              <div className="bento-doc" aria-hidden>
                <div className="bento-doc-bar">
                  <i />
                  <i />
                  <i />
                  <span>docs / quick-start</span>
                </div>
                <div className="bento-doc-body">
                  <div className="bento-doc-side">
                    <b />
                    <b className="is-on" />
                    <b />
                    <b />
                  </div>
                  <pre>
                    <span className="k">const</span> client = <span className="k">new</span>{" "}
                    <span className="f">Client</span>()
                    {"\n"}  .<span className="f">setEndpoint</span>(<span className="s">&apos;https://cloud.appwrite.io/v1&apos;</span>)
                    {"\n"}  .<span className="f">setProject</span>(<span className="s">&apos;&lt;PROJECT_ID&gt;&apos;</span>);
                  </pre>
                </div>
              </div>
            </Tile>

            <article className="bento-tile bento-tile--white bento-c" data-reveal style={{ "--d": 160 } as React.CSSProperties}>
              <div className="bento-cta-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/atharva-cutout-sm.webp" alt="" width={560} height={1208} loading="lazy" />
              </div>
              <div className="flex flex-col justify-end p-6 md:p-7">
                <span className="pill self-start bg-ink/5 shadow-none">Open to collaborations</span>
                <h3 className="mt-5 text-[34px] font-semibold leading-none tracking-[-0.045em] md:text-[40px]">
                  Let&apos;s make something
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  DevRel opportunities, content projects, or just a hello.
                </p>
                <div className="mt-6 flex items-center gap-2">
                  <a href={`mailto:${EMAIL}`} className="btn btn-ink">
                    Start a conversation
                  </a>
                  <a href={`mailto:${EMAIL}`} className="round-arrow bg-ink text-paper-2 hover:rotate-45" aria-label="Email me">
                    <FaArrowRight />
                  </a>
                </div>
              </div>
            </article>

            <Tile
              tone="glass"
              title="Writing"
              body="Blog posts for Appwrite, technical articles for LogRocket, and my own posts right here."
              className="bento-d"
              delay={80}
            >
              <div className="bento-covers" aria-hidden>
                {covers.map((src) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={src} src={src} alt="" width={1920} height={1080} loading="lazy" />
                ))}
              </div>
            </Tile>

            <Tile
              tone="white"
              title="AI automation"
              body="Taking the lead on AI-native automation for Appwrite's DevRel processes, an estimated 6× faster."
              className="bento-e"
              delay={160}
            >
              <div className="bento-orbit" aria-hidden>
                <div className="bento-orbit-rings" />
                {orbit.map(({ icon: Icon, a }) => (
                  <span key={a} style={{ "--a": `${a}deg` } as React.CSSProperties}>
                    <Icon />
                  </span>
                ))}
              </div>
            </Tile>
          </div>
        </div>
      </div>
    </section>
  );
}
