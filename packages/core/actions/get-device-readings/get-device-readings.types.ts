export type {
  DeviceReadingsPage,
  GetDeviceReadingsResponse,
  SensorReading,
  TelemetryReading,
  WaterQualityReading,
} from "../../types/api";
import type {
  DeviceByIdParams,
  GraphqlPaginationParams,
} from "../_shared/action.types";

export interface GetDeviceReadingsParams
  extends DeviceByIdParams, GraphqlPaginationParams {}
