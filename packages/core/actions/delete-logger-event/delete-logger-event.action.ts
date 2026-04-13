"use server";

import { getServerApi } from "../../api/server";
import type {
  DeleteLoggerEventParams,
  DeleteLoggerEventResponse,
} from "./delete-logger-event.types";

export async function deleteLoggerEventAction({
  id,
}: DeleteLoggerEventParams): Promise<DeleteLoggerEventResponse> {
  const api = await getServerApi();
  return api.delete<DeleteLoggerEventResponse>(`/iot-events/${id}`);
}
