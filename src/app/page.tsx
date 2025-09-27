import Experience from "@/components/experience";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
  FaGithub,
  FaPen,
} from "react-icons/fa6";
import { experiences } from "../../constants/experiences";
import { SocialRail } from "@/components/ui/SocialRail";

export const metadata = {
  title: "Atharva Deosthale - Portfolio",
  description:
    "Hello, I'm Atharva Deosthale. I code and create content about it for a living. Feel free to reach out to me on my socials or email!",
};

export default function Home() {
  return (
    <main>
      <SocialRail />
      <Container>
        <Navbar />
      </Container>

      {/* Hero */}
      <section id="hero" className="py-10 md:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr,auto] items-center gap-10">
            <div className="flex flex-col gap-6 max-w-2xl relative">
              <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
                Developer • DevRel • Creator
              </p>
              <h1 className="display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
                Creating content around the web
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                I love writing code and creating content about it. I’ve worked
                across DevRel, technical writing, and video.
              </p>
              <div className="flex items-center gap-3">
                <a href="mailto:hey@atharva.codes">
                  <Button size="lg">Email me</Button>
                </a>
                <a
                  className="icon-btn"
                  href="https://youtube.com/AtharvaDeosthale"
                  target="_blank"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
                <a
                  className="icon-btn"
                  href="https://blog.atharva.codes"
                  target="_blank"
                  aria-label="Blog"
                >
                  <FaPen />
                </a>
                <a
                  className="icon-btn"
                  href="https://x.com/atharvabuilds"
                  target="_blank"
                  aria-label="X"
                >
                  <FaXTwitter />
                </a>
                <a
                  className="icon-btn"
                  href="https://linkedin.com/in/atharvadeosthale"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  className="icon-btn"
                  href="https://github.com/atharvadeosthale"
                  target="_blank"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-6 -left-6 h-16 w-16 rounded-full bg-primary/20 blur-2xl -z-10 animate-float-slow" />
              <div className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-foreground/10 blur-2xl -z-10 animate-float-slower" />
              <div className="p-1 rounded-[28px] bg-gradient-to-tr from-primary to-foreground/50">
                <img
                  src="/pfp.jpeg"
                  className="rounded-[24px] w-[200px] md:w-[260px] h-[200px] md:h-[260px] object-cover ring-1 ring-border/50 bg-background"
                />
              </div>
              <div className="absolute -left-6 top-12 hidden md:flex flex-col gap-3">
                <span className="rounded-full bg-secondary/60 backdrop-blur text-xs px-3 py-1 ring-1 ring-border">
                  DevRel
                </span>
                <span className="rounded-full bg-secondary/60 backdrop-blur text-xs px-3 py-1 ring-1 ring-border">
                  Content
                </span>
                <span className="rounded-full bg-secondary/60 backdrop-blur text-xs px-3 py-1 ring-1 ring-border">
                  AI
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* About */}
      <section id="about" className="py-12 md:py-16">
        <Container>
          <SectionHeader overline="About" title="Get to know me" />
          <div className="relative overflow-hidden rounded-2xl border border-border bg-secondary/5">
            <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-primary/70 via-primary/40 to-transparent" />
            <div className="relative p-6 md:p-8 grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-5 text-foreground/90 leading-relaxed">
                <p>
                  I&apos;m{" "}
                  <span className="font-semibold text-primary">
                    Atharva Deosthale
                  </span>
                  , a developer and content creator with a love for all things
                  tech. I bridge the gap between complex technologies and
                  developer communities.
                </p>
                <p>
                  I&apos;ve crafted AI workflows at{" "}
                  <span className="font-medium">MyShell.ai</span> and empowered
                  blockchain developers at{" "}
                  <span className="font-medium">thirdweb</span>.
                </p>
                <p>
                  When I&apos;m not coding, I&apos;m exploring new tech,
                  contributing to OSS, or brainstorming my next video.
                  Let&apos;s connect and build something amazing!
                </p>
                <div className="pt-2">
                  <a
                    href="#contact"
                    className="text-sm text-primary hover:underline"
                  >
                    Get in touch →
                  </a>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-6">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Previously collaborated with
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <img
                      src="/appwrite.png"
                      alt="Appwrite"
                      className="h-6 w-auto rounded-sm ring-1 ring-border/60 object-cover opacity-80"
                    />
                    <img
                      src="/myshell.png"
                      alt="MyShell.ai"
                      className="h-6 w-auto rounded-sm ring-1 ring-border/60 object-cover opacity-80"
                    />
                    <img
                      src="/thirdweb.jpeg"
                      alt="thirdweb"
                      className="h-6 w-auto rounded-sm ring-1 ring-border/60 object-cover opacity-80"
                    />
                    <img
                      src="/logrocket.jpeg"
                      alt="LogRocket"
                      className="h-6 w-auto rounded-sm ring-1 ring-border/60 object-cover opacity-80"
                    />
                  </div>
                </div>
                <div className="hidden md:block text-sm text-muted-foreground">
                  <div className="flex flex-wrap gap-2">
                    {[
                      "DevRel",
                      "Technical Writing",
                      "Video",
                      "Open Source",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Experience */}
      <section id="experience" className="py-12 md:py-16">
        <Container>
          <SectionHeader overline="Experience" title="Where I've worked" />
          <div className="relative mt-6">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20"></div>
            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <Experience key={index} {...experience} isTimeline={true} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16">
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-secondary/5">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-foreground/5" />
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-2">
                  Say hello
                </p>
                <h3 className="display text-2xl md:text-3xl font-semibold tracking-tight">
                  Let’s build something together
                </h3>
                <p className="text-muted-foreground mt-2 max-w-xl">
                  Open to collaborations, DevRel, and content projects. Reach
                  out and I’ll get back soon.
                </p>
              </div>
              <div className="flex items-center gap-3 md:gap-4">
                <a href="mailto:hey@atharva.codes">
                  <Button size="lg">Email me</Button>
                </a>
                <a
                  className="icon-btn"
                  href="https://x.com/atharvabuilds"
                  target="_blank"
                  aria-label="X"
                >
                  <FaXTwitter />
                </a>
                <a
                  className="icon-btn"
                  href="https://linkedin.com/in/atharvadeosthale"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  className="icon-btn"
                  href="https://github.com/atharvadeosthale"
                  target="_blank"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border/60">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Atharva Deosthale</p>
            <div className="flex gap-4">
              <a className="hover:text-foreground" href="#hero">
                Top
              </a>
              <a
                className="hover:text-foreground"
                href="https://github.com/atharvadeosthale/portfolio"
                target="_blank"
              >
                Source
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </main>
  );
}
