import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getStats } from "./get-stats.request";
import type { Stats } from "../../entities";

export const getStatsKey = ["stats"];

export function useGetStats(queryProps?: UseQueryOptions<Stats>) {
  return useQuery<Stats>({
    queryKey: getStatsKey,
    queryFn: getStats,
    ...queryProps,
  });
}
