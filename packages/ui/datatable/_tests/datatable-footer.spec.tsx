import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DataTableFooter } from "../_partials/datatable-footer";
import { makeWrapper } from "./test-utils";

describe("DataTableFooter", () => {
  it("renders default rows per page label", () => {
    render(<DataTableFooter />, { wrapper: makeWrapper() });
    expect(screen.getByText("Linhas por página:")).toBeDefined();
  });

  it("renders custom rows per page label", () => {
    render(<DataTableFooter rowsPerPageLabel="Rows per page:" />, {
      wrapper: makeWrapper(),
    });
    expect(screen.getByText("Rows per page:")).toBeDefined();
  });

  it("shows total row count", () => {
    render(<DataTableFooter />, { wrapper: makeWrapper() });
    expect(screen.getAllByText("5 resultados").length).toBeGreaterThan(0);
  });
});
