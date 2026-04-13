import { api } from "../../api";
import { serializeLoggerEvent } from "../../serializers";
import type {
  GetLoggerEventParams,
  GetLoggerEventRawResponse,
} from "./get-logger-event.types";
import type { LoggerEvent } from "../../entities";

export async function getLoggerEvent({
  id,
}: GetLoggerEventParams): Promise<LoggerEvent> {
  const raw = await api.get<GetLoggerEventRawResponse>(`/iot-events/${id}`);
  return serializeLoggerEvent(raw);
}
