export interface Device {
  deviceId: string;
  eventCount: number;
  lastSeenAt: string;
}

export interface GetDevicesResponse {
  devices: Device[];
}
