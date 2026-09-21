"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/lib/wedding";

type Left = { days: number; hours: number; minutes: number; seconds: number };

function remaining(target: number): Left | null {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  const total = Math.floor(diff / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

const units = [
  ["days", "Days"],
  ["hours", "Hours"],
  ["minutes", "Mins"],
  ["seconds", "Secs"],
] as const;

export function Countdown() {
  const target = new Date(wedding.wedding.dateISO).getTime();
  const [left, setLeft] = useState<Left | null | undefined>(undefined);

  useEffect(() => {
    const tick = () => setLeft(remaining(target));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (left === undefined) return <div className="count-grid count-pending" dir="ltr" aria-hidden="true" />;
  if (!left) return <p className="blessing">بارك الله لكما وجمع بينكما في خير.</p>;

  return (
    <div className="count-grid" dir="ltr" aria-label="Countdown">
      {units.map(([key, label]) => (
        <div className="count-cell" key={key}>
          <strong>{String(left[key]).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
