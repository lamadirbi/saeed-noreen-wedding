/** قصر بخط فقط — خلفية شفافة مثل رسم الخاتم */
export function PalaceArt() {
  return (
    <svg className="palace" viewBox="0 0 320 180" fill="none" aria-hidden="true">
      <path
        d="M70 160V96l30-26 30 26v64M190 160V90l30-30 30 30v70M118 160V76l42-46 42 46v84"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M148 44l12-16 12 16" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M36 160h248" stroke="currentColor" strokeWidth="1.6" opacity="0.75" />
      <path d="M158 118v42" stroke="currentColor" strokeWidth="1.6" />
      <rect x="150" y="118" width="20" height="42" rx="10" stroke="currentColor" strokeWidth="1.6" />
      <rect x="88" y="118" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <rect x="218" y="118" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M138 76c14-14 30-14 44 0" stroke="currentColor" strokeWidth="1.4" opacity="0.85" />
      <circle className="spark s1" cx="48" cy="40" r="2" fill="currentColor" />
      <circle className="spark s2" cx="272" cy="32" r="1.6" fill="currentColor" />
      <circle className="spark s3" cx="256" cy="56" r="1.2" fill="currentColor" />
      <path className="birds" d="M52 68c6-4 10-4 14 0M248 62c7-4 12-4 16 0" stroke="currentColor" strokeWidth="1.3" />
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
