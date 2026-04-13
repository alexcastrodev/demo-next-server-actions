import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getLoggerEvent } from "./get-logger-event.request";
import type { GetLoggerEventParams } from "./get-logger-event.types";
import type { LoggerEvent } from "../../entities";

export const getLoggerEventKey = ["logger-event"];

export function useGetLoggerEvent(
  params: GetLoggerEventParams,
  queryProps?: UseQueryOptions<LoggerEvent>,
) {
  return useQuery<LoggerEvent>({
    queryKey: [...getLoggerEventKey, params.id],
    queryFn: () => getLoggerEvent(params),
    ...queryProps,
  });
}
