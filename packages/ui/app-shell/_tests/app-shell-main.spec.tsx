import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AppShellMain } from "../_partials/app-shell-main";

describe("AppShellMain", () => {
  it("renders content inside a main landmark", () => {
    render(<AppShellMain>Main content</AppShellMain>, {
      wrapper: ({ children }) => <MantineProvider>{children}</MantineProvider>,
    });

    expect(screen.getByRole("main")).toBeDefined();
    expect(screen.getByText("Main content")).toBeDefined();
  });
});
