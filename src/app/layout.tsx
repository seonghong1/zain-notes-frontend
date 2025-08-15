import "./globals.css";
import Head from "./head";

import { Geist } from "next/font/google";
import { Noto_Sans_KR } from "next/font/google";
import ClientLayout from "./components/ClientLayout";

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
  return (
    <html lang="ko">
      <Head />
      <body
        className={`${notoSansKR.variable} ${geistSans.variable} flex h-screen w-screen items-center justify-center antialiased`}
      >
        <div className="relative h-[70%] w-[90%] rounded-lg bg-white px-2 py-4 md:h-[70%] md:w-[70%] md:p-10">
          <ClientLayout />
          {children}
        </div>
      </body>
    </html>
  );
}
