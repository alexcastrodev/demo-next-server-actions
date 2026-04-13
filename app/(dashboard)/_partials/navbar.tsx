"use client";

import { NavLink, Paper, Stack } from "@mantine/core";
import { IconActivity, IconDevices, IconHome } from "@tabler/icons-react";
import { useTranslation } from "core/i18n";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { t } = useTranslation();
  const pathname = usePathname();

  const NAV_ITEMS = [
    { label: t("nav.home"), href: "/dashboard", icon: IconHome },
    {
      label: t("nav.iotEvents"),
      href: "/dashboard/iot-events",
      icon: IconActivity,
    },
    { label: t("nav.devices"), href: "/dashboard/devices", icon: IconDevices },
  ];

  return (
    <Paper p="xs" radius="md" shadow="xs" withBorder>
      <Stack gap={4}>
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
          <NavLink
            key={href}
            component={Link}
            href={href}
            label={label}
            leftSection={<Icon size={18} />}
            active={pathname === href}
          />
        ))}
      </Stack>
    </Paper>
  );
}
