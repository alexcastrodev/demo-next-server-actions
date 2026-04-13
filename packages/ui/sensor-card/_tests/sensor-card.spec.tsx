import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SensorCard } from "../sensor-card";

describe("SensorCard", () => {
  it("renders the value with unit", () => {
    render(
      <SensorCard
        icon={<span>sensor</span>}
        label="Temperature"
        unit="°C"
        value={22}
      />,
      {
        wrapper: ({ children }) => (
          <MantineProvider>{children}</MantineProvider>
        ),
      },
    );

    expect(screen.getByText("Temperature")).toBeDefined();
    expect(screen.getByText("22 °C")).toBeDefined();
    expect(screen.getByText("sensor")).toBeDefined();
  });

  it("renders an em dash when value is missing", () => {
    render(
      <SensorCard
        icon={<span>sensor</span>}
        label="Temperature"
        unit="°C"
        value={null}
      />,
      {
        wrapper: ({ children }) => (
          <MantineProvider>{children}</MantineProvider>
        ),
      },
    );

    expect(screen.getByText("—")).toBeDefined();
  });
});
