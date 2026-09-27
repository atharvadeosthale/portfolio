import { FaArrowRight } from "react-icons/fa6";
import { socialLinks } from "@/lib/site";
import HeroMotion from "./hero-motion";
import LocalTime from "./local-time";
import Seal from "@/components/site/seal";

const NAME = "ATHARVA";

function NameLetters() {
  return (
    <>
      {NAME.split("").map((letter, i) => (
        <span key={i} className="hero-letter" style={{ "--i": i } as React.CSSProperties}>
          {letter}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  return (
    <section id="top" className="hero" data-hero>
      <HeroMotion />

      <div className="hero-glow" aria-hidden />

      <h1 className="sr-only">
        Atharva Deosthale, Developer Advocate at Appwrite
      </h1>

      <p className="hero-hey font-serif italic" aria-hidden>
        <span>Hey,</span> <span>I&apos;m</span>
      </p>

      <div className="hero-name hero-name--back font-display" aria-hidden>
        <NameLetters />
      </div>

      <div className="hero-figure">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/atharva-cutout-sm.webp"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/atharva-cutout.webp"
            alt="Atharva Deosthale"
            width={870}
            height={1878}
            fetchPriority="high"
            className="hero-figure-img"
          />
        </picture>

        {/* The same word again, clipped to the photo's silhouette, so the
            letters hidden behind the body still read as an outline. */}
        <div className="hero-figure-mask" aria-hidden>
          <div className="hero-name hero-name--front font-display">
            <NameLetters />
          </div>
        </div>

        <span className="hero-chip hero-chip--a">DevRel</span>
        <span className="hero-chip hero-chip--b">Videos</span>
        <span className="hero-chip hero-chip--c">Docs &amp; blogs</span>
      </div>

      <div className="hero-top">
        <div className="hero-status">
          <span className="hero-status-dot" />
          Open to collaborations
        </div>
        <LocalTime className="hero-time" />
      </div>

      <div className="hero-bottom">
        <div className="hero-role">
          <p className="kicker mb-3">Currently</p>
          <p className="font-display hero-role-title">
            Developer
            <br />
            Advocate
          </p>
          <a
            href="https://appwrite.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-role-at"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/appwrite.png" alt="" width={20} height={20} />
            at Appwrite
          </a>
          <ul className="hero-socials" aria-label="Social links">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-card">
          <Seal className="hero-seal" />
          <p>
            I write code and make content about it: docs, blog posts and
            YouTube videos for developers.
          </p>
          <div className="hero-card-actions">
            <a href="#contact" className="btn btn-ink">
              Let&apos;s talk
              <FaArrowRight className="btn-arrow" />
            </a>
            <a href="#work" className="btn btn-ghost">
              See my work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
