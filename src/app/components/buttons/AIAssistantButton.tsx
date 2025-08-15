"use client";

import { PiOpenAiLogoLight } from "react-icons/pi";
import { AiFillOpenAI } from "react-icons/ai";
import AIResultModal from "../modals/AIResultModal";
import { useState } from "react";

export default function AIAssistantButton({
  onAction,
  label,
}: {
  onAction: () => Promise<string>;
  label?: string;
}) {
  const [result, setResult] = useState<string>("");

  const handleAction = async () => {
    try {
      const res = await onAction();
      setResult(res);
    } catch (error) {
      throw error;
    }
  };

  const resetResult = () => {
    setResult("");
  };

  return (
    <div className="relative">
      <button
        onClick={handleAction}
        className="bg-main cursor-pointer rounded-md bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] p-2 text-xl text-white md:top-5 md:left-5 md:p-1 md:text-3xl"
      >
        <PiOpenAiLogoLight />
      </button>
      {label && (
        <div
          className="absolute right-[50%] bottom-0 hidden translate-x-1/2 translate-y-[calc(100%+2px)] items-center gap-1 rounded-md bg-white bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] px-2 py-1 text-xs whitespace-nowrap text-white md:flex"
          style={{
            animation: "bounce-up-down 2s ease-in-out infinite",
          }}
        >
          <AiFillOpenAI />
          {label}
        </div>
      )}

      {result && <AIResultModal result={result} onClose={resetResult} />}
    </div>
  );
}
