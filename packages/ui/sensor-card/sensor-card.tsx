import { Card, Group, Text } from "@mantine/core";
import type { SensorCardProps } from "./sensor-card.types";

export function SensorCard({ icon, label, unit, value }: SensorCardProps) {
  return (
    <Card padding="md">
      <Group gap="xs" mb={4}>
        <Text c="dimmed">{icon}</Text>
        <Text c="dimmed" size="sm">
          {label}
        </Text>
      </Group>
      <Text fw={600} size="lg">
        {value != null ? `${value} ${unit}`.trim() : "—"}
      </Text>
    </Card>
  );
}
