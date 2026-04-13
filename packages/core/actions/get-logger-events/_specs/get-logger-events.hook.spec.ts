import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { createElement, type PropsWithChildren } from "react";
import { describe, expect, it, vi } from "vitest";

import { useGetLoggerEvents } from "../get-logger-events.hook";
import { getLoggerEventsAction } from "../get-logger-events.action";
import type {
  GetLoggerEventsParams,
  GetLoggerEventsRawResponse,
} from "../get-logger-events.types";
import { serializeLoggerEvent } from "../../../serializers";
import type { LoggerEvent, Result } from "../../../entities";
import paramsFixture from "./fixtures/get-logger-events.params.json";
import responseFixture from "./fixtures/get-logger-events.response.json";

vi.mock("../get-logger-events.action", () => ({
  getLoggerEventsAction: vi.fn(),
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

describe("useGetLoggerEvents", () => {
  it("returns canonical logger events serialized from backend fixture", async () => {
    const params = paramsFixture as GetLoggerEventsParams;
    const raw = responseFixture as GetLoggerEventsRawResponse;
    const mockResponse: Result<LoggerEvent> = {
      ...raw,
      data: raw.data.map(serializeLoggerEvent),
    };

    vi.mocked(getLoggerEventsAction).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useGetLoggerEvents(params), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getLoggerEventsAction).toHaveBeenCalledTimes(1);
    expect(getLoggerEventsAction).toHaveBeenCalledWith(params);
    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.data?.data[0].deviceId).toBe("DEV003");
    expect(result.current.data?.data[0].createdAt).toBeInstanceOf(Date);
    expect(result.current.data?.total_pages).toBe(20);
  });
});
