"use client";

import { useState, useCallback } from "react";
import { getCurrentDate, getPreviousDate, getNextDate, isToday } from "@/lib/utils/date";

interface DateFilterProps<T> {
  serchCondition: T;
  setSerchCondition: (condition: T) => void;
}

export default function DateFilter<T>({ serchCondition, setSerchCondition }: DateFilterProps<T>) {
  const [date, setDate] = useState<string>(getCurrentDate);

  const handleDateChange = useCallback(
    (newDate: string) => {
      setDate(newDate);
      setSerchCondition({ ...serchCondition, date: newDate });
    },
    [serchCondition, setSerchCondition]
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
    <div className="flex gap-2 items-center">
      <button
        onClick={handlePreviousDate}
        className="text-3xl cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
        aria-label="이전 날짜"
      >
        ⬅️
      </button>
      <div className="relative">
        {isToday(date) && (
          <p className="text-sm absolute top-0 left-1/2 -translate-y-full -translate-x-1/2">
            Today
          </p>
        )}
        <input
          className="border-2 border-gray-300 rounded-md p-1 focus:border-blue-500 focus:outline-none"
          type="date"
          value={date}
          onChange={(e) => handleDateChange(e.target.value)}
        />
      </div>

      <button
        onClick={handleNextDate}
        className="text-3xl cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100 transition-colors"
        aria-label="다음 날짜"
      >
        ➡️
      </button>
    </div>
  );
}
