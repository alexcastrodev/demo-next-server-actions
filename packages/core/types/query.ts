import type { UseQueryOptions } from "@tanstack/react-query";

export type CustomUseQueryOptions<TData> = Omit<
  UseQueryOptions<TData>,
  "queryKey"
>;
