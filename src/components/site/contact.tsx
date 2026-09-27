import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { EMAIL, socialLinks } from "@/lib/site";
import { cn } from "@/lib/utils";
import CopyEmail from "./copy-email";

export default function Contact({ compact = false }: { compact?: boolean }) {
  return (
    <footer id="contact" className="contact">
      <span className="contact-mark left-5 top-5 md:left-8 md:top-8" aria-hidden />
      <span className="contact-mark right-5 top-5 md:right-8 md:top-8" aria-hidden />

      <div className="shell relative pt-24 md:pt-32">
        <div
          className={cn(
            "grid gap-12",
            !compact && "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] lg:gap-8"
          )}
        >
          <div>
            <div className="flex items-center gap-3 text-[13px] font-medium text-paper-2/60" data-reveal>
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              Contact
            </div>

            <p
              className="mt-8 font-serif text-[clamp(30px,4vw,60px)] italic leading-none tracking-[-0.03em] text-paper-2/80"
              data-reveal
            >
              Got something in mind?
            </p>

            <h2 className="contact-title font-display mt-4" data-reveal>
              <a href={`mailto:${EMAIL}`} className="inline-block">
                Let&apos;s
                <br />
                <span className="outline">talk</span>
              </a>
            </h2>

            <div className="mt-14 grid gap-10 md:mt-20">
              <div data-reveal>
                <p className="max-w-[460px] text-[17px] leading-relaxed text-paper-2/65">
                  Open to collaborations, DevRel opportunities, and content projects.
                  Whether you want to work together or just say hello, I&apos;d love to
                  hear from you.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="contact-email group inline-flex items-center gap-4 break-all"
                  >
                    {EMAIL}
                    <span className="round-arrow bg-brand text-brand-ink group-hover:rotate-45">
                      <FaArrowRight />
                    </span>
                  </a>
                </div>
                <div className="mt-5">
                  <CopyEmail />
                </div>
              </div>

              <ul className="grid max-w-[640px] grid-cols-2 gap-2" data-reveal>
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social"
                    >
                      <span className="flex min-w-0 flex-col">
                        <span className="text-[15px] font-semibold">{s.label}</span>
                        <span className="truncate text-[12px] opacity-60">{s.handle}</span>
                      </span>
                      <s.icon className="h-4 w-4 shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Its own column, so nothing ever sits on top of the face */}
          {!compact && (
            <div className="contact-photo-wrap" data-reveal="fade">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/atharva-dark.webp"
                alt=""
                width={800}
                height={1130}
                loading="lazy"
                className="contact-photo"
              />
            </div>
          )}
        </div>

        <div className="mt-20 flex flex-col-reverse gap-4 border-t border-paper-2/10 py-6 text-[13px] text-paper-2/50 sm:flex-row sm:items-center sm:justify-between md:mt-28">
          <p>© {new Date().getFullYear()} Atharva Deosthale</p>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="hover:text-paper-2">
              Blog
            </Link>
            <a href="/feed.xml" className="hover:text-paper-2">
              RSS
            </a>
            <a
              href="https://github.com/atharvadeosthale/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-paper-2"
            >
              Source
            </a>
            <a href="#top" className="hover:text-paper-2">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>

      <div className="footer-word font-display pointer-events-none -mb-[0.06em] text-center" aria-hidden>
        Atharva
      </div>
    </footer>
  );
}
