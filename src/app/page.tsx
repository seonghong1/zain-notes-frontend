"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const request = async () => {
    try {
      const res = await fetch("http://localhost:3001/", {
        // NestJS 백엔드의 루트 경로
        method: "GET",
        cache: "no-store", // 개발 중에는 캐싱하지 않는 것이 편리합니다.
      });

      if (!res.ok) {
        throw new Error(`HTTP 오류! 상태: ${res.status}`);
      }

      // NestJS가 문자열을 반환하므로 res.text()를 사용합니다.
      setMessage(await res.text()); // <--- 여기가 핵심 변경 사항입니다!

      console.log("서버에서 불러온 메시지 (Next.js 서버 로그):", message);
    } catch (err) {
      if (err instanceof Error) {
        setError(`데이터를 불러오는 데 실패했습니다: ${err.message}`);
      } else {
        setError("데이터를 불러오는 데 실패했습니다: 알 수 없는 오류");
      }
    }
  };

  const testRequest = async () => {
    try {
      const res = await fetch("http://localhost:3001/notes", {
        // NestJS 백엔드의 루트 경로
        method: "GET",
        cache: "no-store", // 개발 중에는 캐싱하지 않는 것이 편리합니다.
      });

      if (!res.ok) {
        throw new Error(`HTTP 오류! 상태: ${res.status}`);
      }

      // NestJS가 문자열을 반환하므로 res.text()를 사용합니다.
      setMessage(await res.text()); // <--- 여기가 핵심 변경 사항입니다!

      console.log("서버에서 불러온 메시지 (Next.js 서버 로그):", message);
    } catch (err) {
      if (err instanceof Error) {
        setError(`데이터를 불러오는 데 실패했습니다: ${err.message}`);
      } else {
        setError("데이터를 불러오는 데 실패했습니다: 알 수 없는 오류");
      }
    }
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>{message}</h1>
      <h1>{error}</h1>
      <button
        onClick={() => {
          request();
        }}
      >
        request
      </button>

      <button
        onClick={() => {
          testRequest();
        }}
      >
        testRequest
      </button>
    </div>
  );
}
