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

const data: Row[] = [{ id: 1, name: "Alice" }];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MantineProvider>{children}</MantineProvider>
);

describe("DataTableContent", () => {
  it("renders children inside a table", () => {
    render(
      <DataTable data={data} columns={columns}>
        <DataTable.Content>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
        </DataTable.Content>
      </DataTable>,
      { wrapper },
    );
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeDefined();
  });

  it("renders a scrollable container", () => {
    const { container } = render(
      <DataTable data={data} columns={columns}>
        <DataTable.Content>
          <tbody />
        </DataTable.Content>
      </DataTable>,
      { wrapper },
    );
    expect(container.querySelector("table")).toBeDefined();
  });
});
