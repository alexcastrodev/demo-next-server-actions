import { api } from "../../api";
import { buildQueryParams } from "../../utils/build-query-params";
import { serializeLoggerEvent } from "../../serializers";
import type {
  GetLoggerEventsParams,
  GetLoggerEventsRawResponse,
} from "./get-logger-events.types";
import type { LoggerEvent, Result } from "../../entities";

export async function getLoggerEvents(
  params: GetLoggerEventsParams = {},
): Promise<Result<LoggerEvent>> {
  const raw = await api.get<GetLoggerEventsRawResponse>("/iot-events", {
    params: buildQueryParams(params),
  });
  return { ...raw, data: raw.data.map(serializeLoggerEvent) };
}
