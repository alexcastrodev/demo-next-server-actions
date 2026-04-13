import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "../../../api";
import { getLoggerEvent } from "../get-logger-event.request";
import type { GetLoggerEventRawResponse } from "../get-logger-event.types";
import paramsFixture from "./fixtures/get-logger-event.params.json";
import responseFixture from "./fixtures/get-logger-event.response.json";

vi.mock("../../../api", () => ({
  api: {
    get: vi.fn(),
  },
}));

describe("getLoggerEvent request", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("serializes a raw logger event to canonical shape", async () => {
    const raw = responseFixture as GetLoggerEventRawResponse;

    vi.mocked(api.get).mockResolvedValue(raw);

    const result = await getLoggerEvent(paramsFixture);

    expect(api.get).toHaveBeenCalledWith("/iot-events/901");
    expect(result).toMatchObject({
      id: 901,
      keyTag: "TAG0901",
      deviceId: "DEV003",
      temperature: 24.1,
    });
    expect(result.updatedAt).toBeInstanceOf(Date);
    expect(
      (result as unknown as Record<string, unknown>).key_tag,
    ).toBeUndefined();
  });
});
