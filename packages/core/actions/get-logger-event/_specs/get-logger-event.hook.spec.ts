import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { createElement, type PropsWithChildren } from "react";
import { describe, expect, it, vi } from "vitest";

import { useGetLoggerEvent } from "../get-logger-event.hook";
import { getLoggerEvent } from "../get-logger-event.request";
import type {
  GetLoggerEventParams,
  GetLoggerEventRawResponse,
} from "../get-logger-event.types";
import { serializeLoggerEvent } from "../../../serializers";
import paramsFixture from "./fixtures/get-logger-event.params.json";
import responseFixture from "./fixtures/get-logger-event.response.json";

vi.mock("../get-logger-event.request", () => ({
  getLoggerEvent: vi.fn(),
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

describe("useGetLoggerEvent", () => {
  it("returns a serialized logger event from fixtures", async () => {
    const params = paramsFixture as GetLoggerEventParams;
    const raw = responseFixture as GetLoggerEventRawResponse;
    const mockResponse = serializeLoggerEvent(raw);

    vi.mocked(getLoggerEvent).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useGetLoggerEvent(params), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getLoggerEvent).toHaveBeenCalledTimes(1);
    expect(getLoggerEvent).toHaveBeenCalledWith(params);
    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.data?.id).toBe(901);
    expect(result.current.data?.keyTag).toBe("TAG0901");
    expect(result.current.data?.createdAt).toBeInstanceOf(Date);
  });
});
