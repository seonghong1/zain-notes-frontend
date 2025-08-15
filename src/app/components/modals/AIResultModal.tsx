"use client";

import { LuCopy } from "react-icons/lu";
import { CgClose } from "react-icons/cg";

export default function AIResultModal({
  result,
  onClose,
}: {
  result: string;
  onClose: () => void;
}) {
  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative flex h-[60%] w-[80%] flex-col rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] p-4 md:w-[60%]">
        <div className="flex items-center justify-between">
          <button
            className="cursor-pointer p-2 text-xl text-white opacity-70 hover:opacity-100"
            onClick={handleCopy}
          >
            <LuCopy />
          </button>
          <button
            className="cursor-pointer p-2 text-2xl text-white opacity-70 hover:opacity-100"
            onClick={onClose}
          >
            <CgClose />
          </button>
        </div>
        <textarea
          className="h-full w-full resize-none border-none bg-transparent p-4 text-black text-white outline-none"
          value={result}
          readOnly
        />
      </div>
    </div>
  );
}
