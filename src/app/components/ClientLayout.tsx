"use client";

import { usePathname } from "next/navigation";
import BackButton from "./buttons/BackButton";
import { UserWelcomeBanner } from "./UserWelcomeBanner";

export default function ClientLayout() {
  const pathname = usePathname();

  if (pathname === "/auth/signin/") {
    return null;
  }

  return (
    <>
      <UserWelcomeBanner />
      <BackButton />
    </>
  );
}
