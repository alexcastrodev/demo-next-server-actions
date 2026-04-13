import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Table } from "@mantine/core";
import { DataTableBody } from "../_partials/datatable-body";
import { makeWrapper } from "./test-utils";

describe("DataTableBody", () => {
  it("renders rows from data", () => {
    render(
      <Table>
        <DataTableBody />
      </Table>,
      { wrapper: makeWrapper() },
    );
    expect(screen.getByText("Item 1")).toBeDefined();
    expect(screen.getByText("Item 5")).toBeDefined();
  });

  it("shows empty message when data is empty", () => {
    render(
      <Table>
        <DataTableBody emptyMessage="Sem dados." />
      </Table>,
      { wrapper: makeWrapper({ data: [] }) },
    );
    expect(screen.getByText("Sem dados.")).toBeDefined();
  });

  it("shows loader when isLoading is true", () => {
    const { container } = render(
      <Table>
        <DataTableBody />
      </Table>,
      { wrapper: makeWrapper({ isLoading: true }) },
    );
    expect(container.querySelector(".mantine-Loader-root")).toBeDefined();
  });
});
