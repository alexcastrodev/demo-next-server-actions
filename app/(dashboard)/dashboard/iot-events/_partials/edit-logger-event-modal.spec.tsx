import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { LoggerEvent } from "core/entities";
import { EditLoggerEventModal } from "./edit-logger-event-modal";

vi.mock("core/i18n", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mutateMock = vi.fn();

vi.mock("core/actions/update-logger-event/update-logger-event.hook", () => ({
  useUpdateLoggerEvent: () => ({
    mutate: mutateMock,
    isPending: false,
  }),
}));

vi.mock("@mantine/notifications", () => ({
  notifications: {
    show: vi.fn(),
  },
}));

function renderWithProviders(node: React.ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(node, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <MantineProvider>{children}</MantineProvider>
      </QueryClientProvider>
    ),
  });
}

const eventFixture: LoggerEvent = {
  id: 901,
  keyTag: "TAG0901",
  deviceId: "DEV003",
  efficiency: 433.2,
  ph: 7.14,
  turbidityMtu: 18.23,
  turbidity: 9.42,
  conductivity: 501.4,
  temperature: 24.1,
  turbidityNtu: 1.532,
  batteryVoltage: 3.79,
  satellites: 12,
  signalStrength: -69,
  sensorData: "abc",
  createdAt: new Date("2026-04-13T10:00:00Z"),
  updatedAt: new Date("2026-04-13T10:00:00Z"),
};

describe("EditLoggerEventModal", () => {
  it("maps canonical event fields into raw update payload on submit", async () => {
    const user = userEvent.setup();
    mutateMock.mockClear();

    renderWithProviders(
      <EditLoggerEventModal event={eventFixture} onClose={vi.fn()} />,
    );

    await user.click(screen.getByRole("button", { name: "common.save" }));

    expect(mutateMock).toHaveBeenCalledTimes(1);
    expect(mutateMock).toHaveBeenCalledWith({
      id: 901,
      payload: {
        key_tag: "TAG0901",
        device_id: "DEV003",
        key_ncy: 433.2,
        key_ph: 7.14,
        key_mtu: 18.23,
        key_tur: 9.42,
        key_cnd: 501.4,
        key_tmp: 24.1,
        key_ntu: 1.532,
        key_vbat: 3.79,
        key_nsat: 12,
        key_rssi: -69,
        sensor_data: "abc",
      },
    });
  });

  it("does not submit when key fields are missing", async () => {
    const user = userEvent.setup();
    mutateMock.mockClear();

    renderWithProviders(
      <EditLoggerEventModal
        event={{ ...eventFixture, id: undefined, keyTag: undefined }}
        onClose={vi.fn()}
      />,
    );

    const dialogs = screen.getAllByRole("dialog");
    const lastDialog = dialogs[dialogs.length - 1];
    const submitButton = within(lastDialog).getByRole("button", {
      name: "common.save",
    });
    await user.click(submitButton);

    expect(mutateMock).not.toHaveBeenCalled();
  });
});
