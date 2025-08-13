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
        className={`${notoSansKR.variable} ${geistSans.variable} flex h-screen w-screen items-center justify-center antialiased`}
      >
        <div className="relative h-[70%] w-[70%] rounded-lg bg-white p-10">
          {pathname !== "/" && pathname !== "/auth/signin/" && <BackButton />}
          {children}
        </div>
      </body>
    </html>
  );
}
