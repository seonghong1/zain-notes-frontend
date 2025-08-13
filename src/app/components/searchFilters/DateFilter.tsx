"use client";

import { useState, useCallback } from "react";
import {
  getCurrentDate,
  getPreviousDate,
  getNextDate,
  isToday,
} from "@/lib/utils/date";

import { IoCaretBack } from "@react-icons/all-files/io5/IoCaretBack";
import { IoCaretForward } from "@react-icons/all-files/io5/IoCaretForward";
import { FiSun } from "@react-icons/all-files/fi/FiSun";

interface DateFilterProps<T> {
  serchCondition: T;
  setSerchCondition: (condition: T) => void;
}

export default function DateFilter<T>({
  serchCondition,
  setSerchCondition,
}: DateFilterProps<T>) {
  const [date, setDate] = useState<string>(getCurrentDate);

  const handleDateChange = useCallback(
    (newDate: string) => {
      setDate(newDate);
      setSerchCondition({ ...serchCondition, date: newDate });
    },
    [serchCondition, setSerchCondition],
  );

  const handlePreviousDate = useCallback(() => {
    const prevDate = getPreviousDate(date);
    handleDateChange(prevDate);
  }, [date, handleDateChange]);

  const handleNextDate = useCallback(() => {
    const nextDate = getNextDate(date);
    handleDateChange(nextDate);
  }, [date, handleDateChange]);

  return (
    <div className="mt-2 flex items-center gap-2">
      <button
        onClick={handlePreviousDate}
        className="cursor-pointer rounded-md bg-gray-100 px-2 py-1 text-3xl transition-colors hover:bg-gray-200"
        aria-label="이전 날짜"
      >
        <IoCaretBack />
      </button>
      <div className="relative">
        <input
          className={`rounded-md border-2 border-gray-300 p-1 focus:outline-none`}
          type="date"
          value={date}
          onChange={(e) => handleDateChange(e.target.value)}
        />
      </div>

      <button
        onClick={handleNextDate}
        className="cursor-pointer rounded-md bg-gray-100 px-2 py-1 text-3xl transition-colors hover:bg-gray-200"
        aria-label="다음 날짜"
      >
        <IoCaretForward />
      </button>
    </div>
  );
}
