import { AuthenticatedGuard } from "@/app/_guards/authenticated-guard";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
} from "ui/app-shell";
import { Navbar } from "./_partials/navbar";
import { Header } from "./_partials/header";
import type { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <AuthenticatedGuard>
      <AppShell headerHeight={60} navbarWidth={220}>
        <AppShellHeader>
          <Header />
        </AppShellHeader>
        <AppShellNavbar>
          <Navbar />
        </AppShellNavbar>
        <AppShellMain>{children}</AppShellMain>
      </AppShell>
    </AuthenticatedGuard>
  );
}
