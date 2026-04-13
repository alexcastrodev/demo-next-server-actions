"use client";

import { Group, Stack, Text, Title } from "@mantine/core";
import { IconDroplet } from "@tabler/icons-react";
import { useTranslation } from "core/i18n";

export function LoginPageHeader() {
  const { t } = useTranslation();

  return (
    <Stack align="center" mb="xl">
      <Group gap="xs">
        <IconDroplet size={32} color="var(--mantine-color-blue-6)" />
        <Title order={1} size="h2">
          {t("auth.title")}
        </Title>
      </Group>
      <Text c="dimmed" size="sm">
        {t("auth.subtitle")}
      </Text>
    </Stack>
  );
}
