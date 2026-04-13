import type { Stats, StatsAverages, StatsEventPerDevice } from "../entities";
import type {
  GetStatsResponse,
  StatsAverages as RawStatsAverages,
  StatsEventPerDevice as RawStatsEventPerDevice,
} from "../actions/get-stats/get-stats.types";
import { createBaseSerializer } from "./base-serializer";
import { z } from "zod";

const integerSchema = z.number();
const requiredStringSchema = z.string().trim().min(1);
const sensorSchema = z.number().nullable();

function serializeAverages(raw: RawStatsAverages): StatsAverages {
  const { fromSchema } = createBaseSerializer(raw);

  return {
    ph: fromSchema("ph", sensorSchema),
    temperature: fromSchema("tmp", sensorSchema),
    conductivity: fromSchema("cnd", sensorSchema),
    turbidity: fromSchema("ntu", sensorSchema),
    batteryVoltage: fromSchema("vbat", sensorSchema),
    signalStrength: fromSchema("rssi", sensorSchema),
  };
}

function serializeEventPerDevice(
  raw: RawStatsEventPerDevice,
): StatsEventPerDevice {
  const { fromSchema } = createBaseSerializer(raw);

  return {
    deviceId: fromSchema("device_id", requiredStringSchema),
    count: fromSchema("count", integerSchema),
  };
}

export function serializeStats(raw: GetStatsResponse): Stats {
  const { fromSchema } = createBaseSerializer(raw);

  return {
    totalEvents: fromSchema("total_events", integerSchema),
    totalDevices: fromSchema("total_devices", integerSchema),
    eventsToday: fromSchema("events_today", integerSchema),
    eventsLast7d: fromSchema("events_last_7d", integerSchema),
    averages:
      raw.averages != null ? serializeAverages(raw.averages) : undefined,
    eventsPerDevice: Array.isArray(raw.events_per_device)
      ? raw.events_per_device.map(serializeEventPerDevice)
      : undefined,
  };
}
