import { useQuery } from "@tanstack/react-query";
import { getStatsAction } from "./get-stats.action";
import type { Stats } from "../../entities";
import type { CustomUseQueryOptions } from "../../types/query";

export const getStatsKey = ["stats"];

export function useGetStats(queryProps?: CustomUseQueryOptions<Stats>) {
  return useQuery<Stats>({
    queryKey: getStatsKey,
    queryFn: getStatsAction,
    ...queryProps,
  });
}
