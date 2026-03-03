"use client";

import { useState } from "react";
import { DATABASE_ID, ID, MESSAGES_TABLE_ID, tablesDB } from "@/lib/appwrite";

const MAX_MESSAGE_LENGTH = 2000;

type Status = "idle" | "sending" | "sent" | "error";

export default function AnonymousMessage() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submit = async () => {
    const trimmed = message.trim();
    if (!trimmed || status === "sending") return;

    setStatus("sending");
    setErrorMessage(null);

    try {
      await tablesDB.createRow({
        databaseId: DATABASE_ID,
        tableId: MESSAGES_TABLE_ID,
        rowId: ID.unique(),
        data: { message: trimmed },
      });
      setMessage("");
      setStatus("sent");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  const statusText =
    status === "sending"
      ? "Sending..."
      : status === "sent"
        ? "Sent. Thank you."
        : status === "error"
          ? errorMessage ?? "Something went wrong."
          : "Press Cmd/Ctrl + Enter to send.";

  const isDisabled = status === "sending" || message.trim().length === 0;

  return (
    <section
      id="anonymous-message"
      className="py-24 md:py-32 border-t-2 border-foreground"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-16 items-start">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              04 — Anonymous
            </span>
            <h2 className="font-serif text-4xl md:text-6xl mt-4">
              Leave a note
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              Share a thought, a question, or a quick hello. No name, no
              pressure.
            </p>
          </div>

          <div className="space-y-4">
            <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Your message
            </label>
            <textarea
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
                if (status !== "idle") setStatus("idle");
                if (errorMessage) setErrorMessage(null);
              }}
              onKeyDown={(event) => {
                if (
                  (event.metaKey || event.ctrlKey) &&
                  event.key === "Enter"
                ) {
                  event.preventDefault();
                  void submit();
                }
              }}
              maxLength={MAX_MESSAGE_LENGTH}
              rows={6}
              placeholder="Write your anonymous message here..."
              className="w-full min-h-[160px] border-2 border-foreground bg-card p-6 text-base leading-relaxed placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-y"
            />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p
                className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
                aria-live="polite"
              >
                {statusText}
              </p>
              <button
                type="button"
                onClick={() => void submit()}
                disabled={isDisabled}
                className="btn-editorial-primary disabled:opacity-50 disabled:pointer-events-none"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
