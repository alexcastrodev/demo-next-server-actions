import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { createElement, type PropsWithChildren } from "react";
import { describe, expect, it, vi } from "vitest";

import { useUpdateLoggerEvent } from "../update-logger-event.hook";
import { updateLoggerEventAction } from "../update-logger-event.action";
import type {
  UpdateLoggerEventParams,
  UpdateLoggerEventRawResponse,
} from "../update-logger-event.types";
import { serializeLoggerEvent } from "../../../serializers";
import paramsFixture from "./fixtures/update-logger-event.params.json";
import responseFixture from "./fixtures/update-logger-event.response.json";

vi.mock("../update-logger-event.action", () => ({
  updateLoggerEventAction: vi.fn(),
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
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

describe("useUpdateLoggerEvent", () => {
  it("updates and returns canonical logger event from fixtures", async () => {
    const params = paramsFixture as UpdateLoggerEventParams;
    const raw = responseFixture as UpdateLoggerEventRawResponse;
    const mockResponse = serializeLoggerEvent(raw);

    vi.mocked(updateLoggerEventAction).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useUpdateLoggerEvent(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(params);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(updateLoggerEventAction).toHaveBeenCalledTimes(1);
    expect(vi.mocked(updateLoggerEventAction).mock.calls[0]?.[0]).toEqual(
      params,
    );
    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.data?.keyTag).toBe("TAG0901-UPDATED");
    expect(result.current.data?.updatedAt).toBeInstanceOf(Date);
  });
});
