"use client";

import { useRouter } from "next/navigation";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useTranslation } from "core/i18n";

export function BackButton() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Tooltip label={t("common.back")}>
      <ActionIcon variant="subtle" onClick={() => router.back()}>
        <IconArrowLeft size={18} />
      </ActionIcon>
    </Tooltip>
  );
}
