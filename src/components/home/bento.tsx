import {
  FaArrowRight,
  FaBolt,
  FaCheck,
  FaPlay,
  FaWandMagicSparkles,
  FaYoutube,
} from "react-icons/fa6";
import { EMAIL } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
import { CHANNEL_URL, getLatestVideos } from "@/lib/youtube";

const flow = [
  { icon: FaBolt, label: "Trigger" },
  { icon: FaWandMagicSparkles, label: "Agent" },
  { icon: FaCheck, label: "Output" },
];

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

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

export default async function Bento() {
  const videos = await getLatestVideos(3);
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
              body="The latest from my YouTube channel."
              className="bento-a"
            >
              <div className="bento-videos">
                {videos.length > 0 && (
                  <ul>
                    {videos.map((v) => (
                      <li key={v.id}>
                        <a
                          href={`https://www.youtube.com/watch?v=${v.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bento-video"
                        >
                          <span className="bento-video-play" aria-hidden>
                            <FaPlay />
                          </span>
                          <span className="min-w-0 flex-1 truncate">{v.title}</span>
                          <span className="shrink-0 text-[12px] opacity-60">
                            {dateFormat.format(v.published)}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <a
                  href={CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bento-channel"
                >
                  <FaYoutube className="h-4 w-4" />
                  @AtharvaDeosthale
                  <FaArrowRight className="h-3 w-3 -rotate-45" />
                </a>
              </div>
            </Tile>

            <Tile
              tone="white"
              title="Docs"
              body="Quality documentation that developers can actually follow."
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
                    <span className="k">import</span> {"{ "}<span className="f">createClient</span>{" }"} <span className="k">from</span>{" "}
                    <span className="s">&apos;sdk&apos;</span>;
                    {"\n\n"}<span className="k">const</span> client = <span className="f">createClient</span>();
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
              body="Technical articles and blog posts, including my own right here."
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
              body="Using AI to automate the repetitive parts of DevRel work."
              className="bento-e"
              delay={160}
            >
              <div className="bento-flow" aria-hidden>
                <div className="bento-flow-line">
                  <i />
                </div>
                {flow.map(({ icon: Icon, label }, i) => (
                  <div key={label} className="bento-flow-node" style={{ "--i": i } as React.CSSProperties}>
                    <span>
                      <Icon />
                    </span>
                    {label}
                  </div>
                ))}
              </div>
            </Tile>
          </div>
        </div>
      </div>
    </section>
  );
}
