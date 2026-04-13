"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Title, Stack } from "@mantine/core";
import type { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "core/i18n";
import { useGetDevices } from "core/actions/get-devices/get-devices.hook";
import type { Device } from "core/entities";
import { DataTable } from "ui/datatable";

export default function DevicesPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, isFetching } = useGetDevices();

  const columns = useMemo<ColumnDef<Device, unknown>[]>(
    () => [
      {
        accessorKey: "deviceId",
        header: t("devices.columns.deviceId"),
        enableSorting: true,
        size: 180,
      },
      {
        accessorKey: "eventCount",
        header: t("devices.columns.eventCount"),
        enableSorting: true,
        size: 140,
      },
      {
        accessorKey: "lastSeenAt",
        header: t("devices.columns.lastSeenAt"),
        enableSorting: true,
        size: 200,
        cell: ({ getValue }) => {
          const value = getValue<Date | undefined>();
          return value ? value.toLocaleString() : "-";
        },
      },
    ],
    [t],
  );

  return (
    <>
      <Title order={2} mb="lg">
        {t("devices.title")}
      </Title>

      <Stack>
        <DataTable
          data={data?.devices ?? []}
          columns={columns}
          isLoading={isFetching}
          onRowClick={(row) =>
            router.push(`/dashboard/devices/${row.original.deviceId}`)
          }
        >
          <DataTable.Content>
            <DataTable.Header />
            <DataTable.Body emptyMessage={t("common.empty")} />
          </DataTable.Content>
          <DataTable.Footer />
        </DataTable>
      </Stack>
    </>
  );
}
