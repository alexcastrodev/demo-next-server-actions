export function buildQueryParams<T extends object>(params: T) {
  return Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== ""),
  ) as Record<string, string | number | boolean>;
}
