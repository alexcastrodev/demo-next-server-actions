import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { createColumnHelper } from "@tanstack/react-table";
import { useDataTable } from "../datatable.hook";

interface Row {
  id: number;
  name: string;
}

const col = createColumnHelper<Row>();
const columns = [
  col.accessor("id", { header: "ID" }),
  col.accessor("name", { header: "Name" }),
];
const data: Row[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
}));

describe("useDataTable", () => {
  it("initializes with default page size", () => {
    const { result } = renderHook(() => useDataTable({ data, columns }));
    expect(result.current.pageSize).toBe(10);
  });

  it("respects custom defaultPageSize", () => {
    const { result } = renderHook(() =>
      useDataTable({ data, columns, defaultPageSize: 25 }),
    );
    expect(result.current.pageSize).toBe(25);
  });

  it("setPageSize updates pageSize and resets to page 0", () => {
    const { result } = renderHook(() => useDataTable({ data, columns }));

    act(() => result.current.table.setPageIndex(2));
    act(() => result.current.setPageSize(25));

    expect(result.current.pageSize).toBe(25);
    expect(result.current.table.getState().pagination.pageIndex).toBe(0);
  });

  it("table reflects correct row count", () => {
    const { result } = renderHook(() => useDataTable({ data, columns }));
    expect(result.current.table.getRowCount()).toBe(30);
  });

  it("sorting state starts empty", () => {
    const { result } = renderHook(() => useDataTable({ data, columns }));
    expect(result.current.sorting).toEqual([]);
  });
});
