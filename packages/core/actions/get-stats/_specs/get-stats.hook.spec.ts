import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { createElement, type PropsWithChildren } from "react";
import { describe, expect, it, vi } from "vitest";

import { useGetStats } from "../get-stats.hook";
import { getStats } from "../get-stats.request";
import type { GetStatsResponse as RawGetStatsResponse } from "../get-stats.types";
import { serializeStats } from "../../../serializers";
import statsResponseFixture from "./fixtures/get-stats.response.json";

vi.mock("../get-stats.request", () => ({
  getStats: vi.fn(),
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: PropsWithChildren) {
    return createElement(
      QueryClientProvider,
      { client: queryClient },
      children,
    );
  };
}

describe("useGetStats", () => {
  it("returns canonical stats values serialized from backend fixture", async () => {
    const raw = statsResponseFixture as RawGetStatsResponse;
    const mockResponse = serializeStats(raw);

    vi.mocked(getStats).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useGetStats(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getStats).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.data?.totalEvents).toBe(1000);
    expect(result.current.data?.averages?.ph).toBe(7.21);
    expect(result.current.data?.eventsPerDevice?.[0]?.deviceId).toBe("DEV001");
  });
});
