"use client";

import { useEffect, useRef, useState } from "react";
import { Countdown } from "@/components/Countdown";
import { Guestbook } from "@/components/Guestbook";
import { PalaceArt, RingsMark } from "@/components/Marks";
import { wedding } from "@/lib/wedding";

type Phase = "gate" | "opening" | "open";

export function Invitation({ guest }: { guest: string }) {
  const [phase, setPhase] = useState<Phase>("gate");
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function song() {
    if (!audioRef.current) {
      const audio = new Audio("/audio/song.mp3");
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0.85;
      audio.addEventListener("play", () => setPlaying(true));
      audio.addEventListener("pause", () => setPlaying(false));
      audioRef.current = audio;
    }
    return audioRef.current;
  }

  useEffect(() => {
    setReady(true);
    song().load();
  }, []);

  function enter() {
    if (phase !== "gate") return;
    const audio = song();
    audio.currentTime = 0;
    void audio.play().catch(() => setPlaying(false));
    setPhase("opening");
    window.setTimeout(() => setPhase("open"), 900);
  }

  function toggleMusic() {
    const audio = song();
    if (audio.paused) void audio.play().catch(() => setPlaying(false));
    else audio.pause();
  }

  if (!ready) return <div className="boot" />;

  return (
    <main className="page" data-phase={phase}>
      <div className="bg" style={{ backgroundImage: `url(${wedding.photos.background})` }} aria-hidden="true" />
      <div className="veil" aria-hidden="true" />
      <div className="floaters" aria-hidden="true">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className={`petal p${i + 1}`} />
        ))}
      </div>

      {phase !== "open" ? (
        <section className="gate" data-opening={phase === "opening" ? "true" : "false"}>
          <p className="eyebrow soft">{wedding.title}</p>
          <div className="gate-frame rise">
            <img src={wedding.photos.groom} alt={wedding.groom.full} />
          </div>
          <p className="english-names rise delay">
            <span>{wedding.english.groom}</span>
            <RingsMark />
            <span>{wedding.english.bride}</span>
          </p>
          {guest ? <p className="guest soft">إلى {guest}</p> : null}
          <button type="button" className="enter rise delay2" onClick={enter}>
            افتح الدعوة
          </button>
        </section>
      ) : (
        <>
          <button
            type="button"
            className={playing ? "music-btn on" : "music-btn"}
            onClick={toggleMusic}
            aria-pressed={playing}
            aria-label={playing ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
          >
            {playing ? "إيقاف" : "تشغيل"}
          </button>

          <div className="flow">
            <section className="panel hero reveal">
              <div className="couple-frame">
                <img src={wedding.photos.couple} alt={`${wedding.groom.first} و${wedding.bride.first}`} />
              </div>
              {wedding.showBismillah ? <p className="bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p> : null}
              <p className="eyebrow">دعوة زفاف</p>
              <h1 className="ar-names">
                <span>{wedding.groom.first}</span>
                <RingsMark className="rings-inline" />
                <span>{wedding.bride.first}</span>
              </h1>
              <p className="english-names mini">
                {wedding.english.groom} & {wedding.english.bride}
              </p>
              <p className="verse">{wedding.verse}</p>
            </section>

            <section className="panel families reveal">
              <p className="eyebrow">يتشرّف</p>
              <div className="parents">
                <div>
                  <span>والد العريس</span>
                  <strong>{wedding.groom.father}</strong>
                  <em>{wedding.groom.fatherTitle}</em>
                </div>
                <div>
                  <span>والد العروس</span>
                  <strong>{wedding.bride.father}</strong>
                  <em>{wedding.bride.fatherTitle}</em>
                </div>
              </div>
              <p className="invite-line">
                {wedding.inviteLine}
                <strong>
                  {" "}
                  {wedding.groom.first} و{wedding.bride.first}
                </strong>
              </p>
            </section>

            <section className="panel when reveal" id="when">
              <p className="eyebrow">الموعد</p>
              <h2>{wedding.wedding.weekday}</h2>
              <p className="date-big">{wedding.wedding.dateLabel}</p>
              <p className="time-big">{wedding.wedding.timeLabel}</p>
              <Countdown />
            </section>

            <section className="panel venue reveal">
              <p className="eyebrow">الصالة</p>
              <div className="palace-wrap">
                <PalaceArt />
              </div>
              <h2>{wedding.wedding.hall}</h2>
              <p className="room">{wedding.wedding.room}</p>
            </section>

            <section className="panel youth reveal">
              <p className="eyebrow">{wedding.youth.name}</p>
              <h2>{wedding.youth.when}</h2>
              <p className="place">{wedding.youth.place}</p>
              <p className="detail">{wedding.youth.detail}</p>
              <p className="artist">{wedding.youth.artist}</p>
            </section>

            <Guestbook />

            <p className="closing reveal">{wedding.closing}</p>
          </div>
        </>
      )}
    </main>
  );
}
