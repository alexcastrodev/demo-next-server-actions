import { Card, Group, Text } from "@mantine/core";
import type { StatCardProps } from "./stat-card.types";

export function StatCard({ color, icon, label, value }: StatCardProps) {
  return (
    <Card padding="lg">
      <Group justify="space-between" mb="xs">
        <Text c="dimmed" size="sm">
          {label}
        </Text>
        <Text c={color}>{icon}</Text>
      </Group>
      <Text fw={700} size="xl">
        {value.toLocaleString("pt-BR")}
      </Text>
    </Card>
  );
}
