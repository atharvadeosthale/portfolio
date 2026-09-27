import Nav from "@/components/site/nav";
import Hero from "@/components/home/hero";
import About from "@/components/home/about";
import Tapes from "@/components/home/tapes";
import Bento from "@/components/home/bento";
import Process from "@/components/home/process";
import Testimonials from "@/components/home/testimonials";
import Experience from "@/components/home/experience";
import Writing from "@/components/home/writing";
import Contact from "@/components/site/contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Tapes />

        <Bento />
        <Process />

        <section id="experience" className="pt-24 md:pt-40">
          <div className="shell">
            <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
              <div data-reveal>
                <p className="kicker mb-5">Experience</p>
                <h2 className="font-display text-[clamp(64px,10vw,168px)]">
                  Where I&apos;ve <span className="font-serif font-normal normal-case italic tracking-[-0.04em]">been</span>
                </h2>
              </div>
              <p className="max-w-[300px] pb-3 text-[15px] leading-relaxed text-muted-foreground" data-reveal>
                DevRel, docs and technical writing across developer tools, AI and
                web3 since 2021.
              </p>
            </div>
            <Experience />
          </div>
        </section>

        <Testimonials />
        <Writing />
      </main>
      <Contact />
    </>
  );
}
