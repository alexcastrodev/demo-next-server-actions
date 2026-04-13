"use client";

import { ServiceProvider } from "core/providers/service-provider";
import { MantineProviderWrapper } from "ui/mantine-provider";
import "core/i18n/config";
import type { PropsWithChildren } from "react";

export function AppMantineProvider({ children }: PropsWithChildren) {
  return (
    <ServiceProvider>
      <MantineProviderWrapper>{children}</MantineProviderWrapper>
    </ServiceProvider>
  );
}
