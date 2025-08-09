/**
 * 날짜 관련 유틸리티 함수들
 */

// 현재 날짜를 YYYY-MM-DD 형식으로 반환
export function getCurrentDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Date 객체를 YYYY-MM-DD 형식으로 변환
export function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// YYYY-MM-DD 형식의 문자열을 Date 객체로 변환
export function parseDateFromYYYYMMDD(dateString: string): Date {
  return new Date(dateString);
}

// 날짜가 유효한지 확인
export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

// 두 날짜를 비교하여 같은 날짜인지 확인
export function isSameDate(date1: Date | string, date2: Date | string): boolean {
  const d1 = typeof date1 === "string" ? parseDateFromYYYYMMDD(date1) : date1;
  const d2 = typeof date2 === "string" ? parseDateFromYYYYMMDD(date2) : date2;

  return formatDateToYYYYMMDD(d1) === formatDateToYYYYMMDD(d2);
}

// 오늘 날짜인지 확인
export function isToday(date: Date | string): boolean {
  return isSameDate(date, getCurrentDate());
}

// 특정 날짜에서 일수를 더하거나 빼기
export function addDays(date: Date | string, days: number): string {
  const dateObj = typeof date === "string" ? parseDateFromYYYYMMDD(date) : date;
  dateObj.setDate(dateObj.getDate() + days);
  return formatDateToYYYYMMDD(dateObj);
}

// 이전 날짜 가져오기
export function getPreviousDate(date: Date | string): string {
  return addDays(date, -1);
}

// 다음 날짜 가져오기
export function getNextDate(date: Date | string): string {
  return addDays(date, 1);
}
