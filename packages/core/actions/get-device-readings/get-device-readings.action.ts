"use server";

import { getDeviceReadings } from "./get-device-readings.request";
import type {
  GetDeviceReadingsParams,
  GetDeviceReadingsResponse,
} from "./get-device-readings.types";

export async function getDeviceReadingsAction(
  params: GetDeviceReadingsParams,
): Promise<GetDeviceReadingsResponse> {
  return getDeviceReadings(params);
}
