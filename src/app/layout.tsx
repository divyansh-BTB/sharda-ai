import type { Metadata } from "next";
import { Geist_Mono, Mulish } from "next/font/google";
import "./globals.css";

/** Mulish is what ai.shardacare.com uses; matching it keeps the two properties
    visually consistent when a visitor is handed off mid-question. */
const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ask Bhartiya Didi | ShardaCare Healthcity",
  description:
    "Ask ShardaCare Healthcity's AI health assistant in Hindi or English. Find the right doctor, checkup prices, and appointment timings in seconds.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${mulish.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
