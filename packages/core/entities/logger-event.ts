import { z } from "zod";

const requiredStringSchema = z.string().trim().min(1);
const integerSchema = z.number();
const nullableSensorSchema = z.number().nullable();
const nullableStringSchema = z.string().trim().min(1).nullable();

export const loggerEventSchema = z.object({
  id: integerSchema.optional(),
  keyTag: requiredStringSchema.optional(),
  deviceId: requiredStringSchema.optional(),
  efficiency: nullableSensorSchema.optional(),
  ph: nullableSensorSchema.optional(),
  turbidityMtu: nullableSensorSchema.optional(),
  turbidity: nullableSensorSchema.optional(),
  conductivity: nullableSensorSchema.optional(),
  temperature: nullableSensorSchema.optional(),
  turbidityNtu: nullableSensorSchema.optional(),
  batteryVoltage: nullableSensorSchema.optional(),
  satellites: nullableSensorSchema.optional(),
  signalStrength: nullableSensorSchema.optional(),
  sensorData: nullableStringSchema.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type LoggerEvent = z.infer<typeof loggerEventSchema>;
