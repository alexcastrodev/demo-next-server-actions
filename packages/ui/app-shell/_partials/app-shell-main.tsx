import { Box } from "@mantine/core";
import type { AppShellSectionProps } from "../app-shell.types";

export function AppShellMain({ children }: AppShellSectionProps) {
  return (
    <Box
      component="main"
      style={{
        gridArea: "main",
        minWidth: 0,
      }}
    >
      {children}
    </Box>
  );
}
