"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdArrowBack } from "@react-icons/all-files/io/IoMdArrowBack";

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
      className="bg-main absolute top-2 left-2 cursor-pointer rounded-md p-2 text-xl text-white opacity-70 hover:opacity-100 md:top-5 md:left-5 md:p-1 md:text-3xl"
      onClick={goToBack}
    >
      <IoMdArrowBack />
    </button>
  );
}
