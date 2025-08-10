"use client";

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
    <div className="flex gap-2 items-center justify-center w-full">
      <input
        className="p-2 w-3/4 border-2 rounded-md p-1 outline-none border-gray-300 hover:border-main"
        type="text"
        value={(serchCondition[filterKey] as string) || ""}
        onChange={(e) => setSerchCondition({ ...serchCondition, [filterKey]: e.target.value })}
      />
    </div>
  );
}
