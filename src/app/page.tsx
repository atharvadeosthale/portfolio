import Navbar from "@/components/navbar";
import AnonymousMessage from "@/components/anonymous-message";
import Link from "next/link";
import {
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
  FaGithub,
  FaArrowRight,
} from "react-icons/fa6";
import { experiences } from "../../constants/experiences";

export const metadata = {
  title: "Atharva Deosthale - Portfolio",
  description:
    "Hello, I'm Atharva Deosthale. I code and create content about it for a living. Feel free to reach out to me on my socials or email!",
};

const socialLinks = [
  {
    href: "https://youtube.com/AtharvaDeosthale",
    icon: FaYoutube,
    label: "YouTube",
  },
  {
    href: "https://x.com/atharvabuilds",
    icon: FaXTwitter,
    label: "X/Twitter",
  },
  {
    href: "https://linkedin.com/in/atharvadeosthale",
    icon: FaLinkedin,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/atharvadeosthale",
    icon: FaGithub,
    label: "GitHub",
  },
];

export default function Home() {
  return (
    <main className="relative">
      {/* Noise texture */}
      <div className="noise" />

      <Navbar />

      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="max-w-[1200px] mx-auto px-6 py-20 w-full relative">
          <div className="grid lg:grid-cols-[1fr,400px] gap-12 lg:gap-20 items-center">
            {/* Left content */}
            <div className="space-y-8">
              {/* Overline */}
              <div className="flex items-center gap-4 animate-reveal-up">
                <div className="h-[2px] w-12 bg-primary" />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Developer / DevRel / Creator
                </span>
              </div>

              {/* Main heading */}
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight animate-reveal-up animation-delay-100">
                Creating
                <br />
                <span className="text-primary">content</span> around
                <br />
                the web<span className="text-primary">.</span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed animate-reveal-up animation-delay-200">
                I love writing code and creating content about it. I&apos;ve
                worked across DevRel, technical writing, and video production.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 animate-reveal-up animation-delay-300">
                <a
                  href="mailto:hey@atharva.codes"
                  className="btn-editorial-primary"
                >
                  Get in touch
                </a>
                <Link href="/blog" className="btn-editorial">
                  Read my writing
                </Link>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-6 pt-4 animate-reveal-up animation-delay-400">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right - Image */}
            <div className="relative animate-reveal-up animation-delay-200">
              {/* Decorative frame */}
              <div className="absolute -inset-4 border-2 border-foreground/20 -z-10" />
              <div className="absolute -inset-8 border-2 border-foreground/10 -z-20" />

              <div className="relative">
                <img
                  src="/pfp.jpeg"
                  alt="Atharva Deosthale"
                  className="w-full aspect-[4/5] object-cover transition-all duration-700 hover:scale-[1.02]"
                />
                {/* Overlay accent */}
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
              </div>

              {/* Caption */}
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground px-4 py-2">
                <span className="font-mono text-xs uppercase tracking-wider">
                  Based in India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-slow">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-foreground/30" />
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-24 md:py-32 border-t-2 border-foreground"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Section header */}
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                01 — About
              </span>
              <h2 className="font-serif text-4xl md:text-6xl mt-4">
                Get to know me
              </h2>
            </div>
            <div className="hidden md:block h-[2px] flex-1 bg-foreground/10 ml-12 mb-4" />
          </div>

          <div className="grid lg:grid-cols-[1.5fr,1fr] gap-16">
            {/* Main content */}
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                I&apos;m{" "}
                <span className="font-medium text-primary">
                  Atharva Deosthale
                </span>
                , a developer and content creator with a deep passion for
                bridging the gap between complex technologies and developer
                communities.
              </p>
              <p className="text-muted-foreground">
                I&apos;ve crafted AI workflows at{" "}
                <span className="text-foreground font-medium">MyShell.ai</span>,
                empowered blockchain developers at{" "}
                <span className="text-foreground font-medium">thirdweb</span>,
                and helped teams create amazing educational content.
              </p>
              <p className="text-muted-foreground">
                When I&apos;m not coding, I&apos;m exploring new technologies,
                contributing to open source, or brainstorming my next video
                project. Let&apos;s connect and build something amazing
                together.
              </p>
            </div>

            {/* Side info */}
            <div className="space-y-8">
              {/* Collaborations */}
              <div className="border-2 border-foreground p-6 transition-all duration-300 hover:border-primary hover:shadow-lg">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Previously collaborated with
                </span>
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  {[
                    { src: "/appwrite.png", alt: "Appwrite" },
                    { src: "/myshell.png", alt: "MyShell.ai" },
                    { src: "/thirdweb.jpeg", alt: "thirdweb" },
                    { src: "/logrocket.jpeg", alt: "LogRocket" },
                  ].map((company) => (
                    <img
                      key={company.alt}
                      src={company.src}
                      alt={company.alt}
                      className="h-8 w-auto opacity-80 hover:opacity-100 transition-all"
                    />
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  What I do
                </span>
                <div className="flex flex-wrap gap-2 mt-4">
                  {["DevRel", "Technical Writing", "Video", "Open Source"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="font-mono text-xs uppercase tracking-wider border-2 border-foreground px-3 py-2 hover:bg-foreground hover:text-background transition-all duration-200 cursor-default hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="py-24 md:py-32 border-t-2 border-foreground bg-card"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Section header */}
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                02 — Experience
              </span>
              <h2 className="font-serif text-4xl md:text-6xl mt-4">
                Where I&apos;ve worked
              </h2>
            </div>
            <div className="hidden md:block h-[2px] flex-1 bg-foreground/10 ml-12 mb-4" />
          </div>

          {/* Experience items */}
          <div className="space-y-0">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="group border-b-2 border-foreground/20 hover:border-primary transition-colors"
              >
                <div className="py-8 md:py-12 grid md:grid-cols-[200px,1fr,200px] gap-6 md:gap-12 items-start">
                  {/* Duration */}
                  <div className="font-mono text-sm text-muted-foreground">
                    {exp.duration}
                  </div>

                  {/* Main content */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      {exp.logo && (
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="w-10 h-10 rounded-full transition-all"
                        />
                      )}
                      <div>
                        <h3 className="font-serif text-2xl md:text-3xl group-hover:text-primary transition-colors">
                          {exp.company}
                        </h3>
                        <p className="text-muted-foreground">{exp.role}</p>
                      </div>
                    </div>
                    <div className="text-muted-foreground leading-relaxed pl-0 md:pl-14">
                      {exp.description}
                    </div>
                  </div>

                  {/* Number */}
                  <div className="hidden md:block text-right">
                    <span className="font-mono text-6xl text-foreground/10 group-hover:text-primary/20 transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-24 md:py-32 border-t-2 border-foreground"
      >

        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                03 — Contact
              </span>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl mt-4 leading-tight">
                Let&apos;s build
                <br />
                something
                <br />
                <span className="text-primary">together.</span>
              </h2>
            </div>

            {/* Right */}
            <div className="space-y-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Open to collaborations, DevRel opportunities, and content
                projects. Whether you want to work together or just say hello,
                I&apos;d love to hear from you.
              </p>

              <div className="space-y-4">
                <a
                  href="mailto:hey@atharva.codes"
                  className="group flex items-center justify-between border-2 border-foreground p-6 hover:bg-foreground hover:text-background transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground group-hover:text-background/70">
                      Email me at
                    </span>
                    <p className="text-xl md:text-2xl font-medium mt-1">
                      hey@atharva.codes
                    </p>
                  </div>
                  <FaArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </a>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4 pt-4">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Find me on
                </span>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnonymousMessage />

      {/* Footer */}
      <footer className="py-8 border-t-2 border-foreground">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-sm text-muted-foreground">
              © {new Date().getFullYear()} Atharva Deosthale
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                Back to top
              </a>
              <a
                href="https://github.com/atharvadeosthale/portfolio"
                target="_blank"
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
              >
                Source
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
