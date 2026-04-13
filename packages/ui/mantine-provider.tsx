import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { type PropsWithChildren } from "react";
import { mantineTheme } from "./mantine-theme";

export function MantineProviderWrapper({ children }: PropsWithChildren) {
  return (
    <MantineProvider theme={mantineTheme}>
      <Notifications position="bottom-right" />
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  );
}
