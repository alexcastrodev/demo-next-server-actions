import * as Sentry from "@sentry/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

queryClient.getQueryCache().subscribe((event) => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.action.error;
    if (isServerError(error)) {
      Sentry.captureException(error);
    }
  }
});

queryClient.getMutationCache().subscribe((event) => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.action.error;
    if (isServerError(error)) {
      Sentry.captureException(error);
    }
  }
});

function isServerError(error: unknown): boolean {
  if (typeof error === "object" && error !== null) {
    const status =
      (error as { response?: { status?: number } }).response?.status ??
      (error as { status?: number }).status;
    return typeof status === "number" && status >= 500;
  }
  return false;
}

export function ServiceProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

// Export TanStack Query utilities for SSR
export {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
