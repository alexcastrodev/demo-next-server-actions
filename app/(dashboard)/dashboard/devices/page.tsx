import { Title } from "@mantine/core";
import { getDevicesAction } from "core/actions/get-devices/get-devices.action";
import ptBR from "@/packages/core/i18n/locales/pt-BR";
import { DevicesClient } from "./_partials/devices-client";

export default async function DevicesPage() {
  const initialData = await getDevicesAction();

  return (
    <>
      <Title order={2} mb="lg">
        {ptBR.nav.devices}
      </Title>

      <DevicesClient initialData={initialData} />
    </>
  );
}
