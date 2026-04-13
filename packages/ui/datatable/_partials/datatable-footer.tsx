import { Group, Pagination, Select, Text } from "@mantine/core";

import { useDataTableContext } from "../datatable.provider";
import { PAGE_SIZE_OPTIONS } from "../datatable.constants";
import type { DataTableFooterProps } from "../datatable.types";

export function DataTableFooter({
  rowsPerPageLabel = "Linhas por página:",
}: DataTableFooterProps) {
  const { table, pageSize, setPageSize, setPageIndex } = useDataTableContext();

  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;
  const rowCount = table.getRowCount();

  return (
    <Group justify="space-between" mt="md">
      <Group gap="xs">
        <Text size="sm" c="dimmed">
          {rowsPerPageLabel}
        </Text>
        <Select
          size="xs"
          w={70}
          data={PAGE_SIZE_OPTIONS}
          value={String(pageSize)}
          onChange={(v) => v && setPageSize(Number(v))}
          allowDeselect={false}
        />
      </Group>

      <Pagination
        total={pageCount}
        value={currentPage}
        onChange={(page) => setPageIndex(page - 1)}
        size="sm"
      />

      <Text size="sm" c="dimmed">
        {rowCount} resultado{rowCount !== 1 ? "s" : ""}
      </Text>
    </Group>
  );
}
