"use client";

import { WELCOME_BANNER_MESSAGE } from "@/constants/welcomBannerMessage";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";

export const UserWelcomeBanner = () => {
  const { user } = useUser();
  const [message, setMessage] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 클라이언트에서만 랜덤 메시지 생성
    const randomIndex = Math.floor(
      Math.random() * WELCOME_BANNER_MESSAGE.length,
    );
    setMessage(WELCOME_BANNER_MESSAGE[randomIndex]);
  }, []);

  const convertMessage = (message: string) => {
    return message.replace("${닉네임}", user?.nickname || "");
  };

  console.log("rerender");

  // 서버와 클라이언트가 일치하도록 초기값 설정
  if (!mounted) {
    return (
      <div className="absolute top-0 left-[50%] w-full translate-x-[-50%] translate-y-[calc(-100%-20px)]">
        <h1 className="text-center text-2xl font-bold text-gray-300">
          환영합니다
        </h1>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-[50%] w-full translate-x-[-50%] translate-y-[calc(-100%-20px)]">
      <h1 className="text-center text-2xl font-bold text-gray-300">
        {convertMessage(message)}
      </h1>
    </div>
  );
};
