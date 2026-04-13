import type { Result } from "../../common/result";
import type {
  DeviceFilterParams,
  PaginationParams,
  PerPageParams,
  SortParams,
} from "../_shared/action.types";
import type { LoggerEvent as RawLoggerEvent } from "../../types/api";
import type { LoggerEvent } from "../../entities";

export interface GetLoggerEventsParams
  extends PaginationParams, PerPageParams, DeviceFilterParams, SortParams {}

export type GetLoggerEventsRawResponse = Result<RawLoggerEvent>;

export type GetLoggerEventsResponse = Result<LoggerEvent>;
