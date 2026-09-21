"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { formatWishDate } from "@/lib/format";
import type { PublicWish } from "@/lib/types";
import { RingsMark } from "@/components/Marks";

const MAX = 180;
const TOKEN_KEY = "sn-wish-tokens";

function loadTokens(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(TOKEN_KEY) || "{}") as Record<string, string>;
  } catch {
    return {};
  }
}

function saveToken(id: string, token: string) {
  const map = loadTokens();
  map[id] = token;
  localStorage.setItem(TOKEN_KEY, JSON.stringify(map));
}

function dropToken(id: string) {
  const map = loadTokens();
  delete map[id];
  localStorage.setItem(TOKEN_KEY, JSON.stringify(map));
}

export function Guestbook() {
  const [wishes, setWishes] = useState<PublicWish[]>([]);
  const [tokens, setTokens] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [thumb, setThumb] = useState(0);
  const [showThumb, setShowThumb] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  function syncThumb() {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setShowThumb(max > 8);
    if (max <= 0) {
      setThumb(0);
      return;
    }
    const track = el.clientHeight - 36;
    setThumb((el.scrollTop / max) * Math.max(track, 0));
  }

  useEffect(() => {
    setTokens(loadTokens());
    let live = true;
    async function load() {
      try {
        const res = await fetch("/api/wishes", { cache: "no-store" });
        const data = (await res.json()) as { wishes?: PublicWish[] };
        if (live && data.wishes) setWishes(data.wishes);
      } catch {
        /* ignore */
      }
    }
    load();
    const id = window.setInterval(load, 12000);
    return () => {
      live = false;
      window.clearInterval(id);
    };
  }, []);

  useEffect(() => {
    syncThumb();
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => syncThumb();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncThumb);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncThumb);
    };
  }, [wishes]);

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
      const data = (await res.json()) as { wish?: PublicWish; token?: string; error?: string };
      if (!res.ok || !data.wish || !data.token) {
        setStatus("error");
        setError(data.error || "تعذّر الإرسال.");
        return;
      }
      saveToken(data.wish.id, data.token);
      setTokens(loadTokens());
      setWishes((curr) => [data.wish!, ...curr]);
      setMessage("");
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("تعذّر الاتصال.");
    }
  }

  async function onDelete(id: string) {
    const token = tokens[id];
    if (!token) return;
    const res = await fetch("/api/wishes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, token }),
    });
    if (!res.ok) return;
    dropToken(id);
    setTokens(loadTokens());
    setWishes((curr) => curr.filter((w) => w.id !== id));
  }

  async function onSave(id: string) {
    const token = tokens[id];
    if (!token || draft.trim().length < 2) return;
    const res = await fetch("/api/wishes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, token, message: draft }),
    });
    const data = (await res.json()) as { wish?: PublicWish };
    if (!res.ok || !data.wish) return;
    setWishes((curr) => curr.map((w) => (w.id === id ? data.wish! : w)));
    setEditing(null);
  }

  return (
    <section className="panel wishes reveal" id="wishes">
      <p className="eyebrow">التهاني</p>
      <h2 className="wish-title">كلمة للعروسين</h2>
      <p className="wish-lead">اتركوا أثر محبة يبقى في دفتريهما</p>

      <form className="wish-form" onSubmit={onSubmit}>
        <label className="field">
          <span>اسمك</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="اكتب اسمك الكريم"
            maxLength={40}
            required
            autoComplete="name"
          />
        </label>
        <label className="field">
          <span>تهنئتك</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="بارك الله لكما…"
            maxLength={MAX}
            rows={3}
            required
          />
        </label>
        <input
          className="hp"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          aria-hidden="true"
        />
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "تُرسل…" : "أرسل التهنئة"}
        </button>
        <p className={`form-status ${status}`} role="status">
          {status === "sent" && "وصلت. شكرًا لكم."}
          {status === "error" && error}
        </p>
      </form>

      <div className="wish-board">
        <div className="wish-scroll" ref={scrollRef} aria-label="التهاني">
          {wishes.length === 0 ? (
            <p className="empty">كن أول من يكتب.</p>
          ) : (
            wishes.map((wish) => {
              const mine = Boolean(tokens[wish.id]);
              return (
                <article className="wish-card" key={wish.id}>
                  <RingsMark className="wish-seal" />
                  {editing === wish.id ? (
                    <>
                      <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={3} maxLength={MAX} />
                      <div className="wish-actions">
                        <button type="button" onClick={() => onSave(wish.id)}>حفظ</button>
                        <button type="button" className="ghost" onClick={() => setEditing(null)}>إلغاء</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p>{wish.message}</p>
                      <footer>
                        <strong>{wish.name}</strong>
                        <time dateTime={wish.createdAt}>{formatWishDate(wish.createdAt)}</time>
                      </footer>
                      {mine ? (
                        <div className="wish-actions">
                          <button
                            type="button"
                            className="ghost"
                            onClick={() => {
                              setEditing(wish.id);
                              setDraft(wish.message);
                            }}
                          >
                            تعديل
                          </button>
                          <button type="button" className="ghost danger" onClick={() => onDelete(wish.id)}>
                            حذف
                          </button>
                        </div>
                      ) : null}
                    </>
                  )}
                </article>
              );
            })
          )}
        </div>
        {showThumb ? (
          <div className="ring-track" aria-hidden="true">
            <div className="ring-thumb" style={{ transform: `translateY(${thumb}px)` }}>
              <RingsMark className="thumb-ring" />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
