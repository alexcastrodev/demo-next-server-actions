import { MantineProvider } from "@mantine/core";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTableContext } from "../datatable.provider";
import type { DataTableContextValue } from "../datatable.types";

interface Row {
  id: number;
  name: string;
}

export const col = createColumnHelper<Row>();
export const columns = [
  col.accessor("id", { header: "ID" }),
  col.accessor("name", { header: "Name" }),
];
export const data: Row[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
}));

export function makeWrapper(
  overrides: Partial<{ isLoading: boolean; data: Row[] }> = {},
) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    const table = useReactTable({
      data: overrides.data ?? data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });

    return (
      <MantineProvider>
        <DataTableContext.Provider
          value={
            {
              table,
              columns,
              sorting: [],
              setSorting: () => {},
              pageSize: 10,
              setPageSize: () => {},
              setPageIndex: () => {},
              isLoading: overrides.isLoading ?? false,
            } as unknown as DataTableContextValue
          }
        >
          {children}
        </DataTableContext.Provider>
      </MantineProvider>
    );
  };
}
