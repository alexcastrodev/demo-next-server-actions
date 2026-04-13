"use server";

import { getDevices } from "./get-devices.request";
import type { GetDevicesResponse } from "../../entities";

export async function getDevicesAction(): Promise<GetDevicesResponse> {
  return getDevices();
}
