import { useQuery } from "@tanstack/react-query";
import { getLoggerEvent } from "./get-logger-event.request";
import type { GetLoggerEventParams } from "./get-logger-event.types";
import type { LoggerEvent } from "../../entities";
import type { CustomUseQueryOptions } from "../../types/query";

export const getLoggerEventKey = ["logger-event"];

export function useGetLoggerEvent(
  params: GetLoggerEventParams,
  queryProps?: CustomUseQueryOptions<LoggerEvent>,
) {
  return useQuery<LoggerEvent>({
    queryKey: [...getLoggerEventKey, params.id],
    queryFn: () => getLoggerEvent(params),
    ...queryProps,
  });
}
