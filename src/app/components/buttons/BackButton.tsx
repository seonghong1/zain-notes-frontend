"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BackButton() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const goToBack = () => {
    router.back();
  };

  if (!isClient) {
    return null; // 서버 사이드에서는 아무것도 렌더링하지 않음
  }

  return (
    <button
      className="bg-main absolute top-5 left-5 cursor-pointer rounded-md p-2 text-white opacity-50 hover:opacity-100"
      onClick={goToBack}
    >
      👈
    </button>
  );
}
