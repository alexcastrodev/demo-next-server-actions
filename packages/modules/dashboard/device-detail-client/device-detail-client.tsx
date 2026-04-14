"use client";

import { useState } from "react";
import { useGetDeviceReadings } from "core/actions/get-device-readings/get-device-readings.hook";
import type { GetDeviceReadingsResponse } from "core/actions/get-device-readings/get-device-readings.types";
import { DeviceDatatable } from "modules/dashboard/device-datatable";
import { DeviceReadingsForecast } from "modules/dashboard/device/device-readings-forecast";

interface DeviceDetailClientProps {
  deviceId: string;
  initialData: GetDeviceReadingsResponse;
}

export function DeviceDetailClient({
  deviceId,
  initialData,
}: DeviceDetailClientProps) {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const { data, isFetching } = useGetDeviceReadings(
    { deviceId, page: page + 1, perPage },
    {
      initialData,
    },
  );

  return (
    <>
      <DeviceReadingsForecast
        data={data?.deviceReadings.data ?? []}
        deviceId={deviceId}
      />

      <DeviceDatatable
        data={data?.deviceReadings.data ?? []}
        isLoading={isFetching}
        pageCount={data?.deviceReadings.totalPages ?? 0}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPerPage(size);
          setPage(0);
        }}
        perPage={perPage}
      />
    </>
  );
}
