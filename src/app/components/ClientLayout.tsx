"use client";

import { usePathname } from "next/navigation";
import BackButton from "./buttons/BackButton";

export default function ClientLayout() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/auth/signin/") {
    return null;
  }

  return <BackButton />;
}
