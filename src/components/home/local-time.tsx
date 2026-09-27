"use client";

import { useEffect, useState } from "react";

function istNow() {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}

export default function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(istNow());
    const id = setInterval(() => setTime(istNow()), 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className={className}>
      <span>India</span>
      <span className="tabular-nums">{time ?? "--:--"} IST</span>
    </p>
  );
}
