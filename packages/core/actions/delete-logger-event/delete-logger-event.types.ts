import type { UseMutationOptions } from "@tanstack/react-query";
import type { ActionByIdParams } from "../_shared/action.types";

export type DeleteLoggerEventParams = ActionByIdParams;

export interface DeleteLoggerEventResponse {
  id: number;
  deleted: boolean;
}

export type DeleteLoggerEventMutationProps = UseMutationOptions<
  DeleteLoggerEventResponse,
  Error,
  DeleteLoggerEventParams
>;
