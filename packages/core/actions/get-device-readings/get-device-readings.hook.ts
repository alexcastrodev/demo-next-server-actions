import {
  keepPreviousData,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { getDeviceReadings } from "./get-device-readings.request";
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
  queryProps?: UseQueryOptions<GetDeviceReadingsResponse>,
) {
  return useQuery<GetDeviceReadingsResponse>({
    queryKey: getDeviceReadingsKey(
      params.deviceId,
      params.page,
      params.perPage,
    ),
    queryFn: () => getDeviceReadings(params),
    enabled: Boolean(params.deviceId),
    placeholderData: keepPreviousData,
    ...queryProps,
  });
}
