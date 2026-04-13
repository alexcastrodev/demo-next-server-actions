import { Title } from "@mantine/core";
import { getLoggerEventsAction } from "core/actions/get-logger-events/get-logger-events.action";
import ptBR from "@/packages/core/i18n/locales/pt-BR";
import { IotEventsClient } from "./_partials/iot-events-client";

export default async function IotEventsPage() {
  const initialData = await getLoggerEventsAction({ page: 1, per_page: 10 });

  return (
    <>
      <Title order={2} mb="lg">
        {ptBR.iotEvents.title}
      </Title>

      <IotEventsClient initialData={initialData} />
    </>
  );
}
