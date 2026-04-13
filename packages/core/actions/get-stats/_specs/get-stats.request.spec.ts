import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "../../../api";
import { getStats } from "../get-stats.request";
import type { GetStatsResponse } from "../get-stats.types";
import responseFixture from "./fixtures/get-stats.response.json";

vi.mock("../../../api", () => ({
  api: {
    get: vi.fn(),
  },
}));

describe("getStats request", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("serializes stats payload to canonical fields", async () => {
    const raw = responseFixture as GetStatsResponse;

    vi.mocked(api.get).mockResolvedValue(raw);

    const result = await getStats();

    expect(api.get).toHaveBeenCalledWith("/stats");
    expect(result).toMatchObject({
      totalEvents: 1000,
      totalDevices: 5,
      eventsToday: 37,
      eventsLast7d: 240,
    });
    expect(result.eventsPerDevice?.[0]).toMatchObject({
      deviceId: "DEV001",
      count: 200,
    });
    expect(
      (result as unknown as Record<string, unknown>).total_events,
    ).toBeUndefined();
  });
});
