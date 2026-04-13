import { useMutation } from "@tanstack/react-query";
import { updateLoggerEvent } from "./update-logger-event.request";
import type {
  UpdateLoggerEventMutationProps,
  UpdateLoggerEventParams,
  UpdateLoggerEventResponse,
} from "./update-logger-event.types";

export function useUpdateLoggerEvent(
  mutationProps?: UpdateLoggerEventMutationProps,
) {
  return useMutation<UpdateLoggerEventResponse, Error, UpdateLoggerEventParams>(
    {
      mutationFn: updateLoggerEvent,
      ...mutationProps,
    },
  );
}
