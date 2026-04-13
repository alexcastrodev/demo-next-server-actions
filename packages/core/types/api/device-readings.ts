export interface WaterQualityReading {
  __typename: "WaterQualityReading";
  id: number;
  deviceId: string;
  recordedAt: string;
  ph: number | null;
  conductivity: number | null;
  turbidity: number | null;
  temperature: number | null;
}

export interface TelemetryReading {
  __typename: "TelemetryReading";
  id: number;
  deviceId: string;
  recordedAt: string;
  battery: number | null;
  satellites: number | null;
  signalStrength: number | null;
}

export type SensorReading = WaterQualityReading | TelemetryReading;

export interface DeviceReadingsPage {
  data: SensorReading[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface GetDeviceReadingsResponse {
  deviceReadings: DeviceReadingsPage;
}
