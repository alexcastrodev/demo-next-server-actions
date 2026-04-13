import { getLocale } from "../../constants";

export function applyRequestInterceptor(
  headers: Headers,
  token?: string,
): Headers {
  headers.set("Content-Type", "application/json");
  headers.set("Content-Language", getLocale());

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
    headers.set("Accept-Language", "");
  }

  return headers;
}
