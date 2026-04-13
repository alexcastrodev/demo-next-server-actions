import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Table } from "@mantine/core";
import { DataTableHeader } from "../_partials/datatable-header";
import { makeWrapper } from "./test-utils";

describe("DataTableHeader", () => {
  it("renders column headers", () => {
    render(
      <Table>
        <DataTableHeader />
      </Table>,
      { wrapper: makeWrapper() },
    );
    expect(screen.getByText("ID")).toBeDefined();
    expect(screen.getByText("Name")).toBeDefined();
  });
});
