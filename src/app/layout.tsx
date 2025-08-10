"use client";

import "./globals.css";
import Head from "./head";

import { Geist } from "next/font/google";
import { Noto_Sans_KR } from "next/font/google";
import BackButton from "./components/buttons/BackButton";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="ko">
      <Head />
      <body
        className={`${notoSansKR.variable} ${geistSans.variable} antialiased w-screen h-screen flex justify-center items-center`}
      >
        <div className="relative w-[70%] h-[70%] bg-white rounded-lg p-10 overflow-y-auto">
          {pathname !== "/" && pathname !== "/auth/signin/" && <BackButton />}
          {children}
        </div>
      </body>
    </html>
  );
}
