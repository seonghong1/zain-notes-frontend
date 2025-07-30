import type { Metadata } from "next";
import "./globals.css";
import Head from "./head";

import { Geist } from "next/font/google";
import { Noto_Sans_KR } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Zain Notes",
  description: "Zain Notes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Head />
      <body
        className={`${notoSansKR.variable} ${geistSans.variable} antialiased w-screen h-screen flex justify-center items-center`}
      >
        <div className="w-[70%] h-[70%] bg-white rounded-lg p-10">{children}</div>
      </body>
    </html>
  );
}
