"use client";

import {
  Badge,
  Card,
  Divider,
  Group,
  Loader,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconDroplet,
  IconFlame,
  IconSatellite,
  IconWifi,
} from "@tabler/icons-react";
import { useTranslation } from "core/i18n";
import { useGetDeviceReadings } from "core/actions/get-device-readings/get-device-readings.hook";
import type { SensorReading } from "core/actions/get-device-readings/get-device-readings.types";
import { SensorCard } from "ui/sensor-card";

interface DeviceReadingsSectionProps {
  deviceId: string;
}

type WaterQuality = Extract<
  SensorReading,
  { __typename: "WaterQualityReading" }
>;
type Telemetry = Extract<SensorReading, { __typename: "TelemetryReading" }>;

function ReadingHeader({
  typename,
  recordedAt,
}: {
  typename: string;
  recordedAt: string;
}) {
  return (
    <Group justify="space-between" mb="xs">
      <Badge variant="light" size="sm">
        {typename}
      </Badge>
      <Text size="xs" c="dimmed">
        {new Date(recordedAt).toLocaleString()}
      </Text>
    </Group>
  );
}

function WaterQualityCard({ reading }: { reading: WaterQuality }) {
  const { t } = useTranslation();
  return (
    <Card withBorder padding="md" radius="md">
      <ReadingHeader
        typename={reading.__typename}
        recordedAt={reading.recordedAt}
      />
      <SimpleGrid cols={{ base: 2, sm: 4 }}>
        <SensorCard
          label={t("deviceReadings.columns.ph")}
          value={reading.ph}
          unit=""
          icon={<IconDroplet size={16} />}
        />
        <SensorCard
          label={t("deviceReadings.columns.conductivity")}
          value={reading.conductivity}
          unit="µS/cm"
          icon={<IconWifi size={16} />}
        />
        <SensorCard
          label={t("deviceReadings.columns.turbidity")}
          value={reading.turbidity}
          unit="NTU"
          icon={<IconDroplet size={16} />}
        />
        <SensorCard
          label={t("deviceReadings.columns.temperature")}
          value={reading.temperature}
          unit="°C"
          icon={<IconFlame size={16} />}
        />
      </SimpleGrid>
    </Card>
  );
}

function TelemetryCard({ reading }: { reading: Telemetry }) {
  const { t } = useTranslation();
  return (
    <Card withBorder padding="md" radius="md">
      <ReadingHeader
        typename={reading.__typename}
        recordedAt={reading.recordedAt}
      />
      <SimpleGrid cols={{ base: 2, sm: 3 }}>
        <SensorCard
          label={t("deviceReadings.columns.battery")}
          value={reading.battery}
          unit="V"
          icon={<IconWifi size={16} />}
        />
        <SensorCard
          label={t("deviceReadings.columns.satellites")}
          value={reading.satellites}
          unit=""
          icon={<IconSatellite size={16} />}
        />
        <SensorCard
          label={t("deviceReadings.columns.signalStrength")}
          value={reading.signalStrength}
          unit="dBm"
          icon={<IconWifi size={16} />}
        />
      </SimpleGrid>
    </Card>
  );
}

export function DeviceReadingsSection({
  deviceId,
}: DeviceReadingsSectionProps) {
  const { t } = useTranslation();
  const { data, isLoading } = useGetDeviceReadings({ deviceId });

  return (
    <Stack mt="xl">
      <Divider />
      <Title order={4}>
        {t("deviceReadings.title")} — {deviceId}
      </Title>

      {isLoading && <Loader size="sm" />}

      {!isLoading && data?.deviceReadings.data.length === 0 && (
        <Text c="dimmed" size="sm">
          {t("common.empty")}
        </Text>
      )}

      {data?.deviceReadings.data.map((reading) => {
        if (reading.__typename === "WaterQualityReading") {
          return <WaterQualityCard key={reading.id} reading={reading} />;
        }
        if (reading.__typename === "TelemetryReading") {
          return <TelemetryCard key={reading.id} reading={reading} />;
        }
      })}
    </Stack>
  );
}
