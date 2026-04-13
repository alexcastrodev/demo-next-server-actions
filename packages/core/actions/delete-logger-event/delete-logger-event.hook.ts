import { useMutation } from "@tanstack/react-query";
import { deleteLoggerEventAction } from "./delete-logger-event.action";
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
      mutationFn: deleteLoggerEventAction,
      ...mutationProps,
    },
  );
}
