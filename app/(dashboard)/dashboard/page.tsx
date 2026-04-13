import { Card, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import {
  IconActivity,
  IconDevices,
  IconDroplet,
  IconTemperature,
  IconWifi,
} from "@tabler/icons-react";
import { getStatsAction } from "core/actions/get-stats/get-stats.action";
import ptBR from "@/packages/core/i18n/locales/pt-BR";
import { SensorCard } from "ui/sensor-card";
import { StatCard } from "ui/stat-card";

const t = ptBR;

export default async function DashboardPage() {
  const data = await getStatsAction();

  return (
    <>
      <Title order={2} mb="lg">
        {t.dashboard.title}
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} mb="xl">
        <StatCard
          label={t.dashboard.totalEvents}
          value={data.totalEvents ?? 0}
          icon={<IconActivity size={20} />}
          color="blue"
        />
        <StatCard
          label={t.dashboard.totalDevices}
          value={data.totalDevices ?? 0}
          icon={<IconDevices size={20} />}
          color="grape"
        />
        <StatCard
          label={t.dashboard.eventsToday}
          value={data.eventsToday ?? 0}
          icon={<IconWifi size={20} />}
          color="teal"
        />
        <StatCard
          label={t.dashboard.eventsLast7d}
          value={data.eventsLast7d ?? 0}
          icon={<IconActivity size={20} />}
          color="orange"
        />
      </SimpleGrid>

      <Title order={4} mb="md">
        {t.dashboard.sensorAverages}
      </Title>
      <div className="mb-xl grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SensorCard
          label={t.dashboard.sensors.ph}
          value={data.averages?.ph}
          unit=""
          icon={<IconDroplet size={18} />}
        />
        <SensorCard
          label={t.dashboard.sensors.tmp}
          value={data.averages?.temperature}
          unit="°C"
          icon={<IconTemperature size={18} />}
        />
        <SensorCard
          label={t.dashboard.sensors.cnd}
          value={data.averages?.conductivity}
          unit="µS/cm"
          icon={<IconWifi size={18} />}
        />
        <SensorCard
          label={t.dashboard.sensors.ntu}
          value={data.averages?.turbidity}
          unit="NTU"
          icon={<IconDroplet size={18} />}
        />
        <SensorCard
          label={t.dashboard.sensors.vbat}
          value={data.averages?.batteryVoltage}
          unit="V"
          icon={<IconWifi size={18} />}
        />
        <SensorCard
          label={t.dashboard.sensors.rssi}
          value={data.averages?.signalStrength}
          unit="dBm"
          icon={<IconWifi size={18} />}
        />
      </div>

      <Title order={4} mb="md">
        {t.dashboard.eventsPerDevice}
      </Title>
      <Stack gap="xs">
        {data.eventsPerDevice?.map(({ deviceId, count }) => (
          <Card key={deviceId} withBorder padding="sm" radius="md">
            <Group justify="space-between">
              <Text fw={500}>{deviceId}</Text>
              <Text size="sm" c="dimmed">
                {count ?? 0}
              </Text>
            </Group>
          </Card>
        ))}
      </Stack>
    </>
  );
}
