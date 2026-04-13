import {
  keepPreviousData,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { getDeviceReadingsAction } from "./get-device-readings.action";
import type {
  GetDeviceReadingsParams,
  GetDeviceReadingsResponse,
} from "./get-device-readings.types";

export const getDeviceReadingsKey = (
  deviceId: string,
  page?: number,
  perPage?: number,
) => ["device-readings", deviceId, page ?? null, perPage ?? null];

export function useGetDeviceReadings(
  params: GetDeviceReadingsParams,
  queryProps?: Omit<UseQueryOptions<GetDeviceReadingsResponse>, "queryKey">,
) {
  return useQuery<GetDeviceReadingsResponse>({
    queryKey: getDeviceReadingsKey(
      params.deviceId,
      params.page,
      params.perPage,
    ),
    queryFn: () => getDeviceReadingsAction(params),
    enabled: Boolean(params.deviceId),
    placeholderData: keepPreviousData,
    ...queryProps,
  });
}
