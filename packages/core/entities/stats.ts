export interface StatsAverages {
  ph: number | null | undefined; // averages.ph
  temperature: number | null | undefined; // averages.tmp
  conductivity: number | null | undefined; // averages.cnd
  turbidity: number | null | undefined; // averages.ntu
  batteryVoltage: number | null | undefined; // averages.vbat
  signalStrength: number | null | undefined; // averages.rssi
}

export interface StatsEventPerDevice {
  deviceId: string | undefined; // device_id
  count: number | undefined;
}

export interface Stats {
  totalEvents: number | undefined; // total_events
  totalDevices: number | undefined; // total_devices
  eventsToday: number | undefined; // events_today
  eventsLast7d: number | undefined; // events_last_7d
  averages: StatsAverages | undefined;
  eventsPerDevice: StatsEventPerDevice[] | undefined; // events_per_device
}
