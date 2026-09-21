"use client";

import { FormEvent, useEffect, useState } from "react";
import { formatWishDate } from "@/lib/format";
import type { Wish } from "@/lib/types";

const MAX = 220;

export function Guestbook() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    let live = true;
    async function load() {
      try {
        const res = await fetch("/api/wishes", { cache: "no-store" });
        const data = (await res.json()) as { wishes?: Wish[] };
        if (live && data.wishes) setWishes(data.wishes);
      } catch {
        /* ignore */
      }
    }
    load();
    const id = window.setInterval(load, 15000);
    return () => {
      live = false;
      window.clearInterval(id);
    };
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, company }),
      });
      const data = (await res.json()) as { wish?: Wish; error?: string };
      if (!res.ok || !data.wish) {
        setStatus("error");
        setError(data.error || "تعذّر الإرسال.");
        return;
      }
      setWishes((curr) => [data.wish!, ...curr]);
      setMessage("");
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("تعذّر الاتصال.");
    }
  }

  return (
    <section className="block wishes-block" id="wishes">
      <p className="block-kicker">بكل محبة</p>
      <h2>كلمة للعروسين</h2>
      <p className="block-lead">اتركوا لنا كلمة تبقى ذكرى جميلة</p>

      <form className="wish-form" onSubmit={onSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="الاسم الكريم"
          maxLength={40}
          required
          autoComplete="name"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="التهنئة"
          maxLength={MAX}
          rows={3}
          required
        />
        <input
          className="hp"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          aria-hidden="true"
        />
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "تُرسل…" : "إرسال التهنئة"}
        </button>
        <p className={`form-status ${status}`} role="status">
          {status === "sent" && "وصلت التهنئة، شكرًا لكم."}
          {status === "error" && error}
        </p>
      </form>

      {wishes.length > 0 ? (
        <ul className="wish-list">
          {wishes.slice(0, 12).map((wish) => (
            <li key={wish.id}>
              <p>{wish.message}</p>
              <footer>
                <strong>{wish.name}</strong>
                <time dateTime={wish.createdAt}>{formatWishDate(wish.createdAt)}</time>
              </footer>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
