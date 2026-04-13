import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { DataTableContext, useDataTableContext } from "../datatable.provider";
import type { DataTableContextValue } from "../datatable.types";

const mockContext = {
  table: {} as DataTableContextValue["table"],
  columns: [],
  sorting: [],
  setSorting: () => {},
  pageSize: 10,
  setPageSize: () => {},
  isLoading: false,
} satisfies DataTableContextValue;

describe("useDataTableContext", () => {
  it("throws when used outside DataTableContext", () => {
    expect(() => renderHook(() => useDataTableContext())).toThrow(
      "DataTable compound components must be used inside <DataTable>",
    );
  });

  it("returns context value when inside provider", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DataTableContext.Provider value={mockContext}>
        {children}
      </DataTableContext.Provider>
    );

    const { result } = renderHook(() => useDataTableContext(), { wrapper });

    expect(result.current.pageSize).toBe(10);
    expect(result.current.isLoading).toBe(false);
  });
});
