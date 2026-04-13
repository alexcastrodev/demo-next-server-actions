import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getDevices } from "./get-devices.request";
import type { GetDevicesResponse } from "../../entities";

export const getDevicesKey = ["devices"];

export function useGetDevices(
  queryProps?: UseQueryOptions<GetDevicesResponse>,
) {
  return useQuery<GetDevicesResponse>({
    queryKey: getDevicesKey,
    queryFn: getDevices,
    ...queryProps,
  });
}
