"use client";

import { useState } from "react";
import { Stack } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import type { SortingState } from "@tanstack/react-table";
import { useTranslation } from "core/i18n";
import { useGetLoggerEvents } from "core/actions/get-logger-events/get-logger-events.hook";
import { useDeleteLoggerEvent } from "core/actions/delete-logger-event/delete-logger-event.hook";
import { useQueryClient } from "@tanstack/react-query";
import { getLoggerEventsKey } from "core/actions/get-logger-events/get-logger-events.hook";
import type { LoggerEvent, Result } from "core/entities";
import { IotEventsDatatable } from "modules/dashboard/iot-events-datatable";
import { EditLoggerEventModal } from "./edit-logger-event-modal";

interface IotEventsClientProps {
  initialData: Result<LoggerEvent>;
}

export function IotEventsClient({ initialData }: IotEventsClientProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [editingEvent, setEditingEvent] = useState<LoggerEvent | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);

  const queryParams = {
    page: page + 1,
    per_page: perPage,
    ...(sorting[0] && {
      sort_by: sorting[0].id,
      sort_dir: sorting[0].desc ? ("desc" as const) : ("asc" as const),
    }),
  };

  const { data, isFetching } = useGetLoggerEvents(queryParams, {
    initialData,
  });

  const { mutate: deleteEvent } = useDeleteLoggerEvent({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getLoggerEventsKey });
      notifications.show({
        message: t("iotEvents.deleteSuccess"),
        color: "green",
      });
    },
    onError: () => {
      notifications.show({
        message: t("iotEvents.deleteError"),
        color: "red",
      });
    },
  });

  return (
    <>
      <Stack>
        <IotEventsDatatable
          data={data?.data ?? []}
          isLoading={isFetching}
          onSortingChange={setSorting}
          pageCount={data?.total_pages ?? 0}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPerPage(size);
            setPage(0);
          }}
          perPage={perPage}
          onEdit={setEditingEvent}
          onDelete={(event) => {
            modals.openConfirmModal({
              title: t("iotEvents.deleteConfirmTitle"),
              children: t("iotEvents.deleteConfirmMessage"),
              labels: {
                confirm: t("common.delete"),
                cancel: t("common.cancel"),
              },
              confirmProps: { color: "red" },
              onConfirm: () => {
                if (event.id != null) {
                  deleteEvent({ id: event.id });
                }
              },
            });
          }}
        />
      </Stack>

      {editingEvent && (
        <EditLoggerEventModal
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
        />
      )}
    </>
  );
}
