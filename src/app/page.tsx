import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { FaLinkedin, FaXTwitter, FaYoutube, FaGithub } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto">
      <Navbar />

      {/* Hero section */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-5">
          <p className="text-2xl">Hello, I&apos;m</p>
          <h1 className="text-4xl font-bold">Atharva Deosthale</h1>
          <p className="text-xl">
            I code and write content about it for a living.
          </p>

          <div className="flex gap-5">
            <a href="mailto:hey@atharva.codes">
              <Button>Email me</Button>
            </a>
            <a href="https://youtube.com/AtharvaDeosthale" target="_blank">
              <Button variant="outline">
                <FaYoutube />
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

        <img src="/pfp.jpeg" className="rounded-lg w-52 h-auto object-cover" />
      </div>
    </main>
  );
}
