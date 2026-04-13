import { useMutation } from "@tanstack/react-query";
import { deleteLoggerEvent } from "./delete-logger-event.request";
import type {
  DeleteLoggerEventMutationProps,
  DeleteLoggerEventParams,
  DeleteLoggerEventResponse,
} from "./delete-logger-event.types";

export function useDeleteLoggerEvent(
  mutationProps?: DeleteLoggerEventMutationProps,
) {
  return useMutation<DeleteLoggerEventResponse, Error, DeleteLoggerEventParams>(
    {
      mutationFn: deleteLoggerEvent,
      ...mutationProps,
    },
  );
}
