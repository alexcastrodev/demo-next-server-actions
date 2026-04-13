"use client";

import { Box } from "@mantine/core";
import type { AppShellSectionProps } from "../app-shell.types";

export function AppShellHeader({ children }: AppShellSectionProps) {
  return (
    <Box
      component="header"
      style={{
        gridArea: "header",
        minWidth: 0,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {children}
    </Box>
  );
}
