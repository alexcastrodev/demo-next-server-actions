"use client";

import { ActionIcon, Group, Paper, Text } from "@mantine/core";
import { IconDroplet, IconLogout } from "@tabler/icons-react";
import { useTranslation } from "core/i18n";
import { logoutAction } from "core/actions/logout/logout.action";

export function Header() {
  const { t } = useTranslation();

  return (
    <Paper h="100%" px="md" radius="md" shadow="xs" withBorder>
      <Group h="100%" px="md" justify="space-between">
        <Group gap="xs">
          <IconDroplet size={24} color="var(--mantine-color-blue-6)" />
          <Text fw={700} size="lg">
            Dashboard
          </Text>
        </Group>
        <form action={logoutAction}>
          <ActionIcon
            type="submit"
            variant="subtle"
            color="gray"
            title={t("common.logout")}
          >
            <IconLogout size={18} />
          </ActionIcon>
        </form>
      </Group>
    </Paper>
  );
}
