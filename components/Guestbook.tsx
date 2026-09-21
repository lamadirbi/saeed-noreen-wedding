"use client";

import { FormEvent, useEffect, useState } from "react";
import { formatWishDate } from "@/lib/format";
import type { PublicWish } from "@/lib/types";

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
      <h2>كلمة للعروسين</h2>

      <form className="wish-form" onSubmit={onSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="اسمك"
          maxLength={40}
          required
          autoComplete="name"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="تهنئتك"
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
          {status === "sending" ? "…" : "أرسل"}
        </button>
        <p className={`form-status ${status}`} role="status">
          {status === "sent" && "وصلت."}
          {status === "error" && error}
        </p>
      </form>

      <div className="wish-scroll" aria-label="التهاني">
        {wishes.length === 0 ? (
          <p className="empty">كن أول من يكتب.</p>
        ) : (
          wishes.map((wish) => {
            const mine = Boolean(tokens[wish.id]);
            return (
              <article className="wish-card" key={wish.id}>
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
    </section>
  );
}
