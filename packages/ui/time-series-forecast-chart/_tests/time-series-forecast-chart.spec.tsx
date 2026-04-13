import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TimeSeriesForecastChart } from "../time-series-forecast-chart";

vi.mock("highcharts-react-official", () => ({
  default: () => <div data-testid="highcharts-mock" />,
}));

describe("TimeSeriesForecastChart", () => {
  it("renders chart container", () => {
    render(
      <TimeSeriesForecastChart
        data={{
          title: "Device Trend",
          subtitle: "Area + Forecast",
          leftAxisLabel: "Left",
          rightAxisLabel: "Right",
          series: [
            {
              name: "Series A",
              axis: "left",
              tone: "mint",
              points: [
                { x: Date.now() - 60_000, y: 1 },
                { x: Date.now(), y: 2 },
              ],
            },
          ],
        }}
      />,
      {
        wrapper: ({ children }) => (
          <MantineProvider>{children}</MantineProvider>
        ),
      },
    );

    expect(screen.getByTestId("highcharts-mock")).toBeDefined();
  });
});
