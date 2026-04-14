import { useQuery } from "@tanstack/react-query";
import { getDevicesAction } from "./get-devices.action";
import type { GetDevicesResponse } from "../../entities";
import type { CustomUseQueryOptions } from "../../types/query";

export const getDevicesKey = ["devices"];

export function useGetDevices(
  queryProps?: CustomUseQueryOptions<GetDevicesResponse>,
) {
  return useQuery<GetDevicesResponse>({
    queryKey: getDevicesKey,
    queryFn: getDevicesAction,
    ...queryProps,
  });
}
