import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";

interface UseDataTableOptions<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  defaultPageSize?: number;
  manualSorting?: boolean;
  onSortingChange?: (sorting: SortingState) => void;
  manualPagination?: boolean;
  pageCount?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export function useDataTable<TData>({
  data,
  columns,
  defaultPageSize = 10,
  manualSorting = false,
  onSortingChange,
  manualPagination = false,
  pageCount,
  onPageChange,
  onPageSizeChange,
}: UseDataTableOptions<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const handleSortingChange: React.Dispatch<
    React.SetStateAction<SortingState>
  > = (updater) => {
    const next = typeof updater === "function" ? updater(sorting) : updater;
    setSorting(next);
    onSortingChange?.(next);
  };

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: handleSortingChange,
    manualSorting,
    manualPagination,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });

  const handleSetPageSize = (size: number) => {
    setPageSize(size);
    table.setPageSize(size);
    table.setPageIndex(0);
    onPageSizeChange?.(size);
  };

  const handleSetPageIndex = (index: number) => {
    table.setPageIndex(index);
    onPageChange?.(index);
  };

  return {
    table,
    sorting,
    setSorting,
    pageSize,
    setPageSize: handleSetPageSize,
    setPageIndex: handleSetPageIndex,
  };
}
