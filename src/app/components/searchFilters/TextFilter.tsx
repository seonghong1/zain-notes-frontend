"use client";
import { HiOutlineSearch } from "react-icons/hi";

interface TextFilterProps<T> {
  filterKey: keyof T;
  serchCondition: T;
  setSerchCondition: (condition: T) => void;
}

export default function TextFilter<T>({
  filterKey,
  serchCondition,
  setSerchCondition,
}: TextFilterProps<T>) {
  return (
    <div className="relative flex w-full items-center justify-center gap-2">
      <HiOutlineSearch className="absolute top-1/2 left-2 -translate-y-1/2 text-2xl text-gray-500" />
      <input
        className="hover:border-main w-full rounded-md border-2 border-gray-300 p-1 pl-8 outline-none"
        type="text"
        value={(serchCondition[filterKey] as string) || ""}
        onChange={(e) =>
          setSerchCondition({ ...serchCondition, [filterKey]: e.target.value })
        }
      />
    </div>
  );
}
