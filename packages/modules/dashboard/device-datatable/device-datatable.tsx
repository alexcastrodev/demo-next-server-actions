import { DataTable } from "ui/datatable";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "core/i18n";
import type { SensorReading } from "core/actions/get-device-readings/get-device-readings.types";

interface DeviceDatatableProps {
  data: SensorReading[];
  isLoading: boolean;
  perPage: number;
  pageCount: number;
  onPageChange: (pageIndex: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function DeviceDatatable({
  data,
  isLoading,
  perPage,
  pageCount,
  onPageChange,
  onPageSizeChange,
}: DeviceDatatableProps) {
  const { t } = useTranslation();

  const columns = useMemo<ColumnDef<SensorReading, unknown>[]>(
    () => [
      {
        id: "type",
        header: t("deviceReadings.columns.type"),
        size: 180,
        enableSorting: false,
        cell: ({ row }) => row.original.__typename,
      },
      {
        accessorKey: "recordedAt",
        header: t("deviceReadings.columns.recordedAt"),
        size: 180,
        enableSorting: true,
        cell: ({ getValue }) => new Date(getValue<string>()).toLocaleString(),
      },
      {
        id: "ph",
        header: t("deviceReadings.columns.ph"),
        size: 80,
        enableSorting: false,
        cell: ({ row }) =>
          row.original.__typename === "WaterQualityReading"
            ? (row.original.ph ?? "—")
            : "—",
      },
      {
        id: "conductivity",
        header: t("deviceReadings.columns.conductivity"),
        size: 130,
        enableSorting: false,
        cell: ({ row }) =>
          row.original.__typename === "WaterQualityReading"
            ? (row.original.conductivity ?? "—")
            : "—",
      },
      {
        id: "turbidity",
        header: t("deviceReadings.columns.turbidity"),
        size: 110,
        enableSorting: false,
        cell: ({ row }) =>
          row.original.__typename === "WaterQualityReading"
            ? (row.original.turbidity ?? "—")
            : "—",
      },
      {
        id: "temperature",
        header: t("deviceReadings.columns.temperature"),
        size: 120,
        enableSorting: false,
        cell: ({ row }) =>
          row.original.__typename === "WaterQualityReading"
            ? (row.original.temperature ?? "—")
            : "—",
      },
      {
        id: "battery",
        header: t("deviceReadings.columns.battery"),
        size: 90,
        enableSorting: false,
        cell: ({ row }) =>
          row.original.__typename === "TelemetryReading"
            ? (row.original.battery ?? "—")
            : "—",
      },
      {
        id: "satellites",
        header: t("deviceReadings.columns.satellites"),
        size: 100,
        enableSorting: false,
        cell: ({ row }) =>
          row.original.__typename === "TelemetryReading"
            ? (row.original.satellites ?? "—")
            : "—",
      },
      {
        id: "signalStrength",
        header: t("deviceReadings.columns.signalStrength"),
        size: 130,
        enableSorting: false,
        cell: ({ row }) =>
          row.original.__typename === "TelemetryReading"
            ? (row.original.signalStrength ?? "—")
            : "—",
      },
    ],
    [t],
  );

  return (
    <DataTable
      data={data}
      columns={columns}
      isLoading={isLoading}
      defaultPageSize={perPage}
      manualPagination
      pageCount={pageCount}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    >
      <DataTable.Content>
        <DataTable.Header />
        <DataTable.Body emptyMessage={t("common.empty")} />
      </DataTable.Content>
      <DataTable.Footer />
    </DataTable>
  );
}
