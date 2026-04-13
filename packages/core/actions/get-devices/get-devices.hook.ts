import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getDevicesAction } from "./get-devices.action";
import type { GetDevicesResponse } from "../../entities";

export const getDevicesKey = ["devices"];

export function useGetDevices(
  queryProps?: UseQueryOptions<GetDevicesResponse>,
) {
  return useQuery<GetDevicesResponse>({
    queryKey: getDevicesKey,
    queryFn: getDevicesAction,
    ...queryProps,
  });
}
