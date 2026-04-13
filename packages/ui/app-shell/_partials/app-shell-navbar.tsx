"use client";

import { Box } from "@mantine/core";
import type { AppShellSectionProps } from "../app-shell.types";

export function AppShellNavbar({ children }: AppShellSectionProps) {
  return (
    <Box
      component="aside"
      style={{
        gridArea: "navbar",
        minWidth: 0,
      }}
    >
      {children}
    </Box>
  );
}
