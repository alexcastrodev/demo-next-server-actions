import { getDeviceReadingsAction } from "core/actions/get-device-readings/get-device-readings.action";
import { DeviceDetailClient } from "./_partials/device-detail-client";

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

  return <DeviceDetailClient deviceId={deviceId} initialData={initialData} />;
}
