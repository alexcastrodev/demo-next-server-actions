import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppShellHeader } from "../_partials/app-shell-header";

describe("AppShellHeader", () => {
  it("renders content inside a header landmark", () => {
    render(<AppShellHeader>Header content</AppShellHeader>, {
      wrapper: ({ children }) => <MantineProvider>{children}</MantineProvider>,
    });

    expect(screen.getByRole("banner")).toBeDefined();
    expect(screen.getByText("Header content")).toBeDefined();
  });
});
