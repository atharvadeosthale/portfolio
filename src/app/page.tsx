import Experience from "@/components/experience";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
  FaGithub,
  FaPen,
} from "react-icons/fa6";
import { experiences } from "../../constants/experiences";

export const metadata = {
  title: "Atharva Deosthale - Portfolio",
  description:
    "Hello, I'm Atharva Deosthale. I code and create content about it for a living. Feel free to reach out to me on my socials or email!",
};

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-5 xl:p-0">
      <Navbar />

      {/* Hero section */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center">
        <div className="flex flex-col gap-5">
          <p className="text-2xl">Hello, I&apos;m</p>
          <h1 className="text-4xl font-bold">Atharva Deosthale</h1>
          <p className="text-xl">
            I code and create content about it for a living.
          </p>

          <div className="flex flex-wrap gap-3 md:gap-5">
            <a href="mailto:hey@atharva.codes">
              <Button>Email me</Button>
            </a>
            <a href="https://youtube.com/AtharvaDeosthale" target="_blank">
              <Button variant="outline">
                <FaYoutube />
              </Button>
            </a>
            <a href="https://blog.atharva.codes" target="_blank">
              <Button variant="outline">
                <FaPen />
              </Button>
            </a>
            <a href="https://x.com/athudeosthale" target="_blank">
              <Button variant="outline">
                <FaXTwitter />
              </Button>
            </a>
            <a href="https://linkedin.com/in/atharvadeosthale" target="_blank">
              <Button variant="outline">
                <FaLinkedin />
              </Button>
            </a>
            <a href="https://github.com/atharvadeosthale" target="_blank">
              <Button variant="outline">
                <FaGithub />
              </Button>
            </a>
          </div>
        </div>

        <img
          src="/pfp.jpeg"
          className="rounded-lg w-full mb-10 md:mb-0 md:w-52 h-auto object-cover"
        />
      </div>

      {/* About section */}
      <div className="mt-20 md:mt-16">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <div className="border border-gray-500 rounded-lg p-6 ">
          <p className="text-lg leading-relaxed mb-4">
            I'm Atharva Deosthale, a passionate developer and content creator
            with a love for all things tech. With a background in Developer
            Relations and Technical Writing, I bridge the gap between complex
            technologies and developer communities.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            My journey in tech has led me through various roles, from crafting
            AI workflows at MyShell.ai to empowering blockchain developers at
            thirdweb. I thrive on sharing knowledge and helping others navigate
            the ever-evolving world of programming.
          </p>
          <p className="text-lg leading-relaxed">
            When I'm not coding or creating content, you can find me exploring
            the latest tech trends, contributing to open-source projects, or
            brainstorming my next YouTube video. Let's connect and build
            something amazing together!
          </p>
        </div>
      </div>

      {/* Experiences section */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold mt-20 md:mt-10">Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          {experiences.map((experience, index) => (
            <Experience key={index} {...experience} />
          ))}
        </div>
      </div>
    </main>
  );
}
