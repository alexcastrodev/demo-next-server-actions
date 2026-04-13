import type { Device } from "../entities";
import type { Device as RawDevice } from "../actions/get-devices/get-devices.types";
import { createBaseSerializer } from "./base-serializer";
import { z } from "zod";

const requiredStringSchema = z.string().trim().min(1);
const integerSchema = z.number();
const dateSchema = z
  .string()
  .trim()
  .min(1)
  .transform((value) => new Date(value))
  .refine((value) => !Number.isNaN(value.getTime()));

export function serializeDevice(raw: RawDevice): Device {
  const { fromSchema } = createBaseSerializer(raw);

  return {
    deviceId: fromSchema("deviceId", requiredStringSchema),
    eventCount: fromSchema("eventCount", integerSchema),
    lastSeenAt: fromSchema("lastSeenAt", dateSchema),
  };
}
