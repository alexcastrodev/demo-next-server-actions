import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatCard } from "../stat-card";

describe("StatCard", () => {
  it("renders label, icon, and formatted value", () => {
    render(
      <StatCard
        color="teal"
        icon={<span>icon</span>}
        label="Total events"
        value={1234}
      />,
      {
        wrapper: ({ children }) => (
          <MantineProvider>{children}</MantineProvider>
        ),
      },
    );

    expect(screen.getByText("Total events")).toBeDefined();
    expect(screen.getByText("1.234")).toBeDefined();
    expect(screen.getByText("icon")).toBeDefined();
  });
});
