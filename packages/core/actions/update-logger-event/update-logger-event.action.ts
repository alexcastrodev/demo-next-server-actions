"use server";

import { getServerApi } from "../../api/server";
import { serializeLoggerEvent } from "../../serializers";
import type {
  UpdateLoggerEventParams,
  UpdateLoggerEventRawResponse,
} from "./update-logger-event.types";
import type { LoggerEvent } from "../../entities";

export async function updateLoggerEventAction({
  id,
  payload,
}: UpdateLoggerEventParams): Promise<LoggerEvent> {
  const api = await getServerApi();
  const raw = await api.patch<UpdateLoggerEventRawResponse>(
    `/iot-events/${id}`,
    payload,
  );
  return serializeLoggerEvent(raw);
}
