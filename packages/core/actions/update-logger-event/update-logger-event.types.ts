import type { UseMutationOptions } from "@tanstack/react-query";
import type { LoggerEvent as RawLoggerEvent } from "../../types/api";
import type { LoggerEvent } from "../../entities";
import type { ActionByIdParams } from "../_shared/action.types";

export type UpdateLoggerEventPayload = Omit<
  RawLoggerEvent,
  "id" | "created_at" | "updated_at"
>;

export interface UpdateLoggerEventParams extends ActionByIdParams {
  payload: UpdateLoggerEventPayload;
}

export type UpdateLoggerEventRawResponse = RawLoggerEvent;

export type UpdateLoggerEventResponse = LoggerEvent;

export type UpdateLoggerEventMutationProps = UseMutationOptions<
  UpdateLoggerEventResponse,
  Error,
  UpdateLoggerEventParams
>;
