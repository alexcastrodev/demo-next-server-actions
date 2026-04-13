import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppShellNavbar } from "../_partials/app-shell-navbar";

describe("AppShellNavbar", () => {
  it("renders content inside a complementary landmark", () => {
    render(<AppShellNavbar>Navigation</AppShellNavbar>, {
      wrapper: ({ children }) => <MantineProvider>{children}</MantineProvider>,
    });

    expect(screen.getByRole("complementary")).toBeDefined();
    expect(screen.getByText("Navigation")).toBeDefined();
  });
});
