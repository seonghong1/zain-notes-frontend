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

// 현재 타임존 기준으로 특정 날짜의 시작일(00:00:00)을 UTC로 변환
export function getStartOfDayUTC(dateString: string): string {
  // YYYY-MM-DD 형식의 문자열을 현재 타임존 기준 Date 객체로 생성
  const [year, month, day] = dateString.split("-").map(Number);
  const localDate = new Date(year, month - 1, day, 0, 0, 0, 0);

  // UTC로 변환 (ISO 문자열로 변환하면 자동으로 UTC로 변환됨)
  return localDate.toISOString();
}

// 현재 타임존 기준으로 특정 날짜의 종료일(23:59:59.999)을 UTC로 변환
export function getEndOfDayUTC(dateString: string): string {
  // YYYY-MM-DD 형식의 문자열을 현재 타임존 기준 Date 객체로 생성
  const [year, month, day] = dateString.split("-").map(Number);
  const localDate = new Date(year, month - 1, day, 23, 59, 59, 999);

  // UTC로 변환
  return localDate.toISOString();
}

// 현재 타임존 기준으로 특정 날짜의 시작일과 종료일을 UTC로 변환하여 객체로 반환
export function getDayRangeUTC(dateString: string): {
  start: string;
  end: string;
} {
  return {
    start: getStartOfDayUTC(dateString),
    end: getEndOfDayUTC(dateString),
  };
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

// UTC 시간을 로컬 타임존 기준 yyyy-mm-dd hh:mm:ss 형식으로 변환
export function formatUTCDateToLocal(utcString: string): string {
  const date = new Date(utcString);

  // 시스템/브라우저의 로컬 타임존 기준으로 변환
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
