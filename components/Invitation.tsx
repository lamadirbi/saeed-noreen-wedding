"use client";

import { useEffect, useState } from "react";
import { Countdown } from "@/components/Countdown";
import { Guestbook } from "@/components/Guestbook";
import { coupleNames, wedding } from "@/lib/wedding";

type Phase = "gate" | "open";

function calendarHref() {
  const start = new Date(wedding.wedding.dateISO);
  const end = new Date(wedding.wedding.endISO);
  const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `حفل زفاف ${coupleNames}`,
    dates: `${stamp(start)}/${stamp(end)}`,
    location: `${wedding.wedding.hall} — ${wedding.wedding.room}`,
    details: wedding.familiesLine,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function Invitation({ guest }: { guest: string }) {
  const [phase, setPhase] = useState<Phase>("gate");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("sn-opened") === "1") setPhase("open");
    } catch {
      /* private */
    }
    setReady(true);
  }, []);

  function enter() {
    setPhase("open");
    try {
      sessionStorage.setItem("sn-opened", "1");
    } catch {
      /* ignore */
    }
  }

  if (!ready) return <div className="boot" />;

  return (
    <main className="page" data-phase={phase}>
      <div className="bg" style={{ backgroundImage: `url(${wedding.photos.background})` }} aria-hidden="true" />
      <div className="bg-veil" aria-hidden="true" />

      {phase === "gate" ? (
        <section className="gate">
          <p className="gate-eyebrow">دعوة زفاف</p>
          <div className="gate-photo">
            <img src={wedding.photos.groom} alt={wedding.groom.full} />
          </div>
          <h1 className="gate-title">{wedding.title}</h1>
          <p className="gate-names">
            <span>{wedding.groom.first}</span>
            <em>و</em>
            <span>{wedding.bride.first}</span>
          </p>
          {guest ? <p className="gate-guest">إلى {guest}</p> : null}
          <p className="gate-lead">بكل الحب ندعوكم لمشاركتنا فرحتنا</p>
          <button type="button" className="enter-btn" onClick={enter}>
            ادخل إلى الدعوة
          </button>
        </section>
      ) : (
        <div className="scroll">
          <header className="topbar">
            <span>{wedding.title}</span>
            <a href="#wishes">التهاني</a>
          </header>

          <section className="hero block">
            <div className="hero-photo">
              <img src={wedding.photos.groom} alt={`العريس ${wedding.groom.full}`} />
            </div>
            {wedding.showBismillah ? (
              <p className="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            ) : null}
            <p className="block-kicker">دعوة زفاف</p>
            <h1 className="names">
              <span>{wedding.groom.first}</span>
              <em>و</em>
              <span>{wedding.bride.first}</span>
            </h1>
            <p className="verse">{wedding.verse}</p>
          </section>

          <section className="block families">
            <p className="block-kicker">يتشرّف</p>
            <div className="parents">
              <div>
                <span>والد العريس</span>
                <strong>{wedding.groom.father}</strong>
                <em>{wedding.groom.fatherTitle}</em>
              </div>
              <div className="parents-mark" aria-hidden="true">∞</div>
              <div>
                <span>والد العروس</span>
                <strong>{wedding.bride.father}</strong>
                <em>{wedding.bride.fatherTitle}</em>
              </div>
            </div>
            <p className="families-line">{wedding.familiesLine}</p>
            <p className="couple-line">
              <strong>{wedding.groom.first}</strong>
              <span>و</span>
              <strong>{wedding.bride.first}</strong>
            </p>
          </section>

          <section className="block when" id="when">
            <p className="block-kicker">الموعد</p>
            <h2>
              يوم {wedding.wedding.weekday}
              <br />
              {wedding.wedding.dateLabel}
            </h2>
            <p className="time-line">{wedding.wedding.timeLabel} · توقيت غزة — فلسطين</p>
            <Countdown />
            <a className="ghost-btn" href={calendarHref()} target="_blank" rel="noreferrer">
              احفظ الموعد
            </a>
          </section>

          <section className="block venue">
            <p className="block-kicker">وجهتنا</p>
            <h2>الموقع</h2>
            <div className="venue-card">
              <strong>{wedding.wedding.hall}</strong>
              <span>{wedding.wedding.room}</span>
            </div>
            <div className="actions">
              <a className="solid-btn" href={wedding.wedding.mapsUrl} target="_blank" rel="noreferrer">
                افتح موقع الصالة
              </a>
              <a className="ghost-btn" href={calendarHref()} target="_blank" rel="noreferrer">
                احفظ الموعد
              </a>
            </div>
          </section>

          <section className="block youth">
            <p className="block-kicker">{wedding.youth.name}</p>
            <h2>{wedding.youth.when}</h2>
            <p className="youth-place">{wedding.youth.place}</p>
            <p className="youth-detail">{wedding.youth.detail}</p>
            <p className="youth-artist">{wedding.youth.artist}</p>
          </section>

          <section className="block notes">
            <p className="block-kicker">بكل محبة</p>
            <h2>ملاحظات</h2>
            <ul>
              {wedding.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>

          <section className="block couple-end">
            <p className="block-kicker">ذكرى جميلة</p>
            <figure className="couple-photo">
              <img src={wedding.photos.couple} alt={`${wedding.groom.first} و${wedding.bride.first}`} />
            </figure>
            <p className="closing">{wedding.closing}</p>
          </section>

          <Guestbook />

          <footer className="footer">حضوركم بيننا فرحتنا</footer>
        </div>
      )}
    </main>
  );
}
