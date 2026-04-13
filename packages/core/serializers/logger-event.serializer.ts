import type { LoggerEvent } from "../entities";
import type { LoggerEvent as RawLoggerEvent } from "../types/api";
import { createBaseSerializer } from "./base-serializer";
import { z } from "zod";

const requiredStringSchema = z.string().trim().min(1);
const integerSchema = z.number();
const nullableSensorSchema = z.number().nullable();
const nullableStringSchema = z.string().trim().min(1).nullable();
const dateSchema = z
  .string()
  .trim()
  .min(1)
  .transform((value) => new Date(value))
  .refine((value) => !Number.isNaN(value.getTime()));

const sensorSchema = nullableSensorSchema
  .optional()
  .transform((value) => value ?? null);
const sensorDataSchema = nullableStringSchema.optional();

export function serializeLoggerEvent(raw: RawLoggerEvent): LoggerEvent {
  const { fromSchema } = createBaseSerializer(raw);

  return {
    id: fromSchema("id", integerSchema),
    keyTag: fromSchema("key_tag", requiredStringSchema),
    deviceId: fromSchema("device_id", requiredStringSchema),
    efficiency: fromSchema("key_ncy", sensorSchema),
    ph: fromSchema("key_ph", sensorSchema),
    turbidityMtu: fromSchema("key_mtu", sensorSchema),
    turbidity: fromSchema("key_tur", sensorSchema),
    conductivity: fromSchema("key_cnd", sensorSchema),
    temperature: fromSchema("key_tmp", sensorSchema),
    turbidityNtu: fromSchema("key_ntu", sensorSchema),
    batteryVoltage: fromSchema("key_vbat", sensorSchema),
    satellites: fromSchema("key_nsat", sensorSchema),
    signalStrength: fromSchema("key_rssi", sensorSchema),
    sensorData: fromSchema("sensor_data", sensorDataSchema),
    createdAt: fromSchema("created_at", dateSchema),
    updatedAt: fromSchema("updated_at", dateSchema),
  };
}
