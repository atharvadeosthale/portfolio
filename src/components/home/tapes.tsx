const inkWords = ["DevRel", "Documentation", "YouTube", "Technical writing", "Open source", "AI automation"];
const brandWords = ["Write code", "Make content", "Ship docs", "Record", "Edit", "Publish"];

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="tape-star" aria-hidden>
      <path
        fill="currentColor"
        d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z"
      />
    </svg>
  );
}

function Track({ words }: { words: string[] }) {
  return (
    <div className="tape-track font-display">
      {words.map((w) => (
        <span key={w} className="flex items-center gap-[inherit]">
          {w}
          <Star />
        </span>
      ))}
    </div>
  );
}

export default function Tapes() {
  return (
    <div className="tapes" aria-hidden>
      <div className="tape tape--brand">
        <Track words={brandWords} />
        <Track words={brandWords} />
        <Track words={brandWords} />
      </div>
      <div className="tape tape--ink">
        <Track words={inkWords} />
        <Track words={inkWords} />
      </div>
    </div>
  );
}
