import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { createElement, type PropsWithChildren } from "react";
import { describe, expect, it, vi } from "vitest";

import { useDeleteLoggerEvent } from "../delete-logger-event.hook";
import { deleteLoggerEventAction } from "../delete-logger-event.action";
import type {
  DeleteLoggerEventParams,
  DeleteLoggerEventResponse,
} from "../delete-logger-event.types";
import paramsFixture from "./fixtures/delete-logger-event.params.json";
import responseFixture from "./fixtures/delete-logger-event.response.json";

vi.mock("../delete-logger-event.action", () => ({
  deleteLoggerEventAction: vi.fn(),
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

describe("useDeleteLoggerEvent", () => {
  it("deletes a logger event from fixtures", async () => {
    const params = paramsFixture as DeleteLoggerEventParams;
    const mockResponse = responseFixture as DeleteLoggerEventResponse;

    vi.mocked(deleteLoggerEventAction).mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useDeleteLoggerEvent(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(params);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(deleteLoggerEventAction).toHaveBeenCalledTimes(1);
    expect(vi.mocked(deleteLoggerEventAction).mock.calls[0]?.[0]).toEqual(
      params,
    );
    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.data?.deleted).toBe(true);
  });
});
