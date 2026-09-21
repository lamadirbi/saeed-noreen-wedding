import type { Metadata, Viewport } from "next";
import {
  Aref_Ruqaa,
  Cairo,
  Cormorant_Garamond,
  Great_Vibes,
  Noto_Naskh_Arabic,
} from "next/font/google";
import { coupleNames, wedding } from "@/lib/wedding";
import "./globals.css";

const body = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const display = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const hand = Aref_Ruqaa({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-hand",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

const shareText =
  `بكل الحب والفرح… ${wedding.title} يشرّفون بدعوتكم لحضور زفاف ${coupleNames}. ` +
  `${wedding.wedding.weekday} ${wedding.wedding.dateLabel} · ${wedding.wedding.timeLabel} — ` +
  `${wedding.wedding.hall}، ${wedding.wedding.room}. حضوركم يُكمل الفرحة ويزيد البهجة.`;

const ogImage = {
  url: wedding.photos.background,
  width: 1200,
  height: 630,
  alt: `أيادي العروسين ${coupleNames}`,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://saednoreen.duckdns.org"),
  title: `دعوة زفاف ${coupleNames} | ${wedding.title}`,
  description: shareText,
  openGraph: {
    title: `💍 دعوة زفاف ${coupleNames}`,
    description: shareText,
    locale: "ar_PS",
    type: "website",
    url: "/",
    siteName: wedding.title,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `دعوة زفاف ${coupleNames}`,
    description: shareText,
    images: [wedding.photos.background],
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
      className={`${body.variable} ${display.variable} ${hand.variable} ${cormorant.variable} ${script.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
