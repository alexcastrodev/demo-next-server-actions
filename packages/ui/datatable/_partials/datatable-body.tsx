import { flexRender } from "@tanstack/react-table";
import { Center, Table, Text } from "@mantine/core";

import { useDataTableContext } from "../datatable.provider";
import type { DataTableBodyProps } from "../datatable.types";

export function DataTableBody({
  emptyMessage = "Nenhum resultado encontrado.",
}: DataTableBodyProps) {
  const { table, columns, onRowClick } = useDataTableContext();
  const rows = table.getRowModel().rows;

  return (
    <Table.Tbody>
      {rows.length === 0 ? (
        <Table.Tr>
          <Table.Td colSpan={columns.length}>
            <Center py="xl">
              <Text c="dimmed" size="sm">
                {emptyMessage}
              </Text>
            </Center>
          </Table.Td>
        </Table.Tr>
      ) : (
        rows.map((row) => (
          <Table.Tr
            key={row.id}
            onClick={() => onRowClick?.(row)}
            style={{ cursor: onRowClick ? "pointer" : undefined }}
          >
            {row.getVisibleCells().map((cell) => {
              const { sticky } = cell.column.columnDef.meta ?? {};
              const size = cell.column.columnDef.size;

              return (
                <Table.Td
                  key={cell.id}
                  style={{
                    width: size,
                    minWidth: size,
                    ...(sticky && {
                      position: "sticky",
                      right: sticky === "right" ? 0 : undefined,
                      left: sticky === "left" ? 0 : undefined,
                      zIndex: 1,
                      backgroundColor: "var(--mantine-color-body)",
                    }),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Td>
              );
            })}
          </Table.Tr>
        ))
      )}
    </Table.Tbody>
  );
}
