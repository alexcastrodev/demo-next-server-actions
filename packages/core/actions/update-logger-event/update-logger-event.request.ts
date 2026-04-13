import { api } from "../../api";
import { serializeLoggerEvent } from "../../serializers";
import type {
  UpdateLoggerEventParams,
  UpdateLoggerEventRawResponse,
} from "./update-logger-event.types";
import type { LoggerEvent } from "../../entities";

export async function updateLoggerEvent({
  id,
  payload,
}: UpdateLoggerEventParams): Promise<LoggerEvent> {
  const raw = await api.patch<UpdateLoggerEventRawResponse>(
    `/iot-events/${id}`,
    payload,
  );
  return serializeLoggerEvent(raw);
}
