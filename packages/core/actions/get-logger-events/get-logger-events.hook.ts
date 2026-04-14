import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getLoggerEventsAction } from "./get-logger-events.action";
import type { GetLoggerEventsParams } from "./get-logger-events.types";
import type { LoggerEvent, Result } from "../../entities";
import type { CustomUseQueryOptions } from "../../types/query";

export const getLoggerEventsKey = ["logger-events"];

export function useGetLoggerEvents(
  params: GetLoggerEventsParams = {},
  queryProps?: CustomUseQueryOptions<Result<LoggerEvent>>,
) {
  return useQuery<Result<LoggerEvent>>({
    queryKey: [
      ...getLoggerEventsKey,
      params.page ?? null,
      params.per_page ?? null,
      params.device_id ?? null,
      params.sort_by ?? null,
      params.sort_dir ?? null,
    ],
    queryFn: () => getLoggerEventsAction(params),
    placeholderData: keepPreviousData,
    ...queryProps,
  });
}
