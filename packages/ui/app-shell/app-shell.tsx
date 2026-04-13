"use client";

import { Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { AppShellHeader } from "./_partials/app-shell-header";
import { AppShellMain } from "./_partials/app-shell-main";
import { AppShellNavbar } from "./_partials/app-shell-navbar";
import type { AppShellProps } from "./app-shell.types";

type AppShellComponent = ((props: AppShellProps) => React.JSX.Element) & {
  Header: typeof AppShellHeader;
  Main: typeof AppShellMain;
  Navbar: typeof AppShellNavbar;
};

export const AppShell = Object.assign(
  function AppShell({
    children,
    headerHeight = 60,
    navbarWidth = 220,
  }: AppShellProps) {
    const isDesktop = useMediaQuery("(min-width: 48em)");

    return (
      <Box
        data-testid="app-shell-root"
        data-layout={isDesktop ? "desktop" : "mobile"}
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateAreas: isDesktop
            ? '"header header" "navbar main"'
            : '"header" "main" "navbar"',
          gridTemplateColumns: isDesktop
            ? `${navbarWidth}px minmax(0, 1fr)`
            : "minmax(0, 1fr)",
          gridTemplateRows: `${headerHeight}px minmax(0, 1fr) auto`,
          minHeight: "100dvh",
          padding: "1rem",
        }}
      >
        {children}
      </Box>
    );
  },
  {
    Header: AppShellHeader,
    Main: AppShellMain,
    Navbar: AppShellNavbar,
  },
) as AppShellComponent;
