"use client";

import { AuthenticatedGuard } from "@/app/_guards/authenticated-guard";
import { AppShell } from "ui/app-shell";
import { Navbar } from "./_partials/navbar";
import { Header } from "./_partials/header";
import type { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <AuthenticatedGuard>
      <AppShell headerHeight={60} navbarWidth={220}>
        <AppShell.Header>
          <Header />
        </AppShell.Header>
        <AppShell.Navbar>
          <Navbar />
        </AppShell.Navbar>
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </AuthenticatedGuard>
  );
}
