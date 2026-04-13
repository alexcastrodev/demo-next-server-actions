import { useMemo } from "react";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import { useTranslation } from "core/i18n";
import type { LoggerEvent } from "core/entities";
import { DataTable } from "ui/datatable";

interface IotEventsDatatableProps {
  data: LoggerEvent[];
  isLoading: boolean;
  perPage: number;
  pageCount: number;
  onSortingChange: (sorting: SortingState) => void;
  onPageChange: (pageIndex: number) => void;
  onPageSizeChange: (size: number) => void;
  onEdit: (event: LoggerEvent) => void;
  onDelete: (event: LoggerEvent) => void;
}

export function IotEventsDatatable({
  data,
  isLoading,
  perPage,
  pageCount,
  onSortingChange,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
}: IotEventsDatatableProps) {
  const { t } = useTranslation();

  const columns = useMemo<ColumnDef<LoggerEvent, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: t("iotEvents.columns.id"),
        enableSorting: true,
        size: 70,
      },
      {
        accessorKey: "deviceId",
        header: t("iotEvents.columns.deviceId"),
        enableSorting: true,
        size: 180,
      },
      {
        accessorKey: "keyTag",
        header: t("iotEvents.columns.keyTag"),
        enableSorting: true,
        size: 120,
      },
      {
        accessorKey: "ph",
        header: t("iotEvents.columns.ph"),
        enableSorting: true,
        size: 80,
      },
      {
        accessorKey: "temperature",
        header: t("iotEvents.columns.tmp"),
        enableSorting: true,
        size: 180,
      },
      {
        accessorKey: "conductivity",
        header: t("iotEvents.columns.cnd"),
        enableSorting: true,
        size: 200,
      },
      {
        accessorKey: "createdAt",
        header: t("iotEvents.columns.createdAt"),
        enableSorting: true,
        size: 200,
        cell: ({ getValue }) => {
          const value = getValue<Date | undefined>();
          return value instanceof Date ? value.toLocaleString() : "-";
        },
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        size: 90,
        meta: { sticky: "right" },
        cell: ({ row }) => {
          const event = row.original;
          return (
            <Group gap="xs" justify="flex-end">
              <Tooltip label={t("common.edit")}>
                <ActionIcon
                  variant="subtle"
                  color="blue"
                  onClick={() => onEdit(event)}
                >
                  <IconEdit size={16} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label={t("common.delete")}>
                <ActionIcon
                  variant="subtle"
                  color="red"
                  disabled={event.id == null}
                  onClick={() => onDelete(event)}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Tooltip>
            </Group>
          );
        },
      },
    ],
    [onDelete, onEdit, t],
  );

  return (
    <DataTable
      data={data}
      columns={columns}
      isLoading={isLoading}
      defaultPageSize={perPage}
      manualSorting
      onSortingChange={onSortingChange}
      manualPagination
      pageCount={pageCount}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
    >
      <DataTable.Content>
        <DataTable.Header />
        <DataTable.Body emptyMessage={t("common.empty")} />
      </DataTable.Content>
      <DataTable.Footer rowsPerPageLabel={t("iotEvents.rowsPerPage")} />
    </DataTable>
  );
}
