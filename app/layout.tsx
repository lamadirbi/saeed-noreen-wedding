import type { Metadata, Viewport } from "next";
import { Amiri, Aref_Ruqaa, Cormorant_Garamond, Tajawal } from "next/font/google";
import { coupleNames, wedding } from "@/lib/wedding";
import "./globals.css";

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

const aref = Aref_Ruqaa({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-aref",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: `${wedding.title} · ${coupleNames}`,
  description: `${wedding.familiesLine}. ${wedding.wedding.weekday} ${wedding.wedding.dateLabel}، ${wedding.wedding.timeLabel} — ${wedding.wedding.hall}، ${wedding.wedding.room}.`,
  openGraph: {
    title: `${wedding.title} · ${coupleNames}`,
    description: `${wedding.wedding.hall} · ${wedding.wedding.dateLabel} · ${wedding.wedding.timeLabel}`,
    locale: "ar_PS",
    type: "website",
    images: [{ url: wedding.photos.groom, alt: wedding.groom.full }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b2a4a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${amiri.variable} ${aref.variable} ${cormorant.variable} ${tajawal.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
