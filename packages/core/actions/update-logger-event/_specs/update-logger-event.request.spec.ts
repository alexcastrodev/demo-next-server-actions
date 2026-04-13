import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "../../../api";
import { updateLoggerEvent } from "../update-logger-event.request";
import type {
  UpdateLoggerEventParams,
  UpdateLoggerEventRawResponse,
} from "../update-logger-event.types";
import paramsFixture from "./fixtures/update-logger-event.params.json";
import responseFixture from "./fixtures/update-logger-event.response.json";

vi.mock("../../../api", () => ({
  api: {
    patch: vi.fn(),
  },
}));

describe("updateLoggerEvent request", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("serializes updated logger event from backend response", async () => {
    const params = paramsFixture as UpdateLoggerEventParams;
    const raw = responseFixture as UpdateLoggerEventRawResponse;

    vi.mocked(api.patch).mockResolvedValue(raw);

    const result = await updateLoggerEvent(params);

    expect(api.patch).toHaveBeenCalledWith("/iot-events/901", params.payload);
    expect(result).toMatchObject({
      keyTag: "TAG0901-UPDATED",
      deviceId: "DEV003",
      signalStrength: -67,
    });
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(
      (result as unknown as Record<string, unknown>).key_tag,
    ).toBeUndefined();
  });
});
