import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto">
      <Navbar />

      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-5">
          <p className="text-2xl font-mono">Hello, I&apos;m</p>
          <h1 className="font-mono text-4xl font-bold">Atharva Deosthale</h1>
          <p className="font-mono text-xl">
            I code and write content about it for a living.
          </p>
        </div>

        <img src="/pfp.jpeg" className="rounded-lg w-52 h-52 object-cover" />
      </div>
    </main>
  );
}
