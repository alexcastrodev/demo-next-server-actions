import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../datatable";

interface Row {
  id: number;
  name: string;
}

const col = createColumnHelper<Row>();
const columns = [
  col.accessor("id", { header: "ID" }),
  col.accessor("name", { header: "Name" }),
];
const data: Row[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

function renderTable(overrides: Partial<{ isLoading: boolean }> = {}) {
  return render(
    <DataTable data={data} columns={columns} {...overrides}>
      <DataTable.Content>
        <DataTable.Header />
        <DataTable.Body />
      </DataTable.Content>
      <DataTable.Footer />
    </DataTable>,
    { wrapper },
  );
}

describe("DataTable (compound)", () => {
  it("renders header and rows", () => {
    renderTable();
    expect(screen.getByText("ID")).toBeDefined();
    expect(screen.getByText("Alice")).toBeDefined();
    expect(screen.getByText("Bob")).toBeDefined();
  });

  it("shows loader when isLoading", () => {
    const { container } = renderTable({ isLoading: true });
    expect(container.querySelector(".mantine-Loader-root")).toBeDefined();
  });

  it("compound sub-components are attached", () => {
    expect(DataTable.Content).toBeDefined();
    expect(DataTable.Header).toBeDefined();
    expect(DataTable.Body).toBeDefined();
    expect(DataTable.Footer).toBeDefined();
  });
});
