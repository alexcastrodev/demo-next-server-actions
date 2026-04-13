import { useMutation } from "@tanstack/react-query";
import { updateLoggerEventAction } from "./update-logger-event.action";
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
      mutationFn: updateLoggerEventAction,
      ...mutationProps,
    },
  );
}
