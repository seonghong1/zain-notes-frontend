import { getCurrentDate, isToday } from "@/lib/utils/date";

export default function Notes() {
  const currentDate = getCurrentDate();
  const isTodayDate = isToday(currentDate);

  return (
    <div>
      <h1>Notes</h1>
      <p>Current Date: {currentDate}</p>
      <p>Is Today: {isTodayDate ? "Yes" : "No"}</p>
    </div>
  );
}
