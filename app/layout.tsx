import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";

import { AppMantineProvider } from "./mantine-provider";

export const metadata: Metadata = {
  title: "IoT Dashboard",
  description: "IoT Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <AppMantineProvider>{children}</AppMantineProvider>
      </body>
    </html>
  );
}
