import { Group, Title } from "@mantine/core";
import { getDeviceReadingsAction } from "core/actions/get-device-readings/get-device-readings.action";
import { BackButton } from "modules/dashboard/back-button";
import { DeviceDetailClient } from "modules/dashboard/device-detail-client";

interface DeviceDetailPageProps {
  params: Promise<{ deviceId: string }>;
}

export default async function DeviceDetailPage({
  params,
}: DeviceDetailPageProps) {
  const { deviceId } = await params;
  const initialData = await getDeviceReadingsAction({
    deviceId,
    page: 1,
    perPage: 10,
  });

  return (
    <>
      <Group align="center" mb="lg" gap="xs">
        <BackButton />
        <Title order={2}>{deviceId}</Title>
      </Group>
      <DeviceDetailClient deviceId={deviceId} initialData={initialData} />
    </>
  );
}
