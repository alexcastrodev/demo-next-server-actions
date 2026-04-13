import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "../../../api";
import { getLoggerEvents } from "../get-logger-events.request";
import type {
  GetLoggerEventsParams,
  GetLoggerEventsRawResponse,
} from "../get-logger-events.types";
import paramsFixture from "./fixtures/get-logger-events.params.json";
import responseFixture from "./fixtures/get-logger-events.response.json";

vi.mock("../../../api", () => ({
  api: {
    get: vi.fn(),
  },
}));

describe("getLoggerEvents request", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("serializes raw backend payload to canonical logger events", async () => {
    const params = paramsFixture as GetLoggerEventsParams;
    const raw = responseFixture as GetLoggerEventsRawResponse;

    vi.mocked(api.get).mockResolvedValue(raw);

    const result = await getLoggerEvents(params);

    expect(api.get).toHaveBeenCalledWith("/iot-events", {
      params: {
        page: params.page,
        per_page: params.per_page,
        device_id: params.device_id,
      },
    });
    expect(result.data[0]).toMatchObject({
      id: 901,
      keyTag: "TAG0901",
      deviceId: "DEV003",
      ph: 7.14,
      conductivity: 501.4,
    });
    expect(result.data[0]?.createdAt).toBeInstanceOf(Date);
    expect(
      (result.data[0] as unknown as Record<string, unknown>).key_tag,
    ).toBeUndefined();
  });
});
