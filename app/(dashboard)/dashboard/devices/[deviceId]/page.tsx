"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ActionIcon, Group, Title, Tooltip } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useTranslation } from "core/i18n";
import { useGetDeviceReadings } from "core/actions/get-device-readings/get-device-readings.hook";
import { DeviceDatatable } from "modules/dashboard/device-datatable";
import { DeviceReadingsForecast } from "modules/dashboard/device/device-readings-forecast";

export default function DeviceDetailPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { deviceId } = useParams<{ deviceId: string }>();
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const { data, isFetching } = useGetDeviceReadings({
    deviceId,
    page: page + 1,
    perPage,
  });

  return (
    <>
      <Group align="center" mb="lg" gap="xs">
        <Tooltip label={t("common.back")}>
          <ActionIcon variant="subtle" onClick={() => router.back()}>
            <IconArrowLeft size={18} />
          </ActionIcon>
        </Tooltip>
        <Title order={2}>{deviceId}</Title>
      </Group>

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
