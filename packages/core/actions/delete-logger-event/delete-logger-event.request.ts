import { api } from "../../api";
import type {
  DeleteLoggerEventParams,
  DeleteLoggerEventResponse,
} from "./delete-logger-event.types";

export async function deleteLoggerEvent({
  id,
}: DeleteLoggerEventParams): Promise<DeleteLoggerEventResponse> {
  return api.delete<DeleteLoggerEventResponse>(`/iot-events/${id}`);
}
