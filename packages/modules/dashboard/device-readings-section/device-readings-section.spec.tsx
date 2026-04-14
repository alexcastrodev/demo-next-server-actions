import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DeviceReadingsSection } from "./device-readings-section";

vi.mock("core/i18n", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const useGetDeviceReadingsMock = vi.fn();

vi.mock("core/actions/get-device-readings/get-device-readings.hook", () => ({
  useGetDeviceReadings: (...args: unknown[]) =>
    useGetDeviceReadingsMock(...args),
}));

describe("DeviceReadingsSection", () => {
  it("shows empty message when deviceReadings.data is empty", () => {
    useGetDeviceReadingsMock.mockReturnValue({
      data: {
        deviceReadings: {
          data: [],
          total: 0,
          page: 1,
          perPage: 10,
          totalPages: 0,
        },
      },
      isLoading: false,
    });

    render(<DeviceReadingsSection deviceId="DEV001" />, {
      wrapper: ({ children }) => <MantineProvider>{children}</MantineProvider>,
    });

    expect(screen.getByText("deviceReadings.title — DEV001")).toBeDefined();
    expect(screen.getByText("common.empty")).toBeDefined();
  });

  it("renders cards for both WaterQualityReading and TelemetryReading", () => {
    useGetDeviceReadingsMock.mockReturnValue({
      data: {
        deviceReadings: {
          data: [
            {
              __typename: "WaterQualityReading",
              id: 1,
              deviceId: "DEV001",
              recordedAt: "2026-04-13T10:00:00Z",
              ph: 7.2,
              conductivity: 500,
              turbidity: 1.1,
              temperature: 24.5,
            },
            {
              __typename: "TelemetryReading",
              id: 2,
              deviceId: "DEV001",
              recordedAt: "2026-04-13T10:05:00Z",
              battery: 3.9,
              satellites: 10,
              signalStrength: -70,
            },
          ],
          total: 2,
          page: 1,
          perPage: 10,
          totalPages: 1,
        },
      },
      isLoading: false,
    });

    render(<DeviceReadingsSection deviceId="DEV001" />, {
      wrapper: ({ children }) => <MantineProvider>{children}</MantineProvider>,
    });

    expect(screen.getByText("WaterQualityReading")).toBeDefined();
    expect(screen.getByText("TelemetryReading")).toBeDefined();
    expect(screen.getByText("deviceReadings.columns.ph")).toBeDefined();
    expect(screen.getByText("deviceReadings.columns.battery")).toBeDefined();
  });
});
