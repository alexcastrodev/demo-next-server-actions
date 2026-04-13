import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getStatsAction } from "./get-stats.action";
import type { Stats } from "../../entities";

export const getStatsKey = ["stats"];

export function useGetStats(queryProps?: UseQueryOptions<Stats>) {
  return useQuery<Stats>({
    queryKey: getStatsKey,
    queryFn: getStatsAction,
    ...queryProps,
  });
}
