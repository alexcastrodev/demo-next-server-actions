export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4567";

export function getLocale(): string {
  return typeof navigator !== "undefined" ? navigator.language : "en";
}
