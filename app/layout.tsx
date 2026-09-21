import type { Metadata, Viewport } from "next";
import { Amiri, Aref_Ruqaa, Cormorant_Garamond, Great_Vibes, Tajawal } from "next/font/google";
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

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: `${wedding.title} · ${coupleNames}`,
  description: `${wedding.inviteLine}. ${wedding.wedding.weekday} ${wedding.wedding.dateLabel}، ${wedding.wedding.timeLabel} — ${wedding.wedding.hall}.`,
  openGraph: {
    title: `${wedding.title} · ${coupleNames}`,
    description: `${wedding.wedding.hall} · ${wedding.wedding.dateLabel}`,
    locale: "ar_PS",
    type: "website",
    images: [{ url: wedding.photos.couple, alt: coupleNames }],
  },
};

export const viewport: Viewport = {
  themeColor: "#071a30",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${amiri.variable} ${aref.variable} ${cormorant.variable} ${tajawal.variable} ${script.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
