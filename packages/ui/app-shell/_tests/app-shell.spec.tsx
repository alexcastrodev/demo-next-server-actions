import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppShell } from "../app-shell";

describe("AppShell", () => {
  it("renders compound sections with mobile layout by default", () => {
    render(
      <AppShell>
        <AppShell.Header>Header</AppShell.Header>
        <AppShell.Navbar>Navbar</AppShell.Navbar>
        <AppShell.Main>Main</AppShell.Main>
      </AppShell>,
      {
        wrapper: ({ children }) => (
          <MantineProvider>{children}</MantineProvider>
        ),
      },
    );

    expect(
      screen.getByTestId("app-shell-root").getAttribute("data-layout"),
    ).toBe("mobile");
    expect(screen.getByText("Header")).toBeDefined();
    expect(screen.getByText("Navbar")).toBeDefined();
    expect(screen.getByText("Main")).toBeDefined();
  });

  it("exposes compound parts", () => {
    expect(AppShell.Header).toBeDefined();
    expect(AppShell.Navbar).toBeDefined();
    expect(AppShell.Main).toBeDefined();
  });
});
