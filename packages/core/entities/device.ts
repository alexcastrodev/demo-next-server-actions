export interface Device {
  deviceId: string | undefined;
  eventCount: number | undefined;
  lastSeenAt: Date | undefined; // ISO string → Date
}

export interface GetDevicesResponse {
  devices: Device[];
}
