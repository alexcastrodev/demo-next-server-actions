export interface StatsAverages {
  ph: number | null;
  tmp: number | null;
  cnd: number | null;
  ntu: number | null;
  vbat: number | null;
  rssi: number | null;
}

export interface StatsEventPerDevice {
  device_id: string;
  count: number;
}

export interface GetStatsResponse {
  total_events: number;
  total_devices: number;
  events_today: number;
  events_last_7d: number;
  averages: StatsAverages;
  events_per_device: StatsEventPerDevice[];
}
