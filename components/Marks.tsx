/** قصر رومانسي أصلي — طابع حكاية، مش شخصية ديزني */
export function PalaceArt() {
  return (
    <svg className="palace" viewBox="0 0 320 200" aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9ec5ea" />
          <stop offset="100%" stopColor="#eaf3fb" />
        </linearGradient>
        <linearGradient id="stone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7fbff" />
          <stop offset="100%" stopColor="#c9daf0" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="url(#sky)" rx="18" />
      <circle className="spark s1" cx="42" cy="38" r="2.2" fill="#fff" />
      <circle className="spark s2" cx="278" cy="28" r="1.8" fill="#fff" />
      <circle className="spark s3" cx="260" cy="58" r="1.4" fill="#fff" />
      <path d="M28 168h264" stroke="#7aa0c4" strokeWidth="2" opacity=".35" />
      <path d="M70 168V98l30-28 30 28v70z" fill="url(#stone)" stroke="#6f92b8" strokeWidth="1.2" />
      <path d="M190 168V92l30-32 30 32v76z" fill="url(#stone)" stroke="#6f92b8" strokeWidth="1.2" />
      <path d="M118 168V78l42-48 42 48v90z" fill="url(#stone)" stroke="#5e84ad" strokeWidth="1.4" />
      <path d="M148 48l12-18 12 18z" fill="#f4fbff" stroke="#5e84ad" />
      <rect x="150" y="118" width="20" height="50" rx="10" fill="#0b2a4a" opacity=".55" />
      <rect x="88" y="118" width="14" height="18" rx="3" fill="#0b2a4a" opacity=".35" />
      <rect x="218" y="118" width="14" height="18" rx="3" fill="#0b2a4a" opacity=".35" />
      <path d="M138 78c14-16 30-16 44 0" fill="none" stroke="#fff" strokeWidth="1.4" opacity=".7" />
      <g className="birds" fill="#0b2a4a" opacity=".35">
        <path d="M54 72c6-4 10-4 14 0-4 2-8 2-14 0z" />
        <path d="M250 66c7-4 12-4 16 0-5 2-10 2-16 0z" />
      </g>
    </svg>
  );
}

export function RingsMark({ className = "rings-mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 36" aria-hidden="true">
      <circle cx="24" cy="20" r="11" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="40" cy="20" r="11" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M24 9.5l2.2-4.2 2.3 1.4-2.1 3.2z" fill="currentColor" />
      <path d="M40 9.5l2.2-4.2 2.3 1.4-2.1 3.2z" fill="currentColor" />
    </svg>
  );
}
